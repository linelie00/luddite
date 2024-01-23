// FilterHangulWords.js
import React from 'react';

const FilterHangulWords = ({ items }) => {
  if (!items || items.length === 0) {
    return [];
  }

  // 중복 제거 및 한글 2음절 이상인 단어만 필터링
  const uniqueWordsSet = new Set();
  const filteredResults = items.filter(item => {
    const word = item.word?.replace(/-/g, ''); // '-' 제거
    if (word && word.match(/[가-힣]{2,}/) && !uniqueWordsSet.has(word)) {
      uniqueWordsSet.add(word);
      return true;
    }
    return false;
  });

  return filteredResults;
};

export default FilterHangulWords;
