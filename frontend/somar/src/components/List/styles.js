import styled, { css } from "styled-components";
import media from "styled-media-query";
import { colors } from "../../style/styles";

export const Text = styled.p`
  font-size: 1.4rem;
  display: flex;
  flex: 1;
  height: 10rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.6rem;

  i {
    margin-right: 1rem;
  }

  ${props =>
    props.max &&
    css`
      color: ${colors.max};
    `}

  ${props =>
    props.min &&
    css`
      color: ${colors.min};
    `}
`;

export const TableHeader = styled.thead`
  background-color: ${colors.light};
`;

export const Days = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: ${colors.regular};
  font-weight: 700;

  ${media.lessThan("medium")`
    font-size: 1rem;
  `}
`;
