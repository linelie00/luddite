// useSearch.js
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
      const response = await axios.get(`http://localhost:3000/api/search?certkey_no=6136&key=${apiKey}&advanced=y&type1=word&pos=1&method=start&target_type=search&req_type=json&part=word&q=${searchValue}&sort=popular&start=1&num=100&letter_s=2`);

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

  //한글 음절만을 가능하게 함
  const isHangul = (text) => {
    const hangulRegex = /[가-힣]/;
    return hangulRegex.test(text);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const handleFetchData = async () => {
      if (searchValue.trim() !== '') {
        if (isHangul(searchValue)) {
          await fetchData();
        } else {
          setSearchResult(null);
          setError('잘못된 값입니다.'); // 자음과 모음뿐이거나 한글이 아닌 경우 에러
        }
      } else {
        setSearchResult(null);
        setError(null);
      }
    };

    handleFetchData();
  }, [searchValue, fetchData]);

  const handleSearchClick = () => {
    fetchData();
  };

  return {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
    handleSearchClick,
  };
};

export default useSearch;



