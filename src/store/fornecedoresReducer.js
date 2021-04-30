import axios from 'axios'
import { mostrarMensagem } from './mensagensReducer'

import api from '../../src/services/api'



const ACTIONS = {
  LISTAR: 'FORNECEDORES_LISTAR',
  ADD: 'FORNECEDORES_ADD',
  REMOVER: 'FORNECEDORES_REMOVE',
  // UPDATE_STATUS: 'FORNECEDORES_UPDATE_STATUS'


}

const ESTADO_INICIAL = {
  fornecedores: []
}

export const fornecedorReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return { ...state, fornecedores: action.fornecedores }

    case ACTIONS.ADD:
      return { ...state, fornecedores: [...state.fornecedores, action.fornecedor] }

    case ACTIONS.REMOVER:
      const id = action.id
      const fornecedores = state.fornecedores.filter(fornecedor => fornecedor.id !== id)
      return { ...state, fornecedores: fornecedores }

    case ACTIONS.UPDATE_STATUS:
      const lista = [...state.fornecedores]
      lista.forEach(fornecedor => {
        if (fornecedor.id === action.id) {
          fornecedor.done = true
        }
      })
      return { ...state, fornecedores: lista }

    default:
      return state;

  }

}

export function listar() {
  return dispatch => {

    api.get('', {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      dispatch({
        type: ACTIONS.LISTAR,
        fornecedores: response.data
      })

    })

  }

}

export function salvar(fornecedor) {
  return dispatch => {
    api.post('', fornecedor, {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      dispatch(
        [{
          type: ACTIONS.ADD,
          fornecedor: response.data
        }, mostrarMensagem('Fornecedor adicionado com sucesso!')]

      )
    })
  }
}

export function deletar(id) {
  return disaptch => {
    api.delete(`//${id}`, {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      disaptch([{
        type: ACTIONS.REMOVER,
        id: id
      }, mostrarMensagem('Fornecedor deletado com sucesso!')])
    })
  }
}

// export function alterarStatus( id ){
//     return dispatch => {
//         api.patch(`/${id}`, null, {
//             headers: { 'x-tenant-id': localStorage.getItem('email') }
//           }).then( response => {
//               dispatch([{
//                   type: ACTIONS.UPDATE_STATUS, 
//                   id: id
//               }, mostrarMensagem('Status atualizado com sucesso!')])
//           })
//     }
// }
