import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import {HeaderIcon} from './StyledComponents';
import {
    UserContainer,
    UserFormContainer,
    FormGroup,
    Label,
    Input,
    SubmitButton,
    UserLink,
} from './UsersComponents';

const UserForm = () => {
  return (
    <UserContainer>
        <Link to="/">
            <HeaderIcon />
          </Link>
          <h2>유저페이지임</h2>
          <h3>이름</h3>
          @아이디
          로그아웃
          <h3>회원정보수정</h3>
    </UserContainer>
  );
};

export default UserForm;
