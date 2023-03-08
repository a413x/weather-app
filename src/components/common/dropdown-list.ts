import styled from "styled-components";

const DropdownListItem = styled.div`
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  padding: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export { DropdownList, DropdownListItem };
