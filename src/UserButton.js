import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from './userIcon.svg';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ButtonContainer = styled.div`
  left: 95%;
  top: 20px;
  position: absolute;
  z-index: 30;

  @media screen and (max-width: 1000px) {
    left: 94%;
  }
`;

const ToggleButton = styled.button`
  width: 30px;
  height: 30px;
  background-image: url(${userIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  cursor: pointer;
  transition: transform 0.5s;
  background-color: transparent;
`;

const TabsContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')}; 
  flex-direction: column;
  min-width: 120px;
  background-color: #864971;
  border-radius: 3px;
  border: 5px solid #864971;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  background-color: #e9e9e9;
  padding: 5px;
`;

const UserName = styled.span`
  font-size: 18px;
  color: #864971;
  font-weight: bold;
  white-space: nowrap;
`;

const UserId = styled.span`
  font-size: 14px;
  color: #B89DAF;
`;

const Tab = styled(Link)`
  display: block;
  text-align: right;
  color: #e9e9e9;
  text-decoration: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #e9e9e9;
    color: #864971;
  }
`;

const LogoutButton = styled.span`
  display: block;
  text-align: right;
  color: #e9e9e9;
  text-decoration: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #e9e9e9;
    color: #864971;
  }
`;

const UserButton = ({ onLogout }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { isLoggedIn, logout, userId, userName } = useAuth();

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <ButtonContainer>
      <ToggleButton onClick={togglePopup} />
      <TabsContainer isVisible={popupVisible}>
        {isLoggedIn ? (
          <>
            <UserContainer>
              <UserName>{userName.replace(/"/g, '')}</UserName>
              <UserId>@{userId}</UserId>
            </UserContainer>
            <Tab to="/user">프로필</Tab>
            <LogoutButton onClick={() => { logout(); onLogout(); }}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <Tab to="/login">로그인</Tab>
            <Tab to="/signup">회원가입</Tab>
          </>
        )}
      </TabsContainer>
    </ButtonContainer>
  );
};

export default UserButton;
