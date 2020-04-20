import styled from 'styled-components';

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
    width: 70px;
    margin-left: 50px;
    margin-bottom: 20px;
    // background-color: green;
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
`;

export const TitleList = styled.div`
  margin-bottom: 20px;
`;
