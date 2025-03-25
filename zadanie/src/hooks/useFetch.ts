import { useEffect, useState } from "react";

export const useFetchData = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const startTime = performance.now();
            setLoading(true);
            setError(null);
            try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            } catch (error) {
            setError(error instanceof Error ? error.message : "Nastala chyba pri načítavaní dát");
            } finally {
            setLoading(false);
            const endTime = performance.now();
            console.log(`Fetching data took ${endTime - startTime} milliseconds.`);
            }
        };

        fetchData()

    }, [url]);

    return { data, loading, error }
};