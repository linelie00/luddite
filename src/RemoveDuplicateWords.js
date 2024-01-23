// RemoveDuplicateWords.js
const RemoveDuplicateWords = ({ items }) => {
    const uniqueItems = [...new Set(items)]; // 중복 제거
  
    return uniqueItems;
  };
  
  export default RemoveDuplicateWords;
  