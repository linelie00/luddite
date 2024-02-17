import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { HeaderIcon } from './StyledComponents';
import styled from 'styled-components';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const UserFormContainer = styled.div`
  width: 600px;
  //padding: 20px;
  //border: 1px solid #ccc;
  border-radius: 5px;
  //margin-top: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  //margin-bottom: 15px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 50px;
  width: 600px;
  //padding: 20px;
`;

const Label = styled.label`
  flex: 1; /* 요소가 사용 가능한 가용 공간을 최대한 확장 */
  margin-bottom: 5px;
`;

const Input = styled.input`
  flex: 2; /* Label 보다 더 넓게 만들기 위해 2를 줌 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  flex: 3;
  display: flex;
  box-sizing: border-box;
  background-color: #f9f9f9;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #864971;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  margin-left: 5px;

  &:hover {
    background-color: #ad839f;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  margin-right: 5px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const IdButton = styled.button`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
  background-color: #afafaf;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #ad839f;
  }
`;

const PwButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #afafaf;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #ad839f;
  }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
    font-size: 14px;
`;

export const Divider = styled.div`
  margin: 20px 0;
  border-top: 1px solid #ccc;
`;

const EditProfileForm = () => {
  const { isLoggedIn, userId, userName } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState(""); // 상태 추가
  const [pw, setPw] = useState(""); // 상태 추가
  const navigate = useNavigate();

  // 회원정보를 불러오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8282/user/profile', {
        // 필요하다면 인증 토큰 등을 요청에 포함시킬 수 있습니다.
      });
      // 서버로부터 받은 정보를 상태에 설정합니다.
      setId(response.data.id);
      setPw(response.data.pw);
    } catch (error) {
      console.error('회원정보를 불러오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 회원정보를 불러옵니다.
    fetchUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target);
    const newId = formData.get('id');
    const newPw = formData.get('pw');

    try {
      const response = await axios.put('http://localhost:8282/user/profile', {
        id: newId,
        pw: newPw
      });
      if (response.status === 200) {
        console.log('회원정보 수정 성공');
        navigate('/profile'); // 프로필 페이지로 이동
      }
    } catch (error) {
      console.log('회원정보 수정 실패');
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
        <Divider />
          <FormGroup>
            <Label htmlFor="username">이름</Label>
            <InputGroup>
              <Input type="text" id="user_name" name="user_name" value={userName} onChange={(e) => setId(e.target.value)} />
            </InputGroup>
          </FormGroup>
          <Divider />
          <FormGroup>
            <Label htmlFor="username">아이디</Label>
            <InputGroup>
              <Input type="text" id="id" name="id" value={userId} onChange={(e) => setId(e.target.value)} />
              <IdButton type="submit">아이디 중복 체크</IdButton>
            </InputGroup>
          </FormGroup>
          <Divider />
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <InputGroup>
              <PwButton type="submit">비밀번호 수정</PwButton>
            </InputGroup>
          </FormGroup>
          <Divider />
        </form>
      </UserFormContainer>
      <Group>
        <CancelButton type="button">취소</CancelButton>
        <SubmitButton type="submit">회원정보 수정</SubmitButton>
      </Group>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </UserContainer>
  );
};

export default EditProfileForm;
