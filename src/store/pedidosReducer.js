import axios from 'axios'
import { mostrarMensagem } from './mensagensReducer'

import api from '../services/api'



const ACTIONS = {
  LISTAR: 'PEDIDOS_LISTAR',
  ADD: 'PEDIDOS_ADD',
  REMOVER: 'PEDIDOS_REMOVE',
  UPDATE_STATUS: 'PEDIDOS_UPDATE_STATUS'


}

const ESTADO_INICIAL = {
  pedidos: []
}

export const pedidoReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return { ...state, pedidos: action.pedidos }

    case ACTIONS.ADD:
      return { ...state, pedidos: [...state.pedidos, action.pedido] }

    case ACTIONS.REMOVER:
      const id = action.id
      const pedidos = state.pedidos.filter(pedido => pedido.id !== id)
      return { ...state, pedidos: pedidos }

    case ACTIONS.UPDATE_STATUS:
      const lista = [...state.pedidos]
      lista.forEach(pedido => {
        if (pedido.id === action.id) {
          pedido.done = true
        }
      })
      return { ...state, pedidos: lista }

    default:
      return state;

  }

}

export function listar() {
  return dispatch => {

    api.get('/wp-json/wc/v3/orders', {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      dispatch({
        type: ACTIONS.LISTAR,
        pedidos: response.data
      })
    })

  }

}

export function salvar(pedido) {
  return dispatch => {
    api.post('', pedido, {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      dispatch
        (
          [{
            type: ACTIONS.ADD,
            pedido: response.data
          }, mostrarMensagem('Pedido adicionada com sucesso!')]

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
      }, mostrarMensagem('Pedido deletada com sucesso!')])
    })
  }
}

export function alterarStatus(id) {
  return dispatch => {
    api.patch(`/${id}`, null, {
      headers: { 'Authorization': localStorage.getItem('@user-Token') }
    }).then(response => {
      dispatch([{
        type: ACTIONS.UPDATE_STATUS,
        id: id
      }, mostrarMensagem('Status atualizado com sucesso!')])
    })
  }
}
