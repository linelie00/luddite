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
  //text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  text-align: right;
  float: center;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  //margin-bottom: 10px;
  margin-top:60px;
  //width: 600px;
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
    text-align: right;
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
  align-items: center;
  text-align: right;
`;

const UserLink = styled(Link)`
  display: block;
  text-align: right;
  margin-top: 20px;
  text-decoration: none;
  font-size: 14px;
  color: #864971;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  //justify-content: space-between;
  float: right;
`;


const EditProfileForm = () => {
  const { isLoggedIn, userId, userName } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [currentPwErrorMessage, setCurrentPwErrorMessage] = useState("");
  const [newPwErrorMessage, setNewPwErrorMessage] = useState("");
  const [confirmPwErrorMessage, setConfirmPwErrorMessage] = useState("");
  const [inputId, setInputId] = useState(userId);
  const [inputName, setInputName] = useState(userName);
  const [inputPw, setInputPw] = useState("");
  const [inputNewPw, setInputNewPw] = useState("");
  const [inputConfirmPw, setInputConfirmPw] = useState("");
  const [checkId, setCheckId] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { updateUserName, updateUserId, logout } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    // 회원정보를 불러오는 비동기 함수
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://43.200.49.227:8282/use/editProfile', {
        old_id: userId,
        user_name: inputName,
        id: inputId,
        checkId
      });
      // 서버에서 반환한 메시지를 설정
      setErrorMessage(response.data.message);
      console.log(response.data.message, inputId, inputName, checkId);
      updateUserName(inputName);
      updateUserId(inputId);
    } catch (error) {
      console.log('회원정보 수정 실패');
      if (error.response && error.response.data && error.response.data.error) {
        // 서버에서 반환한 오류 메시지를 설정
        setErrorMessage(error.response.data.error);
      } else {
        // 기타 오류 처리
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };
  



  //아이디 인풋 바뀌었을 때
  const handleChangeId = (e) => {
    const inputValue = e.target.value;
    setInputId(inputValue);
    setCheckId(false);
    if(inputValue.length > 20) {
      setIdErrorMessage("아이디는 20자 이하로 입력해주세요.");
    }
    else if(inputValue.includes(" ")) {
      setIdErrorMessage("아이디에 공백이 포함되어 있습니다.");
    }
    else {
      setIdErrorMessage("");
    }
};

  //이름 인풋 바뀌었을 때
  const handleChangeName = (e) => {
    const inputValue = e.target.value;
    setInputName(inputValue);
    if(inputValue.length > 10) {
      setNameErrorMessage("이름은 10자 이하로 입력해주세요.");
    }
    else if(inputValue.includes(" ")) {
      setNameErrorMessage("이름에 공백이 포함되어 있습니다.");
    }
    else {
      setNameErrorMessage("");
    }
  };

  //비밀번호 인풋 바뀌었을 때
  const handleChangePw = (e) => {
    const inputValue = e.target.value;
    setInputPw(inputValue);
    if(inputValue.length > 15) {
      setCurrentPwErrorMessage("비밀번호는 15자 이하로 입력해주세요.");
    }
    else if(inputValue.includes(" ")) {
      setCurrentPwErrorMessage("비밀번호에 공백이 포함되어 있습니다.");
    }
    else {
      setCurrentPwErrorMessage("");
    }
  };

  const handleChangeNewPw = (e) => {
    const inputValue = e.target.value;
    setInputNewPw(inputValue);
    if(inputValue.length > 15) {
      setNewPwErrorMessage("비밀번호는 15자 이하로 입력해주세요.");
    }
    else if(inputValue.includes(" ")) {
      setNewPwErrorMessage("비밀번호에 공백이 포함되어 있습니다.");
    }
    else if(inputValue !== inputConfirmPw && !inputConfirmPw) {
      setConfirmPwErrorMessage("비밀번호가 일치하지 않습니다.");
    }
    else {
      setNewPwErrorMessage("");
      setConfirmPwErrorMessage("");
    }
  };

  const handleChangeConfirmPw = (e) => {
    const inputValue = e.target.value;
    setInputConfirmPw(inputValue);
    if(inputValue.length > 15) {
      setConfirmPwErrorMessage("비밀번호는 15자 이하로 입력해주세요.");
    }
    else if(inputValue.includes(" ")) {
      setConfirmPwErrorMessage("비밀번호에 공백이 포함되어 있습니다.");
    }
    else if(inputValue !== inputNewPw) {
      setConfirmPwErrorMessage("비밀번호가 일치하지 않습니다.");
    }
    else {
      setConfirmPwErrorMessage("");
    }
  };

  //아이디 중복체크 버튼 클릭 시
  const handleCheckId = async () => {
    if (inputId === userId) {
      setIdErrorMessage("현재 아이디와 동일합니다.");
      setCheckId(true);
      return;
    }

    if (inputId.length > 20) {
      return;
    }

    try {
      const response = await axios.post('http://43.200.49.227:8282/use/checkId', { id: inputId });
      console.log(response.data.message);
      setIdErrorMessage(response.data.message);
      setCheckId(true);
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

  //비밀번호 수정 모달 확인 버튼 클릭 시
  const handleModalConfirm = async () => {
    if (inputPw.length > 15 || inputNewPw.length > 15 || inputConfirmPw.length > 15) {
      return;
    }
  
    if (inputNewPw !== inputConfirmPw) {
      setPwErrorMessage("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      const response = await axios.post('http://43.200.49.227:8282/use/checkPw', { 
        id: userId,
        pw: inputPw,
        newPw: inputNewPw,
        confirmPw: inputConfirmPw
      });
      console.log(response.data.message);
      setPwErrorMessage('');
      // 성공 알림 표시
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // 비밀번호 입력 필드 초기화
      setInputPw('');
      setInputNewPw('');
      setInputConfirmPw('');
      closeModal();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setPwErrorMessage(error.response.data.error);
      } else {
        setPwErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <UserContainer>
      <Link to="/">
        <HeaderIcon />
      </Link>
      <UserFormContainer>
          <Divider />
          <FormGroup>
            <Label htmlFor="username">이름</Label>
            <InputGroup>
              <Input type="text" id="user_name" name="user_name" value={inputName} onChange={handleChangeName}/>
            </InputGroup>
          </FormGroup>
          {nameErrorMessage && <ErrorMessage>{nameErrorMessage}</ErrorMessage>}
          <Divider />
          <FormGroup>
            <Label htmlFor="userid">아이디</Label>
            <InputGroup>
              <Input type="text" id="id" name="id" value={inputId} onChange={handleChangeId}/>
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
          <Group>
            <CancelButton type="button">취소</CancelButton>
            <SubmitButton type="button" onClick={handleSubmit}>회원정보 수정</SubmitButton>
        </Group>
        {errorMessage && <CheckErrorMessage>{errorMessage}</CheckErrorMessage>}
        <LinkContainer>
          <UserLink to="/" onClick={handleLogout}>로그아웃</UserLink>
          <UserLink to="/deleteUser">탈퇴하기</UserLink>
        </LinkContainer>
      </UserFormContainer>
      
     
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <FormGroup>
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input type="password" id="current-password" name="current-password" onChange={handleChangePw} />
            </FormGroup>
            {currentPwErrorMessage && <ErrorMessage>{currentPwErrorMessage}</ErrorMessage>}
            <FormGroup>
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input type="password" id="new-password" name="new-password" onChange={handleChangeNewPw} />
            </FormGroup>
            {newPwErrorMessage && <ErrorMessage>{newPwErrorMessage}</ErrorMessage>}
            <FormGroup>
              <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
              <Input type="password" id="confirm-password" name="confirm-password" onChange={handleChangeConfirmPw} />
            </FormGroup>
            {confirmPwErrorMessage && <ErrorMessage>{confirmPwErrorMessage}</ErrorMessage>}
            <Group>
              <CancelButton type="button" onClick={closeModal}>취소</CancelButton> 
              <SubmitButton type="button" onClick={handleModalConfirm}>확인</SubmitButton> 
            </Group>
              {pwErrorMessage && <CheckErrorMessage>{pwErrorMessage}</CheckErrorMessage>}
          </ModalContent>
        </Modal>
      )}
    </UserContainer>
  );
};

export default EditProfileForm;
