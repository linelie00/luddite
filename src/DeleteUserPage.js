import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { HeaderIcon } from './StyledComponents';
import styled, { css } from 'styled-components';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const UserFormContainer = styled.div`
  width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  text-align: right;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-top:60px;
`;

const Label = styled.label`
  flex: 1;
  margin-bottom: 5px;
  text-align: left;
`;

const Input = styled.input`
  flex: 2;
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
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  margin-left: 5px;
  ${({ isDisabled }) => isDisabled ? css`
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  ` : css`
    background-color: #864971;
    color: #fff;
    &:hover {
      background-color: #ad839f;
    }
  `}
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

const CheckErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;

const Divider = styled.div`
  margin: 20px 0;
  border-top: 1px solid #ccc;
`;

const DeleteProfileForm = () => {
  const { isLoggedIn, userId } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { deleteUser } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    navigate('/user');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pw = formData.get('pw');
    try {
        const response = await axios.post('http://43.200.49.227:8282/use/deleteUser', {
          id: userId,
          pw
        });
        // 서버에서 반환한 메시지를 설정
        setErrorMessage(response.data.message);
        deleteUser();
        alert('성공적으로 탈퇴되었습니다.');
        navigate('/');
      } catch (error) {
        console.log('회원 탈퇴 실패');
        if (error.response && error.response.data && error.response.data.error) {
          // 서버에서 반환한 오류 메시지를 설정
          setErrorMessage(error.response.data.error);
        } else {
          // 기타 오류 처리
          setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      }
      console.log(errorMessage);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    setIsDisabled(!password);
  }, [password]);

  return (
    <UserContainer>
      <Link to="/">
        <HeaderIcon />
      </Link>
      <UserFormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="userid">아이디</Label>
            <InputGroup>
              <Input type="text" id="id" name="id" value={userId} disabled={true} />
            </InputGroup>
          </FormGroup>
          <Divider />
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <InputGroup>
              <Input type="password" id="pw" name="pw" value={password} onChange={handlePasswordChange} />
            </InputGroup>
          </FormGroup>
          <Divider />
          <Group>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
            <SubmitButton type="submit" isDisabled={isDisabled}>확인</SubmitButton>
          </Group>
          {errorMessage && <CheckErrorMessage>{errorMessage}</CheckErrorMessage>}
        </form>
      </UserFormContainer>
    </UserContainer>
  );
};

export default DeleteProfileForm;
