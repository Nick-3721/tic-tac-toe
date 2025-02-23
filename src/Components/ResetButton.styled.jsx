import styled from "styled-components";

export const ResetButton = styled.button`  
  background-color: ${({ winner }) => 
    !winner ? '#1f3540' : (winner === 'X' ? '#FFC226' : '#25FFCC')};
  
  width: 220px;
  height: 60px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
  font-size: 18px;
  margin: 50px 0;
  color: #26ffcb;
  color: ${({ winner }) => 
    !winner ? '#26ffcb' : '#1f3540'};
  
  
  &:hover {
    background-color: ${({ winner }) => 
      !winner ? '#40606f' : (winner === 'X' ? '#ffd771' : '#7afcdd')};
  }
`