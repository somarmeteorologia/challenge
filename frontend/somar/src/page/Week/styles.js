import styled, { css } from "styled-components";
import media from "styled-media-query";
import { colors } from "../../style/styles";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  justify-content: center;

  ${media.lessThan("medium")`
    height: auto;
    padding: 0;
  `}
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

export const ContentLoading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
`;
