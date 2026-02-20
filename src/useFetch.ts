import { useEffect, useState, useCallback } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    setHasError(false);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: T) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setHasError(true);
        setIsLoading(false);
      });
  }, [url, retryCount]);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  return { data, isLoading, error, hasError, retry };
}

export default useFetch;
