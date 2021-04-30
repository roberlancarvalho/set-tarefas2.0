
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';
import { FornecedoresToolbar, FornecedoresTable } from './components';
import mockData from './data';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  listar,
  salvar,
  deletar
} from '../../store/fornecedoresReducer'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FornecedorList = (props) => {
  const classes = useStyles()



  useEffect(() => {
    props.listar()
  }, [])


  // const [fornecedores] = useState(mockData);
  const [fornecedores, setFornecedores] = useState([]);

  return (
    <div className={classes.root}>
      <FornecedoresToolbar />
      <div className={classes.content}>
        <FornecedoresTable
          fornecedores={props.fornecedores}        //---------  PROPS REDUX ---------
        />

        {/* <div className={classes.content}>
          <AddFornecedores />
        </div> */}



      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fornecedores: state.fornecedores.fornecedores
})

const mapDispatchToProps = dispatch => bindActionCreators({
  listar,
  salvar,
  deletar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FornecedorList);
