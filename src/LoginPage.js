import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // AuthProvider에서 제공하는 useAuth 훅 가져오기
import { HeaderIcon } from './StyledComponents';
import { UserContainer, UserFormContainer, FormGroup, Label, Input, SubmitButton, UserLink, ErrorMessage } from './UsersComponents';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthProvider에서 제공하는 login 함수 가져오기

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
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
                login(); // 로그인 상태 변경
                const bookmarkData = response.data.bookmarks;
                localStorage.setItem('bookmarks', JSON.stringify(bookmarkData)); // 북마크 저장
                localStorage.setItem('userId', id); // 아이디 저장
                navigate('/'); // 메인 페이지로 이동
            }
        } catch (error) {
            console.log('로그인 실패');
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
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </UserContainer>
    );
};

export default LoginForm;
