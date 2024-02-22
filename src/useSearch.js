// useSearch.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useSearch = ({ method }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({ pos1: null, pos27: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (pos) => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = process.env.REACT_APP_API_KEY;

        const parameters = {
          key: apiKey,
          advanced: 'y',
          type1: 'word,phrase',
          pos: pos,
          method: method,
          target_type: 'search',
          req_type: 'json',
          part: 'word',
          q: searchValue,
          sort: 'popular',
          start: 1,
          num: 100,
        };

        const queryString = Object.keys(parameters)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
          .join('&');

        const url = `http://43.200.49.227:3000/api/search?${queryString}`;

        console.log(`API 호출 URL: ${url}`);

        const response = await axios.get(url);

        setSearchResult((prevResult) => ({
          ...prevResult,
          [pos === 1 ? 'pos1' : 'pos27']: response.data,
        }));
        console.log(`호출에 성공했습니다. (pos: ${pos}, word: ${searchValue})`);
      } catch (error) {
        console.error(`데이터를 불러오는 중 에러 발생 (pos: ${pos}):`, error);
        setSearchResult((prevResult) => ({
          ...prevResult,
          [pos === 1 ? 'pos1' : 'pos27']: null,
        }));
        setError(`데이터를 불러오는 중 에러 발생 (pos: ${pos})`);
      } finally {
        setLoading(false);
      }
    },
    [searchValue, method]
  );

  const isHangul = (text) => {
    const hangulRegex = /[가-힣]/;
    return hangulRegex.test(text);
  };

  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error('이벤트 객체 또는 이벤트 타겟이 정의되지 않았습니다.');
      return;
    }

    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {

    let timer;


    const debouncedFetchData = (func, delay) => {
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };
  
    const fetchDataWithDebounce = debouncedFetchData(async () => {
      try {
        if (searchValue.trim() !== '') {
          if (isHangul(searchValue)) {
            await fetchData(1);
            await fetchData(27);
          } else {
            setSearchResult({ pos1: null, pos27: null });
            setError('잘못된 값입니다.');
          }
        } else {
          setSearchResult({ pos1: null, pos27: null });
          setError(null);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        setSearchResult({ pos1: null, pos27: null });
        setError('데이터를 불러오는 중 에러 발생');
      }
    }, 400);
  
    fetchDataWithDebounce();

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, fetchData]);

  return {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
  };
};

export default useSearch;
