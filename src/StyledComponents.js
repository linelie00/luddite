// StyledComponents.js
import styled from 'styled-components';
import headerIcon from './headerIcon.svg';

export const Head = styled.div`
  width: 100%;
  height: 250px;
  //background-color: #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

export const HeadTop = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  //background-color: #888888;
  width: 96%;
  height: 50%;
  margin: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: row; /* 가로로 배치하는 스타일 */
`;

export const HeadBottom = styled.div`
  margin-left: auto;
  margin-right: auto;
  //background-color: #eeeeee;
  width: 98%;
  height: 60%;
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
  margin: 12px 0 0 0;
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
  width: 70%;
  min-width: 480px;
  height: 530px;
  background-color: #eeeeee;
  overflow-y: auto;
  overflow-x: hidden;
  //margin: 5px;
  margin-left: auto;
  margin-right: auto;
`;

export const Divider = styled.div`
  border: none;
  margin-top: 12px;
  width: 98%;
  height: 3px;
  background-color: #864971;
  z-index: 17;
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

export const BookmarkListDiv = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
  display: flex;
  width: 92%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  margin: 0;
  > * {
    flex-shrink: 0;
  }
  /* background-color: #333333; */
  &.scroll {
    overflow-x: auto; /* 가로 스크롤을 허용하도록 설정 */
  }

  /* 스크롤 바 숨기기 */
  &::-webkit-scrollbar {
    height: 0; /* 가로 스크롤 바의 높이를 0으로 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤 바 색상을 투명으로 설정 */
  }
  @media screen and (max-width: 1000px) {
    width: 88%;
}
`;

//북마크 목록 뒤 공간
export const Blank = styled.div`
  width: 500px;
  height: 100%;
`;

export const ResultItemContainer = styled.div`
  padding: 0px 20px;
  //margin-bottom: 10px;
  //height: 150px;
  h3 {
    color: #864971;
    font-size: 22px;
    margin: 0;
  }

  .bookmarkButton {
    position: relative;
    left: 88%;
    top: 38px;
    width: 40px;
    height: 40px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: none;
    cursor: pointer;
    background-color: transparent;
    @media screen and (max-width: 800px) {
      left: 85%;
    }
  }

  .copyButton {
    position: relative;
    left: 89%;
    top: 40px;
    width: 42px;
    height: 42px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: none;
    cursor: pointer;
    background-color: transparent;
    @media screen and (max-width: 800px) {
      left: 86%;
    }
  }

  button img {
    width: 100%;
    height: 100%;
  }

  .meaningDiv {
    width: 80%;
  }

  p {
    //margin: 5px 0;
    color: #864971;
  }

  a {
    color: #007bff;
    text-decoration: none;
    margin-top: 5px;
    display: block;
  }
`;

export const ClipboardAlert = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #9a9a9a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  //font-size: 16px;
  //font-weight: 600;
`;

export const HeaderIcon = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px 0px;
  //background-color: #999999;
  background-image: url(${headerIcon});
  background-size: cover; /* 이미지 크기에 맞춤 */
  background-position: center; /* 이미지를 가운데 정렬 */
  background-size: contain; /* 이미지를 최대한 보존하도록 크기 조절 */
  background-repeat: no-repeat; /* 이미지 반복 제거 */
`;
