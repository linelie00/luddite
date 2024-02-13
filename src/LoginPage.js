import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link import
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

const                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   LoginForm = () => {
  return (
    <UserContainer>
          <Link to="/">
            <HeaderIcon />
          </Link>
      <UserFormContainer>
        <form>
          <FormGroup>
            <Label htmlFor="username">아이디:</Label>
            <Input type="text" id="username" name="username" placeholder="아이디를 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호:</Label>
            <Input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" />
          </FormGroup>
          <SubmitButton type="submit">로그인</SubmitButton>
          <UserLink to="/signup">회원가입</UserLink>
        </form>
      </UserFormContainer>
    </UserContainer>
  );
};

export default LoginForm;
