import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeData<T>(
  table: string,
  select: string = '*',
  filter?: (data: T[]) => T[]
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: initialData, error: fetchError } = await supabase
          .from(table)
          .select(select);

        if (fetchError) {
          setError(fetchError.message);
          return;
        }

        const filteredData = filter ? filter(initialData as T[]) : initialData as T[];
        setData(filteredData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

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
          (payload) => {
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