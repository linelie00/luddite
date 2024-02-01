// useSearch.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({ pos1: null, pos27: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (pos) => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = "C956A2407AF0A3C67401DA0B27201261";

        const parameters = {
          certkey_no: 6136,
          key: apiKey,
          advanced: 'y',
          type1: 'word',
          pos: pos,
          method: 'start',
          target_type: 'search',
          req_type: 'json',
          part: 'word',
          q: searchValue,
          sort: 'popular',
          start: 1,
          num: 100,
          letter_s: 2,
        };

        const queryString = Object.keys(parameters)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
          .join('&');

        const url = `http://localhost:3000/api/search?${queryString}`;

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
    [searchValue]
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
    const handleFetchData = async () => {
      try {
        if (searchValue.trim() !== '') {
          if (isHangul(searchValue)) {
            await fetchData(1); // pos 값이 1일 때 호출
            await fetchData(27); // pos 값이 27일 때 호출
          } else {
            setSearchResult({ pos1: null, pos27: null });
            setError('잘못된 값입니다.'); // 자음과 모음뿐이거나 한글이 아닌 경우 에러
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
    };

    const debouncedFetchData = debounce(handleFetchData, 500);

    debouncedFetchData();

    // Cleanup function
    return () => {
      clearTimeout(debouncedFetchData);
    };
  }, [searchValue, fetchData]);

  // Debounce utility function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  return {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
  };
};

export default useSearch;
