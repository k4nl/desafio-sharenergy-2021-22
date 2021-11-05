import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Header from '../components/Header';
import dadosUsina from '../data/dadosUsina.json';
import '../css/home.css'

export default function Home() {

  const [selectedKey, setSelectKey] = useState('tensao_V');

  const formatNumber = (tick) => {
    return tick.toFixed(2)
  }
  
  const onChange = ({ target }) => {
    setSelectKey(target.value)
  }

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="d-flex flex-row align-items-center text-center mb-3">
          <label className="label">
          Selecione a variavel de interesse:
          </label>
          <select value={ selectedKey } onChange={ onChange } className="ps-1">
            <option value="tensao_V">Tensão</option>
            <option value="corrente_A">Corrente</option>
            <option value="potencia_kW">Potencia</option>
            <option value="temperatura_C">Temperatura</option>
          </select>
        </div>
        <LineChart width={1000} height={400} data={ dadosUsina } className="graphic">
          <Line type="monotone" dataKey={ selectedKey } stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="tempo_h" tickFormatter={ formatNumber }/>
          <YAxis />
        </LineChart>
      </div>
    </>
  )
}
