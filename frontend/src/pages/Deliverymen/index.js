import React, { useState, useMemo, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content, TitleList, Initials, MenuNav } from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    setPage('1');
  });

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('deliverymen/""');

      const data = response.data.map((deliverymen) => ({
        ...deliverymen,
        url: deliverymen.avatar ? deliverymen.avatar.url : null,
        initials: deliverymen.name.split(' '),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }));
      setDeliverymen(data);
      console.log(data);
    }

    loadDeliverymen();
  }, page);

  return (
    <Container>
      <Content>
        <TitleList>
          <h3>
            <strong>Gerenciando entregadores</strong>
          </h3>
        </TitleList>

        <MenuNav>
          <input
            type="Text"
            placeholder={<MdSearch size={20} color="#FFF" />}
          />

          <button type="button" name="btncad">
            <div>
              <MdAdd size={25} color="#fff" />
              Cadastrar
            </div>
          </button>
        </MenuNav>
        <ul className="stiloLista">
          <li>ID</li>
          <li>Foto</li>
          <li>Nome</li>
          <li>Email</li>
          <li>Ações</li>
        </ul>
        {deliverymen.map((deliveryman) => (
          <ul className="linhaBranca" key={deliveryman.id}>
            <li>#{deliveryman.id}</li>
            <li>
              {deliveryman.url ? (
                <img src={deliveryman.url} alt="avatar" className="imgAvatar" />
              ) : (
                <Initials className="divAvatar" cor={deliveryman.color}>
                  {deliveryman.initials[0].substring(0, 1)}

                  {deliveryman.initials[1]
                    ? deliveryman.initials[1].substring(0, 1)
                    : ''}
                </Initials>
              )}
            </li>
            <li>{deliveryman.name}</li>
            <li>{deliveryman.email}</li>
            <li>...</li>
          </ul>
        ))}
      </Content>
    </Container>
  );
}
