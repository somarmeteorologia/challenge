import styled, { css } from "styled-components";
import { colors } from "../../style/styles";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 40rem;
  padding: 7rem 10rem;
`;

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderList = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.light};
  padding: 1rem;
  height: 10rem;
`;

export const TempList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const Temp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Days = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: ${colors.regular};
  font-weight: 700;
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

export const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 20rem;
`;

export const ContentLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListDays = styled(List)`
  flex-direction: column;

  span {
  }
`;
