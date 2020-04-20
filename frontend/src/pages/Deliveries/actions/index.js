import React, { useState, useEffect, useMemo } from 'react';

import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Action, ActionList, ContainerList } from './styles';

export default function Actions() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Action onClick={handleToggleVisible}>...</Action>

      <ActionList visible={visible}>
        <ContainerList>
          <div>
            <button type="submit" name="btnDelete" id="btnDelete">
              <MdRemoveRedEye color="#8e5be8" size={10} /> Visualizar
            </button>
          </div>
          <div>
            <button type="submit" className="bordaBottom">
              <MdEdit color="#76a2f2" size={10} /> Editar
            </button>
          </div>

          <div>
            <button type="submit">
              <MdDeleteForever color="#e66c6c" size={10} /> Excluir
            </button>
          </div>
        </ContainerList>
      </ActionList>
    </Container>
  );
}
