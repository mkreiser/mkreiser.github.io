import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { HashRouter as Router } from 'react-router-dom';

import routes from './Routes';

const Root = () => {
  return (
    <Router>
      { renderRoutes(routes) }
    </Router>
  );
};

export default Root;

