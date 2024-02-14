import React from 'react';
import { Link } from 'react-router-dom';
import {
    HeaderIcon,
} from './StyledComponents';
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
      <UserFormContainer>
        <form>
          <FormGroup>
            <Label htmlFor="name">이름:</Label>
            <Input type="text" id="name" name="name" placeholder="이름을 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="username">아이디:</Label>
            <Input type="text" id="username" name="username" placeholder="아이디를 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호:</Label>
            <Input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인:</Label>
            <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호를 다시 입력하세요" />
          </FormGroup>
          <SubmitButton type="submit">회원가입</SubmitButton>
          <UserLink to="/login">이미 계정이 있으신가요? 로그인</UserLink>
        </form>
      </UserFormContainer>
    </UserContainer>
  );
};

export default UserForm;
