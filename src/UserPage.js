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
  text-align: right;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
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
  text-align: left;
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
    background-color: #d4d4d4;
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
    background-color: #d4d4d4;
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

// 모달 스타일
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 컨텐츠 스타일
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;


const EditProfileForm = () => {
  const { isLoggedIn, setUserId, userId, setUserName, userName } = useAuth();
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputId, setInputId] = useState(userId); 
  const [inputName, setInputName] = useState(userName); 
  const [pw, setPw] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    // 회원정보를 불러오는 비동기 함수
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const userName = formData.get('user_name');
    const pw = formData.get('pw');

    try {
      const response = await axios.put('http://localhost:8282/use/update', {
        id,
        userName,
        pw
      });
      if (isLoggedIn(true) && response.status === 200) {
        console.log('회원정보 수정 성공');
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

  const handleCheckId = async () => {
    if (inputId === userId) {
      setIdErrorMessage("현재 아이디와 같습니다.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8282/use/checkId', { id: inputId });
      console.log(response.data.message);
      setIdErrorMessage(response.data.message);

      setInputId(inputId);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setIdErrorMessage(error.response.data.error);
      } else {
        setIdErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    closeModal(); 
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
              <Input type="text" id="user_name" name="user_name" value={inputName} onChange={(e) => setInputName(e.target.value)}/>
            </InputGroup>
          </FormGroup>
          <Divider />
          <FormGroup>
            <Label htmlFor="userid">아이디</Label>
            <InputGroup>
              <Input type="text" id="id" name="id" value={inputId} onChange={(e) => setInputId(e.target.value)}/>
              <IdButton type="button" onClick={handleCheckId}>아이디 중복 체크</IdButton> 
            </InputGroup>
          </FormGroup>
          {idErrorMessage && <ErrorMessage>{idErrorMessage}</ErrorMessage>}
          <Divider />
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <InputGroup>
              <PwButton type="button" onClick={openModal}>비밀번호 수정</PwButton>
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
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <FormGroup>
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input type="password" id="current-password" name="current-password" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input type="password" id="new-password" name="new-password" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
              <Input type="password" id="confirm-password" name="confirm-password" />
            </FormGroup>
            <FormGroup>
              <CancelButton type="button" onClick={closeModal}>취소</CancelButton> 
              <SubmitButton type="button" onClick={handleModalConfirm}>확인</SubmitButton> 
            </FormGroup>
          </ModalContent>
        </Modal>
      )}
    </UserContainer>
  );
};

export default EditProfileForm;
