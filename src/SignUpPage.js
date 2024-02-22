import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderIcon } from './StyledComponents';
import { UserContainer, UserFormContainer, FormGroup, Label, Input, SubmitButton, UserLink, ErrorMessage } from './UsersComponents';

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target);
    const user_name = formData.get('user_name');
    const id = formData.get('id');
    const pw = formData.get('pw');
    const confirmPw = formData.get('confirmPw');

    // Check if passwords match
    if (pw !== confirmPw) {
      setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('http://43.200.49.227:8282/use/signup', {
        user_name,
        id,
        pw
      });
      if (response.status === 200) {
        console.log('회원가입 성공');
        navigate('/login'); // 메인 페이지로 이동
      }
    } catch (error) {
      console.log('회원가입 실패');
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <UserContainer>
      <Link to="/">
        <HeaderIcon />
      </Link>
      <UserFormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">이름:</Label>
            <Input type="text" id="user_name" name="user_name" placeholder="이름을 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="username">아이디:</Label>
            <Input type="text" id="id" name="id" placeholder="아이디를 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호:</Label>
            <Input type="password" id="pw" name="pw" placeholder="비밀번호를 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인:</Label>
            <Input type="password" id="confirmPw" name="confirmPw" placeholder="비밀번호를 다시 입력하세요" />
          </FormGroup>
          <SubmitButton type="submit">회원가입</SubmitButton>
          <UserLink to="/login">이미 계정이 있으신가요? 로그인</UserLink>
        </form>
      </UserFormContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </UserContainer>
  );
};

export default SignUpForm;
