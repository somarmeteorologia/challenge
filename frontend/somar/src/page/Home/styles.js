import styled, { css } from "styled-components";
import media from "styled-media-query";
import { colors } from "../../style/styles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 1rem;

  background-color: #fff;

  ${media.lessThan("medium")`
  display: flex;
    flex-direction: column;
  `}

  .content {
    display: flex;
    flex: 1;
  }
`;

export const Footer = styled.div`
  display: grid;
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
    /* flex-direction: column;
    padding: 0;
    border: none;
    width: 70%; */
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
  padding: 1rem 1.6rem;
  display: inline-block;
  background-color: orange;
  border-radius: 4px;
  border-color: orange;

  span {
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.light};
  }

  :hover {
    background-color: orange;
    transition: 0.4s;
  }

  ${props =>
    props.disabled &&
    css`
      background-color: orange;
      border-color: orange;
      opacity: 0.4;
    `}
`;

export const Background = styled.div`
  background-color: orange;
  margin-right: 2rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  i {
    justify-content: center;
    align-self: center;
    font-size: 12rem;
    color: ${colors.light};
  }

  ${media.lessThan("medium")`
  width: 100%;
  height: 100%;

  i {
    padding: 2rem;
  
  }
`}
`;

export const ContentRight = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  ${media.lessThan("medium")`
    width: 80%;
  `}
`;

export const InputSelect = styled.select`
  grid-area: 1 / 1 / 2 / 2;
  height: 4rem;
  width: 40rem;
  padding-left: 1rem;
  color: ${colors.regular};
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid ${colors.regular};

  ${media.lessThan("medium")`
    width: 25rem;
  `}
`;
