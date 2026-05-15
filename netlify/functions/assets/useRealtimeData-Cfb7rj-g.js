import { useState, useEffect } from "react";
import { s as supabase } from "./client-1Cs0bkRN.js";
function useRealtimeData(table, select = "*", filter) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: initialData, error: fetchError } = await supabase.from(table).select(select);
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
      const filteredData = filter ? filter(initialData) : initialData;
      setData(filteredData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let channel;
    const setupRealtimeSubscription = () => {
      channel = supabase.channel(`${table}_changes`).on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table
        },
        () => {
          fetchData();
        }
      ).subscribe();
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
export {
  useRealtimeData as u
};
