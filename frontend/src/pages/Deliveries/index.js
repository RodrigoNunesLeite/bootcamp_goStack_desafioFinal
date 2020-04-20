import React, { useState, useMemo, useEffect } from 'react';
import api from '~/services/api';

import { Container, Content, TitleList } from './styles';
import Actions from './actions';

export default function Deliveries() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    setPage('1');
  });

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders/``');

      const data = response.data.map((order) => ({
        ...order,
        status: order.end_date
          ? 'Entregue'
          : order.canceled_at
          ? 'Cancelado'
          : order.start_date
          ? 'Retirada'
          : 'Pendente',
      }));

      setOrders(data);
    }

    loadOrders();
  }, page);

  return (
    <Container>
      <Content>
        <TitleList>
          <h3>
            <strong>Gerenciando encomendas</strong>
          </h3>
          <input type="Text" placeholder="Buscar por encomendas" />
        </TitleList>
        <ul className="stiloLista">
          <li>ID</li>
          <li>Destinatário</li>
          <li>Entregador</li>
          <li>Cidade</li>
          <li>Estado</li>
          <li>Status</li>
          <li>Ações</li>
        </ul>
        {orders.map((order) => (
          <ul className="linhaBranca" key={order.id}>
            <li>#{order.id}</li>
            <li>{order.recipient.name}</li>
            <li>{order.deliveryman.name}</li>
            <li>{order.recipient.city}</li>
            <li>{order.recipient.state}</li>
            <li>{order.status}</li>
            <li>
              <Actions />
            </li>
          </ul>
        ))}
      </Content>
    </Container>
  );
}
