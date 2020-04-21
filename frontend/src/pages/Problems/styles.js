import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  padding: 80px 50px;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  // background-color: blue;
  // padding-left: 50px;
  width: 900px;
  margin: 0 auto;

  ul li {
    display: inline-block;
    height: 10px;
    width: 90px;
    margin-left: 80px;
    margin-bottom: 20px;
    text-align: center;
  }

  .stiloLista {
    font-weight: bold;
  }

  .linhaBranca {
    background-color: #fff;
    border-radius: 3px;
    padding: 14px 0px 0px 0px;
    margin-bottom: 20px;
  }

  .imgAvatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

export const Initials = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding-top: 7px;
  padding-left: 0px;
  margin-left: 32px;
  background-color: ${(props) => props.cor};
  // color: #fff;
`;

export const TitleList = styled.div`
  margin-bottom: 20px;
`;

export const MenuNav = styled.div`
  width: 100%;
  padding-bottom: 20px;

  input {
    border: none;
    width: 230px;
    border-radius: 5px;
    height: 50px;
  }
  button {
    border: none;
    margin-left: 400px;
    background: #7d40e7;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;

    div {
      width: 170px;
    }
  }
`;
