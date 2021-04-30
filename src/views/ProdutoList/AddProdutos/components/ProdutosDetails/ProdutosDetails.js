import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  }
}));

const ProdutosDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    produto: '',
    descricao: '',
    fornecedor: '',
    marca: '',
    preco: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const states = [

  //   {
  //     value: 'AC',
  //     label: 'Acre'
  //   },
  //   {
  //     value: 'AL',
  //     label: 'Alagoas'
  //   },
  //   {
  //     value: 'AM',
  //     label: 'Amazonas'
  //   },
  //   {
  //     value: 'AP',
  //     label: 'Amapá'
  //   },
  //   {
  //     value: 'BA',
  //     label: 'Bahia'
  //   },
  //   {
  //     value: 'CE',
  //     label: 'Ceará'
  //   },
  //   {
  //     value: 'DF',
  //     label: 'Distrito Federal'
  //   },
  //   {
  //     value: 'ES',
  //     label: 'Espírito Santo'
  //   },
  //   {
  //     value: 'GO',
  //     label: 'Goiás'
  //   },
  //   {
  //     value: 'MA',
  //     label: 'Maranhão'
  //   },
  //   {
  //     value: 'MG',
  //     label: 'Minas Gerais'
  //   },
  //   {
  //     value: 'MS',
  //     label: 'Mato Grosso do Sul'
  //   },
  //   {
  //     value: 'MT',
  //     label: 'Mato Grosso'
  //   },
  //   {
  //     value: 'PA',
  //     label: 'Pará'
  //   },
  //   {
  //     value: 'PB',
  //     label: 'Paraíba'
  //   },
  //   {
  //     value: 'PE',
  //     label: 'Pernambuco'
  //   },
  //   {
  //     value: 'PI',
  //     label: 'Piauí'
  //   },
  //   {
  //     value: 'PR',
  //     label: 'Paraná'
  //   },
  //   {
  //     value: 'RJ',
  //     label: 'Rio de Janeiro'
  //   },
  //   {
  //     value: 'RN',
  //     label: 'Rio Grande do Norte'
  //   },
  //   {
  //     value: 'RO',
  //     label: 'Rondônia'
  //   },
  //   {
  //     value: 'RR',
  //     label: 'Roraima'
  //   },
  //   {
  //     value: 'RS',
  //     label: 'Rio Grande do Sul'
  //   },
  //   {
  //     value: 'SC',
  //     label: 'Santa Catarina'
  //   },
  //   {
  //     value: 'SE',
  //     label: 'Sergipe'
  //   },
  //   {
  //     value: 'SP',
  //     label: 'São Paulo'
  //   },
  //   {
  //     value: 'TO',
  //     label: 'Tocantins'
  //   }
  // ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >

        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              color="primary"
              component="span"
              variant="contained"
            >
              Upload de imagem
              <PhotoCamera />
            </Button>
          </label>
        </div>

        <CardHeader
          subheader="Informações do produto"
          title="Produto"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Especifique o seu primeiro nome"
                label="Produto"
                margin="dense"
                name="nome"
                onChange={handleChange}
                required
                value={values.produto}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Descrição"
                margin="dense"
                name="descricao"
                onChange={handleChange}
                required
                type="text"
                value={values.descricao}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Fornecedor"
                margin="dense"
                name="fornecedor"
                onChange={handleChange}
                required
                value={values.fornecedor}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Marca"
                margin="dense"
                name="marca"
                onChange={handleChange}
                required
                value={values.marca}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Preço"
                margin="dense"
                name="preco"
                onChange={handleChange}
                required
                type="number"
                value={values.preco}
                variant="outlined"
              />

            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ProdutosDetails.propTypes = {
  className: PropTypes.string
};

export default ProdutosDetails;
