// App.js

import React from 'react';
import './App.css';
import Toggle from './toggle.js';
import PillTextBox from './search.js';
import PillTextBoxMod from './search_first.js';
//import useSearch from './searchHook';
import useSearch from './useSearch';
import SearchResultDisplay from './SearchResultDisplay';


function App() {
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
      <div id="head">
        <div id="head_1"></div>
        <div id="head_2">
          <div id="head_2_1">
            <PillTextBoxMod />
            <Toggle />
            <PillTextBox
              value={searchValue}
              onChange={handleChange}
              onEnter={handleKeyDown}
            />
          </div>
          <div id="Divider"></div>
          <div id="head_2_2"></div>
        </div>
      </div>
      <div id="mid">
        <b>{searchValue}</b>
        <SearchResultDisplay
          searchResult={searchResult}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;