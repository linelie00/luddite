import React, { useState } from 'react';
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
    ErrorMessage,
} from './UsersComponents';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

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
            }
        } catch (error) {
            console.log('로그인 실패');
            // 로그인 실패 시 처리
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error); // 서버에서 반환한 에러 메시지 설정
            } else {
                setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 기타 오류 처리
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
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* 에러 메시지 표시 */}
            </UserFormContainer>
        </UserContainer>
    );
};

export default LoginForm;
