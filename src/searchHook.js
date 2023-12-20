// SearchHook.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = "C956A2407AF0A3C67401DA0B27201261";
      const response = await axios.get(`http://localhost:3000/api/search?certkey_no=6136&key=${apiKey}&advanced=y&type1=word&pos=1&method=start&target_type=search&req_type=json&part=word&q=${searchValue}&sort=dict&start=1&num=100`);

      setSearchResult(response.data);
      console.log("호출에 성공했습니다.");
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
      setSearchResult(null);
      setError('데이터를 불러오는 중 에러 발생');
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleFetchData = async () => {
      if (searchValue.trim() !== '') {
        await fetchData();
      } else {
        setSearchResult(null);
      }
    };

    handleFetchData();
  }, [searchValue, fetchData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
    handleKeyDown,
  };
};

export default useSearch;
