import { useState, useEffect, useCallback } from 'react';
// Mock axios if needed, but assuming api is configured elsewhere
// import api from '../services/api';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call in production
      // const response = await api.get(url, options);
      // setData(response.data);
      
      // Mock network delay for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      setData([]); // Dummy data
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
