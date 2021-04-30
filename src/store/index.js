
import { combineReducers } from 'redux'
import { pedidoReducer } from './pedidosReducer';
import { mensagemReducer } from './mensagensReducer'
import { fornecedorReducer } from './fornecedoresReducer'

const mainReducer = combineReducers({
  pedidos: pedidoReducer,
  mensagens: mensagemReducer,
  fornecedores: fornecedorReducer
})

export default mainReducer;
