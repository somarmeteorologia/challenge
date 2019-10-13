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
  padding: 0;
  margin: 0;

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
  background-color: ${colors.header};

  height: 8rem !important;

  .header__content {
    background-color: ${colors.header};
    text-align: center;
  }
`;

export const Days = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: ${colors.regular};
  font-weight: 700;
  padding: 0;
  margin: 0;

  ${media.lessThan("medium")`
    font-size: 1rem;
  `}
`;

export const TableBody = styled.tbody`
  tr {
    border: none !important;
  }

  th {
    background-color: #fff;
    border: none !important;
    border-bottom: 1px solid ${colors.light} !important;
  }
`;
