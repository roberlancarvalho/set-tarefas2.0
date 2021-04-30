import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api'
import { recuperacao } from '../../services/auth'

import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Link,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'campo obrigatório' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'campo obrigatório' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {

    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 0,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(1)
  },
  textField: {
    marginTop: theme.spacing(1)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  recuperarSenhaButton: {
    margin: theme.spacing(2, 0)
  }
}));

const RecuperarSenha = props => {
  const { history } = props;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleBack = () => {
    history.goBack();
  };

  const handleRecuperarSenha = async e => {
    e.preventDefault();

    try {
      const response = await api.post('/wp-json/wp/v2/users/', { username, email })
      recuperacao(response.data.token);
      alert(`Senha enviada para o email ${email}. Verifique sua caixa de entra`)
      history.push('/login')
    } catch (err) {

      alert('Algo deu errado. Verifique se todos os campos foram preenchidos correntamente e tente novamente!')
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Cadastre suas tarefas no sistema e tenha melhor controle e gerenciamento delas.
                Basta logar com seu email e cadastrá-las na página.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Set Tarefas
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Garenciador de Tarefas Online
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>

              <form
                className={classes.form}
                onSubmit={handleRecuperarSenha}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Recuperar Senha
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Insira seu nome de usuário e seu email para enviarmos um email de recuperação
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Nome de usuário. Ex.: jose_almeida"
                  name="username"
                  type="text"
                  onChange={e => setUsername(e.target.value)}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="E-mail"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  variant="outlined"
                />

                <Button
                  className={classes.recuperarSenhaButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Enviar nova senha para o email
                </Button>

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  
                  Não tenho conta | {' '}
                  <Link
                    component={RouterLink}
                    to="/cadastro"
                    variant="h6"
                  >
                    Cadastrar-se
                  </Link>
                </Typography>

              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

RecuperarSenha.propTypes = {
  history: PropTypes.object
};

export default withRouter(RecuperarSenha);
