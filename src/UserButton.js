// UserButton.js
import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from './userIcon.svg';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ButtonContainer = styled.div`
  left: 95%;
  top: 20px;
  position: absolute;

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
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  width: 120px;
  background-color: #ffffff;
  border-radius: 3px;
  //box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  border: 3px solid #864971;
`;

const Tab = styled(Link)`
  display: block;
  padding: 5px 0; /* Adjust padding */
  text-align: right; /* Right align text */
  color: #864971;
  text-decoration: none;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #F2F2F2;
    color: #864971;
  }
`;

const LogoutButton = styled.span`
  display: block;
  padding: 5px 0;
  text-align: right;
  color: #864971;
  text-decoration: none;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #F2F2F2;
    color: #864971;
  }
`;

const UserButton = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Get login status and logout function

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <ButtonContainer>
      <ToggleButton onClick={togglePopup} />
      <TabsContainer isVisible={popupVisible}>
        {isLoggedIn ? (
          <>
            <Tab to="/user">프로필</Tab>
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          </>
        ) : (
          <Tab to="/login">로그인</Tab>
        )}
      </TabsContainer>
    </ButtonContainer>
  );
};

export default UserButton;
