import React, { useState, useMemo, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content, TitleList, Initials, MenuNav } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    setPage('1');
  });

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients/""');

      const data = response.data.map((recipients) => ({
        ...recipients,
      }));
      setRecipients(data);
    }
    loadRecipients();
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
          <li>Nome</li>
          <li>Endereço</li>
          <li>Ações</li>
        </ul>
        {recipients.map((recipients) => (
          <ul className="linhaBranca" key={recipients.id}>
            <li>#{recipients.id}</li>
            <li>{recipients.name}</li>
            <li>{`${recipients.street},${recipients.city}-${recipients.state}`}</li>
            <li>...</li>
          </ul>
        ))}
      </Content>
    </Container>
  );
}
