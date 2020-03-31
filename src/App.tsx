import React, { useState, useEffect } from 'react'

import './App.scss'

const init = {
  propValue: 0,
  deposit: 0,
  percentage: 0,
  mortValue: 0,
  intRate: 2,
  years: 1,
  mortFinal: 0,
}

const App: React.FC = () => {
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

  console.log(state)

  const comma = (num: number): string => {
    const numParts = num.toString().split('.')
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return numParts.join('.')
  }

  const calcMortFinal = (mortValue: number, intRate: number, years: number): string => {
    return comma(parseFloat((mortValue * (intRate / 100 + 1) ** years).toFixed(2)))
  }

  useEffect(() => {
    if (Number.isNaN(Number(state.propValue))) setState({ ...state, propValue: 0 })
    if (Number.isNaN(Number(state.deposit))) setState({ ...state, deposit: 0 })
    if (Number.isNaN(Number(state.mortValue))) setState({ ...state, mortValue: 0 })
    if (Number.isNaN(Number(state.years))) setState({ ...state, years: 0 })
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const toNumber = parseFloat(event.target.value.replace(/,/g, ''))

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
          percentage: (toNumber * 100) / state.propValue,
          mortValue: state.propValue - toNumber,
        })
        break
      case 'Percentage':
        setState({
          ...state,
          percentage: toNumber,
          deposit: (state.propValue * toNumber) / 100,
          mortValue: parseFloat(
            (state.propValue - (state.propValue * toNumber) / 100).toFixed(2),
          ),
        })
        break
      case 'Mortgage-Value':
        setState({
          ...state,
          mortValue: toNumber,
          deposit: state.propValue - toNumber,
          percentage: 100 - 100 * (toNumber / state.propValue),
          mortFinal: parseFloat(calcMortFinal(toNumber, state.intRate, state.years)),
        })
        break
      case 'Interest-Rate':
        setState({
          ...state,
          intRate: toNumber,
          mortFinal: parseFloat(calcMortFinal(state.mortValue, toNumber, state.years)),
        })
        break
      case 'Years':
        setState({
          ...state,
          years: toNumber,
          mortFinal: parseFloat(calcMortFinal(state.mortValue, state.intRate, toNumber)),
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
              // value={value}
              onChange={handleChange}
              onClick={(e): void => {
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

export default App
