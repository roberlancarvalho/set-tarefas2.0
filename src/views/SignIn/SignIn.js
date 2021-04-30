import React, { useState, useEffect } from 'react'; //
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import api from '../../services/api'
import { login } from '../../services/auth'

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'campo obrigatório' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'campo obrigatório' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'campo obrigatório' },
    length: {
      maximum: 128
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
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

// class SignIn extends Component {
//   state = {
//     email: "",
//     username:"",
//     password: "",
//     error: ""
//   };

const SignIn = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');

  // style = (useStyles) =>{
  //   const classes = useStyles();
  // }

  // const { history } = this.props;

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


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const history = useHistory();

  const handleSignIn = async e => {
    e.preventDefault();
    localStorage.setItem('email_usuario_logado', username)

    try {
      const response = await api.post('wp-json/jwt-auth/v1/token', { username, password })
      login(response.data.token);
      alert(`Bem vindo(a), ${username}!`)
      history.push('/dashboard')
    } catch (err) {
      alert('Usuário ou senha inválida. Tente novamente!')
    }
    // }
  };


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // render(){

  const classes = useStyles();

  return (
    <div className={classes.root} >

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
                Cadastre suas tarefas no sistema e tenha melhor controle e gerenciamento delas. Basta logar com seu email e cadastrá-las na página.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.quoteText}
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
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Login
                </Typography>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Entre com seu endereço de email ou nome  de usuário
                </Typography>

                {/* {this.state.error && <p>{this.state.error}</p>} */}

                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  label="Email ou nome de usuário"
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  // value={formState.values.username || ''}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Senha"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  // value={formState.values.password || ''}
                  variant="outlined"
                />

                <Button
                  className={classes.signInButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  onClick={handleChange}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Entrar
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

                <Typography
                  color="textSecondary"
                  variant="body1"
                >

                  Esqueci minha senha | {' '}
                  <Link
                    component={RouterLink}
                    to="/recuperarsenha"
                    variant="h6"
                  >
                    Recuperar senha
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
// };

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
