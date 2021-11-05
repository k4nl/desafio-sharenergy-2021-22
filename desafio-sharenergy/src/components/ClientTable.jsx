import React from 'react'

import RenderClients from './RenderClients'

export default function ClientTable({ props }) {
  const { data, edit, remove, disabled } = props;

   return (
    <div className="table-container">
      <h1 className="title">Clientes</h1>
      <table>
        <thead>
          <tr className="table-title-container">
            <th className="table-title">ID</th>
            <th className="table-title">Nome</th>
            <th className="table-title">Usinas</th>
            <th className="table-title">Editar / Remover</th>
          </tr>
        </thead>
        <tbody className="table-body">
        { data.map(({ numeroCliente, nomeCliente, usinas }) => (
          <RenderClients
            key={ numeroCliente }
            props={ {numeroCliente, nomeCliente, usinas} }
            buttons= { { edit, remove, disabled } }
          />
          ))} 
        </tbody>
      </table>
      </div>
  )
}
