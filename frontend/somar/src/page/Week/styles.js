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

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem 2rem;

  h5 {
    font-size: 2.4rem;
    font-weight: 700;
    padding: 0;
    margin: 0;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const FooterListItem = styled.li`
  margin: 0rem 2rem;

  i {
    font-size: 2rem;
    color: ${colors.regular};
  }

  :hover {
    i {
      color: orange;
    }
  }
`;

export const FooterHeader = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: column;

  h5 {
    font-size: 1.6rem;
    padding: 0;
    margin: 0;
  }
`;

export const ContentResetCity = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  padding-bottom: 2rem;

  a {
    color: ${colors.regular};
    text-decoration: underline;
  }
`;
