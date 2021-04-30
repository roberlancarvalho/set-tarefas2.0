import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';
// import {} from '../../views/SignUp/SignUp'

const PrivateRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={mathprops =>
        isAuthenticated() ? (
          <Layout>
            <Component {...mathprops} />
          </Layout>
        ) : (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
  path: PropTypes.string,

};

export default PrivateRoute;
