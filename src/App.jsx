import React, { useState, useEffect } from 'react'

import './App.scss'

const init = {
  propValue: '',
  deposit: '',
  percentage: '',
  mortValue: '',
  intRate: '2',
  years: '1',
  mortFinal: '',
}

export default function App() {
  const [state, setState] = useState(init)

  const elements = [
    {
      key: 1,
      name: 'Property Value',
      id: 'Property-Value',
      type: 'text',
      value: state.propValue,
      className: 'form-field',
    },
    {
      key: 2,
      name: 'Deposit',
      id: 'Deposit',
      type: 'text',
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
      type: 'text',
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
      type: 'text',
      value: state.years,
      className: 'form-field',
    },
  ]

  const comma = (num) => {
    const numParts = num.toString().split('.')
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return numParts.join('.')
  }

  const calcMortFinal = (mortValue, intRate, years) => {
    return comma((mortValue * (intRate / 100 + 1) ** years).toFixed(2))
  }

  useEffect(() => {
    if (
      Number.isNaN(
        Number(state.propValue || state.deposit || state.mortValue || state.years),
      )
    ) {
      setState(init)
    }
  })

  const handleChange = (event) => {
    const toNumber = parseFloat(event.target.value.replace(/,/g, ''))

    switch (event.target.id) {
      case 'Property-Value':
        setState({
          ...state,
          // propValue: parseFloat(toNumber.replace(/,/g, '')),
          propValue: toNumber,
          percentage: (state.deposit * 100) / toNumber,
          mortValue: (toNumber - state.deposit).toFixed(2),
          // mortValue: parseFloat((toNumber - state.deposit).toFixed(2).replace(/,/g, '')),
        })
        break
      case 'Deposit':
        setState({
          ...state,
          deposit: toNumber,
          percentage: ((toNumber * 100) / state.propValue).toFixed(2),
          mortValue: (state.propValue - toNumber).toFixed(2),
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
              value={comma(value)}
              onChange={handleChange}
              onClick={(e) => {
                e.target.focus()
                e.target.select()
              }}
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
