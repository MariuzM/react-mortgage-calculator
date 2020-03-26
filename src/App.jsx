import React, { useState } from 'react'

import './App.scss'

export default function App() {
  const [state, setState] = useState({
    propValue: '',
    deposit: '',
    percentage: '',
    mortValue: '',
    intRate: 2,
    years: 1,
    mortFinal: 0,
  })

  const elements = [
    {
      key: 1,
      name: 'Property Value',
      id: 'Property-Value',
      type: 'number',
      value: state.propValue,
      className: 'form-field',
    },
    {
      key: 2,
      name: 'Deposit',
      id: 'Deposit',
      type: 'number',
      value: state.deposit,
      className: 'form-field',
    },
    {
      key: 3,
      name: 'Deposit percentage',
      id: 'Percentage',
      type: 'range',
      max: '100',
      value: state.percentage,
      percent: state.percentage,
      className: 'form-percent',
    },
    {
      key: 4,
      name: 'Mortgage Value',
      id: 'Mortgage-Value',
      type: 'number',
      value: state.mortValue,
      className: 'form-field',
    },
    {
      key: 5,
      name: 'Interest Rate',
      id: 'Interest-Rate',
      type: 'range',
      step: '0.1',
      max: '5',
      value: state.intRate,
      percent: state.intRate,
      className: 'form-percent',
    },
    {
      key: 6,
      name: 'Years',
      id: 'Years',
      type: 'number',
      value: state.years,
      className: 'form-field',
    },
  ]

  const calcMortFinal = (mortValue, intRate, years) => {
    return (mortValue * (intRate / 100 + 1) ** years).toFixed(2)
  }

  const handleChange = event => {
    const toNumber = event.target.value
    switch (event.target.id) {
      case 'Property-Value':
        setState({
          ...state,
          propValue: toNumber,
          percentage: (state.deposit * 100) / toNumber,
          mortValue: toNumber - state.deposit,
        })
        break
      case 'Deposit':
        setState({
          ...state,
          deposit: toNumber,
          percentage: ((toNumber * 100) / state.propValue).toFixed(2),
          mortValue: state.propValue - toNumber,
        })
        break
      case 'Percentage':
        setState({
          ...state,
          percentage: toNumber,
          deposit: ((state.propValue * toNumber) / 100).toFixed(2),
          mortValue: (state.propValue - (state.propValue * toNumber) / 100).toFixed(2),
        })
        break
      case 'Mortgage-Value':
        setState({
          ...state,
          mortValue: toNumber,
          deposit: (state.propValue - toNumber).toFixed(2),
          percentage: (100 - 100 * (toNumber / state.propValue)).toFixed(2),
          mortFinal: calcMortFinal(toNumber, state.intRate, state.years),
        })
        break
      case 'Interest-Rate':
        setState({
          ...state,
          intRate: toNumber,
          mortFinal: calcMortFinal(state.mortValue, toNumber, state.years),
        })
        break
      case 'Years':
        setState({
          ...state,
          years: toNumber,
          mortFinal: calcMortFinal(state.mortValue, state.intRate, toNumber),
        })
        break
      default:
        break
    }
  }

  console.log(state)

  return (
    <form>
      {elements.map(({ key, name, id, type, step, max, value, percent, className }) => {
        return (
          <div key={key} className="form-group">
            <span>
              {name}
              <div>{percent !== undefined ? ` ${percent}%` : ''}</div>
            </span>
            <input
              id={id}
              type={type}
              value={value}
              onChange={handleChange}
              step={step}
              min="0"
              max={max}
              className={className}
            />
          </div>
        )
      })}
      {state.mortFinal}
    </form>
  )
}
