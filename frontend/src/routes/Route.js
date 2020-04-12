/**
 * Criado para geração de rotas privadas
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/**
 * Com o config-overrides, conseguimos trocar os ../ nos
 * caminhos das pastas, por ~(tio) e isso faz com que a busca
 * dos arquivos parta diretamente da pasta src
 */
import AuthLayout from '~pages/_layout/auth';
import DefaultLayou from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  /**
   * Aqui desestruturamos as propriedades que um
   * componente recebe
   *
   * Component foi colocado com "C" maisculo para
   * conseguirmos usar a sintaxe <Component>
   *
   * isPrivate é uma propriedade que enviamos nas rotas que
   * são privadas
   *
   * todas as demais propriedades deixamos no "rest"
   */
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  /**
   * Se o usuario não está logado e a rota não é privada,
   * nós o enviamos de volta para o login
   */
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
