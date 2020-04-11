import React from 'react';

/**
 * PropTypes = Serve para verificarmos se todas as
 * propriedades estão sendo passadas para o componente,
 * nesse caso, o componente só espera receber as children
 */

import PropTypes from 'prop-types';

/**
  * Usar o nome do componente de layout como
  * wrapper é apenas para facilitar na hora da
  * analise do inspecionar elemento
  *
  * Content = para centralizar o conteudo no centro
  * da tela
  */

import { Wrapper, Content } from './styles';

/**
   * Como funciona o children = sempre que alguém
   * quer usar o AuthLayout com algum conteudo dentro, o
   * layout ja vai identificar esses dados
   * <AuthLayout>div</AuthLayout>
   */

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
