// App.js
import React from 'react';
import Toggle from './toggle.js';
import PillTextBox from './search.js';
//import PillTextBoxMod from './search_first.js';
import useSearch from './useSearch';
import SearchResultDisplay from './SearchResultDisplay';
import {
  Head,
  Head1,
  Head2,
  Head2_1,
  Head2_2,
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
        <Head1></Head1>
        <Head2>
          <Head2_1>
            <PillTextBox
              value={searchValue}
              onChange={handleChange}
              onEnter={handleKeyDown}
            />
            <Toggle />
          </Head2_1>
          <Divider></Divider>
          <Head2_2></Head2_2>
        </Head2>
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