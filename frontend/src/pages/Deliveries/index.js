import React, { useState, useMemo, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content, TitleList, InputContainer } from './styles';
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

  async function findByName() {
    const name_product = document.getElementById('txtNameProduct');
    const response = await api.get(`orders/${name_product}`);

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

  return (
    <form name="form1">
      <Container>
        <Content>
          <TitleList>
            <h3>
              <strong>Gerenciando encomendas</strong>
            </h3>
          </TitleList>
          <InputContainer>
            <MdSearch size={20} />

            <input
              type="Text"
              name="txtNameProduct"
              id="txtNameProduct"
              placeholder="Buscar por encomendas"
              onChange={findByName}
            />
          </InputContainer>

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
    </form>
  );
}
