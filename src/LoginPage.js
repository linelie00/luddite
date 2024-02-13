import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link import

// 스타일 컴포넌트 정의
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginFormContainer = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #864971;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #AD839F;
  }
`;

const SignUpLink = styled(Link)` // 스타일 컴포넌트로 Link 컴포넌트 스타일링
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  font-size: 14px;
  color: #864971;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  return (
    <LoginContainer>
      <LoginFormContainer>
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
          <SignUpLink to="/signup">회원가입</SignUpLink>
        </form>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
