// useApiSearch.js

import { useEffect, useState } from 'react';
import axios from 'axios';

const useApiSearch = (inputValue, debounceTime = 500) => {
  const [searchResult, setSearchResult] = useState({ pos1: [], pos27: [] });
  const [loading, setLoading] = useState({ pos1: false, pos27: false });
  const [error, setError] = useState({ pos1: null, pos27: null });

  useEffect(() => {
    let timer;

    const fetchData = async (pos) => {
      try {
        setLoading({ ...loading, [pos]: true });
        setError({ ...error, [pos]: null });

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
            q: inputValue,
            sort: 'popular',
            start: 1,
            num: 1000,
            letter_s: 2
        };

    const queryString = Object.entries(parameters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const url = `http://localhost:3000/api/search?${queryString}`;

    const response = await axios.get(url);

    setSearchResult((prevResult) => ({ ...prevResult, [pos]: response.data.data || [] }));
    console.log(`호출에 성공했습니다. (pos: ${pos}, word: ${inputValue})`);
    } catch (error) {
    console.error(`데이터를 불러오는 중 에러 발생 (pos: ${pos}):`, error);
    setSearchResult((prevResult) => ({ ...prevResult, [pos]: [] }));
    setError((prevError) => ({ ...prevError, [pos]: `데이터를 불러오는 중 에러 발생 (pos: ${pos})` }));
    } finally {
    setLoading((prevLoading) => ({ ...prevLoading, [pos]: false }));
    }
    };

    if (inputValue.trim() !== '') {
      if (timer) {
        clearTimeout(timer);
      }

      // pos1과 pos27 각각 호출
      timer = setTimeout(() => {
        fetchData(1);
        fetchData(27);
      }, debounceTime);
    } else {
      setSearchResult({ pos1: [], pos27: [] });
      setError({ pos1: null, pos27: null });
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [inputValue, debounceTime]);

  return { searchResult, loading, error };
};

export default useApiSearch;