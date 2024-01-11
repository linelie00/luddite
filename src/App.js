// App.js
import React from 'react';
import Toggle from './toggle.js';
import PillTextBox from './search.js';
//import PillTextBoxMod from './search_first.js';
import useSearch from './useSearch';
import SearchResultDisplay from './SearchResultDisplay';
import {
  Head,
  HeadTop,
  HeadBottom,
  HeadBottom1,
  HeadBottom2,
  Divider,
  Mid,
} from './StyledComponents';  // StyledComponents.js에서 정의한 styled-components 가져오기

const App = () => {
  const {
    searchValue,
    searchResult,
    loading,
    error,
    handleChange,
    handleSearchClick,
    handleKeyDown,
  } = useSearch();

  return (
    <div>
      <Head>
        <HeadTop></HeadTop>
        <HeadBottom>
          <HeadBottom1>
            <PillTextBox
              value={searchValue}
              onChange={handleChange}
              onEnter={handleKeyDown}
            />
            <Toggle />
          </HeadBottom1>
          <Divider></Divider>
          <HeadBottom2></HeadBottom2>
        </HeadBottom>
      </Head>
      <Mid>
        <b>{searchValue}</b>
        <SearchResultDisplay
          searchResult={searchResult}
          loading={loading}
          error={error}
        />
      </Mid>
    </div>
  );
};

export default App;