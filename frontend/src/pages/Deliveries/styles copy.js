import styled from 'styled-components';

export const Container = styled.div`
  padding: 80px 50px;
  width: 900px;
  margin: 0 auto;
  heigth: 100%;
`;

export const Content = styled.div`
  // background-color: blue;
  width: 900px;
  margin: 0 auto;

  .stiloLista {
    font-weight: bold;
  }
  .bordaEsquerda {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .bordaDireita {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .linhaBranca {
    background-color: #fff;
    // padding: 14px 0px 0px 0px;
    // margin-bottom: 20px;
    height: 40px;
  }

  td {
    width="7%";
    padding-bottom:12px;
  }

`;

export const TitleList = styled.div`
  margin-bottom: 20px;
`;
