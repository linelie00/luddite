// StyledComponents.js
import styled from 'styled-components';

export const Head = styled.div`
  width: 99%;
  height: 250px;
  background-color: #ffffff;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HeadTop = styled.div`
  margin: 2px;
  margin-left: auto;
  margin-right: auto;
  background-color: #888888;
  width: 98%;
  height: 40%;
`;

export const HeadBottom = styled.div`
  margin: 2px;
  margin-left: auto;
  margin-right: auto;
  background-color: #eeeeee;
  width: 98%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HeadBottom1 = styled.div`
  background-color: #ffffff;
  width: 98%;
  height: 45%;
  overflow: hidden;
  display: flex;
`;

export const HeadBottom2 = styled.div`
  background-color: #ffffff;
  width: 98%;
  height: 30%;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative
`;

export const Mid = styled.div`
  width: 90%;
  height: 500px;
  background-color: #eeeeee;
  overflow-y: auto;
  margin: 5px;
  margin-left: auto;
  margin-right: auto;
`;

export const Divider = styled.div`
  border: none;
  margin-top: 12px;
  width: 98%;
  height: 3px;
  background-color: #864971;
`;

export const PillTextBoxContainer = styled.div`
  margin-top: 10px;
  left: 17%;
  cursor: pointer;
  position: relative;
  width: 470px;
  height: 50px;
  border-radius: 25px;
  background-color: #864971;
  display: flex;
  align-items: center;
  padding: 0 55px;
`;

export const PillTextBoxInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 16px;
  margin-left: 4px;
  color: #e9e9e9;
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  cursor: pointer;
`;
