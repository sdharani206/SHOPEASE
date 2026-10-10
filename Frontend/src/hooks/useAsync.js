import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Runs `fetcher(arg, signal)` and tracks loading / error / data.
 * - `fetcher` must be a stable (module-level) function.
 * - Re-runs when `arg` changes or `retry()` is called.
 * - Cancels in-flight requests automatically.
 */
export default function useAsync(fetcher, arg) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });

  const requestKey = `${String(arg)}:${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    fetcher(arg, controller.signal)
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setResult({ key: requestKey, data: null, error });
      });

    return () => controller.abort();
  }, [fetcher, arg, requestKey]);

  const loading = result.key !== requestKey;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    retry: () => setAttempt((n) => n + 1),
  };
}
