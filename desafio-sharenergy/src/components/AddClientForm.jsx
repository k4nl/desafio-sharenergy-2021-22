import React, { useState, useEffect } from 'react'

export default function AddClientForm({ props }) {
  const { add, title, saveEdit, clientData, setTitle, setRemoveDisabled } = props;   

  const [ name, setName ] = useState('');
  const [ usinaId, setUsinaId ] = useState('');
  const [ percentualDeParticipacao, setParticipacao ] = useState('');
  const [ usinas, setUsinas ] = useState([]);
  const [ disable, setDisable ] = useState(true);

  useEffect(() => {
    if (title === 'Editar'){
      setUsinas(clientData.usinas);
      setName(clientData.nomeCliente);
      setDisable(false);
    }
  }, [title, clientData])

  const reset = (text) => {
    setParticipacao('');
    setUsinaId('');
    if(text) {
      global.alert(`Nao foi possivel adicionar, ${ text }`)
    };
  };

  const checkParticipacao = () => {
    if(Number(percentualDeParticipacao) > 100) {
      reset('numero de participacao maior que 100');
      return false;
    }
    if(percentualDeParticipacao === '') {
      reset('usina ou percentual de participacao invalidos');
      return false;
    }
    return true;
  }

  const checkUsinaId = () => {
    const usinaFound = usinas.find((usina) => usina.usinaId === Number(usinaId));
    if(usinaFound) {
      reset('ja existe usina cadastrada para cliente');
      return false;
    } else if(usinaId === '') {
      reset('usina ou percentual de participacao invalidos');
      return false;
    }
    return true;
  }
  const handleClick = () => {
    const participacaoValida = checkParticipacao()
    const usinaValida = checkUsinaId();

    if (participacaoValida && usinaValida){
      setDisable(false);
      setUsinas([
        ...usinas,
        {
          name,
          usinaId: Number(usinaId),
          percentualDeParticipacao: Number(percentualDeParticipacao),
        },
      ]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name !== '' && usinas.length !== 0) {
      if(title === 'Adicionar') {
        add(name, usinas);
      } else {
        saveEdit(clientData.numeroCliente, name, usinas);
      }
      clear();
    } else {
      reset('nome ou usina nao adicionados')
    }
  };

  const clear = () => {
    setName('');
    setUsinaId('');
    setParticipacao('');
    setUsinas([]);
    setDisable(true);
    setRemoveDisabled(false);
    setTitle('Adicionar')
  };

  const removeUsina = ({ target }) => {
    const usina = usinas.filter(({usinaId}) => usinaId !== Number(target.id));
    if(usina.length !== 0) {
      setUsinas(usina);
    } else {
      setUsinas([]);
      setDisable(true);
    }
  };

  return (
    <div>
      <h1>{ title }</h1>
      <form className="form-container">
        <div className="form-input-container">
          <div className="form-input">
            <label>Nome:</label>
            <input type="text" value={ name } onChange={ ({ target }) => setName(target.value) } />
          </div>
          <div className="form-input">
            <label>Usina:</label>
            <input type="number" value={ usinaId } onChange={ ({ target }) => setUsinaId(target.value) }/>
          </div>
          <div className="form-input">
            <label>Participacao:</label>
            <input type="number" value={ percentualDeParticipacao } onChange={ ({ target }) => setParticipacao(target.value) } />
          </div>
          <button className="btn btn-primary mar btn-sm" type="button" onClick={ handleClick }>Adicionar usina</button>
        </div>
      </form>
      <div>
        <div className="usinas-container">
          { usinas.length !== 0 ? usinas.map(({usinaId, percentualDeParticipacao}, index) => (
          <div key={ index } className="usinas">
            <p>{ `Usina: ${ usinaId } - Participacao: ${ percentualDeParticipacao }%` }</p>
            <button className="remove-usina" type="button" id={usinaId} onClick={ removeUsina }>X</button>
          </div>
            )) : <p>Sem usinas cadastradas</p>}
        </div>
        <div className="clients-button">
          <button onClick={ handleSubmit } className="btn btn-success button" type="submit" disabled={ disable }>{`${title} cliente`}</button>
          <button className="btn btn-danger button" type="button" onClick={ clear } disabled={ disable }>Limpar</button>
        </div>
      </div>
    </div>
  )
}
