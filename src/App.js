// App.js
import React, { useState } from 'react';
import Toggle from './toggle.js';
import PillTextBox from './search.js';
import MeatballComponent from './MeatballComponent'; // 수정: MeatballComponent import 추가
import MeatballButton from './MeatballButton'; // 수정: MeatballButton import 추가
import MeatballDiv from './MeatballDiv'; // 수정: MeatballDiv import 추가
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
} from './StyledComponents';  

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

  const [divVisible, setDivVisible] = useState(false);

  const toggleDiv = () => {
    setDivVisible(!divVisible);
  };

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
          <HeadBottom2>
            <MeatballButton onClick={toggleDiv} isRotated={divVisible} />
          </HeadBottom2>
        </HeadBottom>
      </Head>
      <MeatballDiv isVisible={divVisible} />
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
