import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7d40e7, #7d40e7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  tex-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background: #fff;
    border-radius: 4px;
    height: 350px;
    margin: 20px;

    img {
      padding-top: 35px;
      height: 75px;
      width: 200px;
      align-self: center;
    }

    div {
      width: 75px;
      padding-left: 25px;
      padding-top: 40px;
      display: flex 1;

      text {
        width: 70px;
        align: left;
        font-weight: bold;
      }

      input {
        background-color: #fff;
        border: 1px solid #b9b9b9;
        border-radius: 4px;
        height: 35px;
        width: 230px;
        padding: 0 15px;
        margin: 0 0 10px;

        &::placeholder {
          color: #b9b9b9;
        }
      }

      img {
        border-color: #7159c1;
      }
      span {
        color: #fb6f91;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        width: 230px;
        background: #7d40e7;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;

        &::hover {
          background: ${darken(0.03, '#3b9eff')};
        }
      }

      a {
        color: #fff;
        margin-top: 15px;
        font-size: 16px;
        opacity: 0.8;

        &::hover {
          opacity: 1;
        }
      }
    }
  }
`;
