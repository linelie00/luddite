import React from 'react';
import axios from 'axios';
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

const LoginForm = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const id = formData.get('id');
      const pw = formData.get('pw');
      
      try {
        const response = await axios.post('http://localhost:8282/use/login', {
          id,
          pw
        });
        if (response.status === 200) {
            console.log('로그인 성공');
          // 로그인 성공 시 처리
        } else {
            console.log('로그인 실패');
          // 로그인 실패 시 처리
        }
      } catch (error) {
        console.error('Error:', error);
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
              <Label htmlFor="username">아이디:</Label>
              <Input type="text" id="id" name="id" placeholder="아이디를 입력하세요" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">비밀번호:</Label>
              <Input type="password" id="pw" name="pw" placeholder="비밀번호를 입력하세요" />
            </FormGroup>
            <SubmitButton type="submit">로그인</SubmitButton>
            <UserLink to="/signup">회원가입</UserLink>
          </form>
        </UserFormContainer>
      </UserContainer>
    );
  };
  
  export default LoginForm;
