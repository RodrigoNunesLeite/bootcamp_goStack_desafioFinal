import React, { useState, useMemo, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-iconts/md';
import api from '~/services/api';

import { Container, Content, TitleList, Initials, MenuNav } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    setPage('1');
  });

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems');

      const data = response.data.map((problems) => ({
        ...problems,
      }));
      setProblems(data);
    }
    loadProblems();
  }, page);
}
