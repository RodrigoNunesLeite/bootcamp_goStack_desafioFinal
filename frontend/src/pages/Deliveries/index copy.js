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
      <TitleList>
        <strong>Gerenciando encomendas</strong> <br />
        <input type="Text" placeholder="Buscar por encomendas" />
      </TitleList>
      <Content>
        <table cellSpacing="0" cellPadding="5" width="900px">
          <thead align="center">
            <tr className="stiloLista">
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          {orders.map((order) => (
            <tr align="center" className="linhaBranca" key={order.id}>
              <td className=" bordaEsquerda">{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.deliveryman.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>{order.status}</td>
              <td className="bordaDireita">
                <Actions />
              </td>
            </tr>
          ))}
        </table>
      </Content>
    </Container>
  );
}
