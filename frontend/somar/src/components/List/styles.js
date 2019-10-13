import styled, { css } from "styled-components";
import media from "styled-media-query";
import { colors } from "../../style/styles";

export const Icon = styled.i`
  opacity: 0.4;
  color: #3fa2f7;
  margin: 0 !important;
  padding: 0;

  ${props =>
    props.active &&
    css`
      color: #3fa2f7;
      opacity: 1;
    `};
`;

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

    color: ${props => props.color}
`;

export const TextHumidity = styled(Text)`
  flex: 0;
  padding: 0 1rem;

  ${Icon} {
    /* width: 5px;
    height: 5px; */
  }
`;

export const TableHeader = styled.thead`
  background-color: ${colors.header};
  text-align: center;

  tr {
    height: 90px;
  }

  .header__content {
    background-color: ${colors.header};
  }

  span {
    text-align: center;
    font-weight: 300;
    color: grey;
    font-size: 1.4rem;
    padding-bottom: 0.4rem;
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
    border-bottom: 1px solid ${colors.border} !important;

    :hover {
      opacity: 0.8;
      background-color: ${colors.light};
    }
  }
`;

export const ContentTable = styled.div`
  padding: 2rem;

  .table thead th {
    padding: 2rem !important;
  }
`;
