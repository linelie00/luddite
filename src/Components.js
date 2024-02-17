// UsersComponents.js

import styled from 'styled-components';

export const UserContainer = styled.div`
  padding: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-right: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

export const SubmitButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: #864971;
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

export const Divider = styled.div`
  margin: 20px 0;
  border-top: 1px solid #ccc;
`;