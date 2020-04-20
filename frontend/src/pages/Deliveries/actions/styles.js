import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  width: 100px;
`;

export const Action = styled.button`
  background: none;
  border: 0;
`;

export const ActionList = styled.div`
  display: ${(props) => (props.visible ? '' : 'none')};
  border-radius: 3px;
  border: 1px solid #b4b2b4;
  position: absolute;
  background: #fff;
  width: 140px;
  height: 90px;
  z-index: 1;
`;

export const ContainerList = styled.div`
  width: 110px;
  height: 90px;
  overflow: auto;
  position: relative;
  // z-index: 2;
  //padding-right: 10px;
  div {
    width: 110px;
    // background: blue;
    margin-bottom: 10px;

    button {
      width: 110px;
      align: left;
      border: none;
      background: none;
    }

    .bordaBottom {
      border-bottom: 1px solid #b4b2b4;
      border-top: 1px solid #b4b2b4;
    }
  }
`;
