import styled from "styled-components";

export const CancelIconButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.HIGHLIGHT};
  border-radius: 2px;
  padding: 1px;
  cursor: pointer;
`;

export const ScreenshotContainer = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.INPUT_BACKGROUND};

  &:hover {
    ${CancelIconButton} {
      display: flex;
    }
  }
`;
