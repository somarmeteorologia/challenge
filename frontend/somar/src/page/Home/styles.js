import styled, { css } from "styled-components";
import media from "styled-media-query";
import { colors } from "../../style/styles";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.lessThan("medium")`
    flex-direction: column;
  `}

  .content {
    display: flex;
    flex: 1;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  justify-content: flex-end;
  min-height: 4rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  border: 1px solid #fff;
  padding: 1rem;
  border-radius: 2px;

  ${media.lessThan("medium")`
    flex-direction: column;
    padding: 0;
    border: none;
    width: 90%;
  `}
`;

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.8rem;
  padding-bottom: 0.4rem;
  color: ${colors.regular};
  margin: 0;
`;

export const Input = styled.input`
  height: 4rem;
  width: 40rem;
  padding-left: 1rem;
  color: ${colors.regular};
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid ${colors.regular};
  border-radius: 4px;

  ::placeholder {
    font-size: 1.2rem;
  }

  :focus {
    outline-color: #fff;
    border: 1px solid orange;
    background-color: #fff;
  }

  :active {
    background-color: #fff;
  }

  ${media.lessThan("medium")`
  width: 90%;
  :focus {
    outline-color: black;
    border: 1px solid orange;
  }

  `}
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;

  div {
    margin: 1rem 0rem;
  }
`;

export const Title = styled.h1`
  color: ${colors.regular};
  font-size: 2rem;
  font-weight: 500;
  align-self: flex-start;

  ${media.lessThan("medium")`
  padding-top: 2rem;
  `}
`;

export const ButtonSubmit = styled.button`
  padding: 1rem 2rem;
  display: inline-block;
  background-color: ${colors.primary};
  border-radius: 4px;
  border-color: ${colors.primary};

  span {
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.light};
  }

  :hover {
    background-color: ${colors.primaryDark};
    transition: 0.4s;
  }

  ${props =>
    props.disabled &&
    css`
      background-color: ${colors.primaryLight};
      border-color: ${colors.primaryLight};
      opacity: 0.4;
    `}
`;

export const Background = styled.div`
  background-color: orange;
  display: flex;
  height: 22rem;
  width: 22rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 12rem;
    color: ${colors.light};
  }

  ${media.lessThan("medium")`
  width: 100%;
`}
`;

export const ContentRight = styled.div`
  ${media.lessThan("medium")`
    width: 80%;
  `}
`;

export const InputSelect = styled.select`
  height: 4rem;
  width: 40rem;
  padding-left: 1rem;
  color: ${colors.regular};
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid ${colors.regular};
`;
