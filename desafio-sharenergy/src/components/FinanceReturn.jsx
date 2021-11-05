import React, { useEffect, useState } from 'react';
import dadosUsina from '../data/dadosUsina.json';
import getUserImg from '../services/userApi';
import Loading from '../components/Loading';
import apple from '../images/apple.png'
import '../css/financeiro.css'


export default function FinanceReturn({ props }) {
  const { data } = props;
  // const [ newData, setNewData ] = useState([]);
  
  const fetchImg = () => {
    const newData = Promise.all(data.map(async ({ numeroCliente, nomeCliente, usinas }) => {
      const picture = await getUserImg();
      return {
        numeroCliente,
        nomeCliente,
        usinas,
        picture: picture.large,
      }
    }));
    console.log(newData);
  }
  

  useEffect(() => {
    fetchImg();
  },[])

  const calculateInterval = () => {
    return dadosUsina[1].tempo_h - dadosUsina[0].tempo_h;
  }

  const totalEnergyGenerated = () => {
    const interval = calculateInterval();
    const total = dadosUsina.reduce((prevs, {potencia_kW}) => {
      return prevs + potencia_kW * interval;
    }, 0);
    return total;
  }

  const totalFinanceReturnGenerated = (clientPercentage, energyValue) => {
    const totalEnergy = totalEnergyGenerated();
    return ((totalEnergy * energyValue) * (clientPercentage / 100)).toFixed(2);
  }

  const sumIncomes = (numeroCliente) => {
    const { usinas } = data.find((client) => client.numeroCliente === numeroCliente);
    const percentual = usinas.map(({ percentualDeParticipacao }) => {
      return Number(percentualDeParticipacao);
    })
    return percentual.reduce((acc, curr) => {
      const valorAtual = totalFinanceReturnGenerated(curr, 0.95);
      return acc + Number(valorAtual);
    }, 0).toFixed(2);
  }

  /*
  if(!data || !data.picture) {
    return <Loading />
  }
  */
  return (
    <div className="testing">
      { data.map(({nomeCliente, usinas, numeroCliente }) => (
        <div key={ nomeCliente } className="card card-container" style={{width:"23rem"}}>
          <img src={ apple } alt={ nomeCliente } className="card-img-top client-img"/>
          <div className="card-body">
            <div className="card-title text-center">{ nomeCliente }</div>
            <div className="card-text">
              { usinas.map(({ usinaId, percentualDeParticipacao }) => (
              <div className="mt-2">
                {
                `Usina ${ usinaId } - 
                Retorno financeiro total: R$ 
                  ${ totalFinanceReturnGenerated(percentualDeParticipacao, 0.95) }
                `}
              </div>
            ))}
            </div>
            </div>
            <div className="card-text mb-3">
              { 
                `Total Recebido: R$ 
                ${
                  sumIncomes(numeroCliente)
                }`
              }
              </div>
          </div>
      ))}
    </div>
  )
}

