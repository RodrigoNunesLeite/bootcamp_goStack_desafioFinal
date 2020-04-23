import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  width: 100%;
  position: fixed;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  // justify-content: space-between;
  align-items: left;

  nav {
    width: 200px;
    padding: 15px;
    // border-right: 1px solid silver;

    img {
      width: 140px;
      height: 40px;
    }
  }
`;

export const Menu = styled.div`
  padding: 20px;
  // background-color: blue;
  width: 600px;

  ul li {
    display: inline-block;
    margin-left: 20px;
  }

  a:hover {
    color: #000;
  }

  a {
    margin-top: 2px;
    font-size: 12px;
    color: #999;
  }
`;
