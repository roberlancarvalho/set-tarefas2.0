import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { SearchInput } from 'components';


import {
  Button,
  // TextField,
  // Grid,
  // Select,
  // MenuItem,
  // FormControl,
  // InputLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PedidosToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.editarButton}>Editar</Button>
        <Button className={classes.excluirButton}>Excluir</Button>
        <Button
          component={RouterLink}
          to="/AddPedido"
          color="primary"
          variant="contained"
        >
          Adicionar Pedido
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Procurar pedido"
        />
      </div>
    </div>
  );
};

PedidosToolbar.propTypes = {
  className: PropTypes.string
};

export default PedidosToolbar;
