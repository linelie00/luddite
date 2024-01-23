// FilterHangulWords.js
import React from 'react';

const FilterHangulWords = ({ items }) => {
  if (!items || items.length === 0) {
    return [];
  }

  // 한글 2음절 이상인 단어만 필터링
  const filteredResults = items.filter(item => item.word?.match(/[가-힣]{2,}/));

  return filteredResults;
};

export default FilterHangulWords;
