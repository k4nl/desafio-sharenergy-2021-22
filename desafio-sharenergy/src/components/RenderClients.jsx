import React from 'react'

export default function RenderClients({ props, buttons }) {
  const { numeroCliente, nomeCliente, usinas } = props;
  const { edit, remove, disabled } = buttons;

  return (
    <tr key={ numeroCliente} >
      <td className="table-values border" value={ numeroCliente }>{ numeroCliente }</td>
      <td className="table-values border" value={ nomeCliente }>{ nomeCliente }</td>
      <td className="table-values usinas-table border"> { usinas.map(({usinaId, percentualDeParticipacao}) => (
        <div className="usinas" key={ usinaId }>
          { `Usina: ${ usinaId } - Participacao: ${ percentualDeParticipacao }%` }
        </div>
      )) }
      </td>
      <td className="table-values border">
        <button
          className="btn btn-info btn-sm m-3"
          id={ numeroCliente }
          onClick={ edit }
          >
            Editar
        </button>
        <button
          className="btn btn-danger btn-sm m-3"
          id={ numeroCliente }
          onClick={ remove }
          disabled={ disabled }
        >
          Remover
        </button>
      </td>
    </tr>
  )
}
