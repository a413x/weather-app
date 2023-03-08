import styled from "styled-components";

const Input = styled.input`
  min-height: 28px;
  position: relative;
  padding: 5px;
  line-height: 14px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  &:hover {
    border-color: #4096ff;
  }
  &:focus {
    outline: none;
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
`;

export default Input;
