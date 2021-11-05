import React, { useState } from 'react'
import Header from '../components/Header'
import FinanceReturn from '../components/FinanceReturn';
import dadosClientes from '../data/dadosClientes.json';

export default function Finance() {

  const [ data, setData ] = useState(dadosClientes);

  return (
    <div>
      <Header />
      <FinanceReturn props={ { data } }/>
    </div>
  )
}
