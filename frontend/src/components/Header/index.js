import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Menu } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
        </nav>

        <Menu>
          <ul>
            <li>
              <Link to="/deliveries">ENCOMENDAS</Link>
            </li>
            <li>
              <Link to="/">ENTREGADORES</Link>
            </li>
            <li>
              <Link to="/">DESTINATÁRIOS</Link>
            </li>
            <li>
              <Link to="/">PROBLEMAS</Link>
            </li>
          </ul>
        </Menu>
      </Content>
    </Container>
  );
}
