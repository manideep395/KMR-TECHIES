import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export function useRealtimeData<T>(
  table: keyof Database['public']['Tables'],
  select: string = '*',
  filter?: (data: T[]) => T[]
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: initialData, error: fetchError } = await supabase
        .from(table)
        .select(select);

      if (fetchError) {
        const notFoundTable = /(Could not find the table|schema cache|relation .* does not exist)/i.test(fetchError.message);
        if (notFoundTable) {
          setData([]);
          setError(null);
          return;
        }

        setError(fetchError.message);
        return;
      }

      const filteredData = filter ? filter(initialData as T[]) : (initialData as T[]);
      setData(filteredData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
          },
          () => {
            fetchData(); // Refetch data on any change
          }
        )
        .subscribe();
    };

    fetchData();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, select, filter]);

  return { data, loading, error, refetch: () => fetchData() };
}