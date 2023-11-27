import styled from "styled-components";

import {
  BORDER_RADIUS,
  FONT_FAMILY,
  FONT_SIZE,
} from "sidePanel/utils/globalStyles";
import { ColorTheme } from "sidePanel/utils/types";

export const StyledTextInput = styled.input<{ theme: ColorTheme }>`
  height: 32px;
  background-color: ${({ theme }) => theme.BLACK_5};
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid ${({ theme }) => theme.BLUE_3};
  color: ${({ theme }) => theme.BLUE_1};
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;

  &::placeholder {
    font-style: italic;
    color: ${({ theme }) => theme.GRAY_1};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.BLUE_5};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.BLUE_5};
  }
`;