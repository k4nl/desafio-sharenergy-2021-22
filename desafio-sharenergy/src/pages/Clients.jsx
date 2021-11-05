import React, { useState } from 'react';
import ClientTable from '../components/ClientTable';
import Header from '../components/Header';
import AddClientForm from '../components/AddClientForm';
import dadosClientes from '../data/dadosClientes.json';
import '../css/clients.css'


export default function Clients() {

  const [ data, setData ] = useState(dadosClientes);
  const [ title, setTitle ] = useState('Adicionar');
  const [ clientData, setClientData ] = useState({})
  const [ removeDisabled, setRemoveDisabled ] = useState(false)

  const edit = ({target}) => {
    setTitle('Editar');
    const client = data.find(({ numeroCliente }) => Number(target.id) === numeroCliente);
    setClientData(client);
    setRemoveDisabled(true);
  }

  const saveEdit = (numeroCliente, nomeCliente, usinas) => {
    const clients = data.map((cliente) => {
      if(cliente.numeroCliente === numeroCliente){
        return {
          numeroCliente,
          nomeCliente,
          usinas,
        }
      }
      return cliente;
    });
    setData(clients);
    setTitle('Adicionar');
    setClientData({});
    setRemoveDisabled(false);
  }

  const remove = ({target}) => {
    const removed = data.filter(({numeroCliente}) => numeroCliente !== Number(target.id));
    setTitle('Adicionar');
    setClientData({});
    setData(removed);
  }

  const add = (nomeCliente, usinas) => {
    setData([
      ...data, 
      {
        numeroCliente: data.length + 1,
        nomeCliente,
        usinas,
      }
    ]);
  }

  return (
    <div>
      <Header />
      <main className="main-container">
        <AddClientForm props={ { add, title, saveEdit, clientData, setTitle, setRemoveDisabled } } />
        <ClientTable props={ { data, edit, remove, removeDisabled, setRemoveDisabled } }/>
      </main>
    </div>
  )
}
