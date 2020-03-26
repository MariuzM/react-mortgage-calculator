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
    },
    {
      key: 2,
      name: 'Deposit',
      id: 'Deposit',
      type: 'number',
      value: state.deposit,
    },
    {
      key: 3,
      name: 'Percentage',
      id: 'Percentage',
      type: 'range',
      max: '100',
      value: state.percentage,
      percent: state.percentage,
    },
    {
      key: 4,
      name: 'Mortgage Value',
      id: 'Mortgage-Value',
      type: 'number',
      value: state.mortValue,
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
    },
    {
      key: 6,
      name: 'Years',
      id: 'Years',
      type: 'number',
      value: state.years,
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
          percentage: Math.trunc((toNumber * 100) / state.propValue),
          mortValue: state.propValue - toNumber,
        })
        break
      case 'Percentage':
        setState({
          ...state,
          percentage: toNumber,
          deposit: (state.propValue * toNumber) / 100,
          mortValue: Math.trunc(state.propValue - (state.propValue * toNumber) / 100),
          mortFinal: calcMortFinal(state.mortValue, state.intRate, state.years),
        })
        break
      case 'Mortgage Value':
        setState({
          ...state,
          mortValue: toNumber,
          deposit: state.propValue - toNumber,
          percentage: state.propValue - toNumber,
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
      {elements.map(({ key, name, id, type, step, max, value, percent }) => {
        return (
          <div key={key}>
            {name}
            <div className="textbox">
              <input
                id={id}
                type={type}
                value={value}
                onChange={handleChange}
                step={step}
                min="0"
                max={max}
              />
              {percent !== undefined ? `${percent}%` : ''}
            </div>
          </div>
        )
      })}

      {state.mortFinal}

      <br />

      {/* <div>
        Property Value
        <div className="textbox">
          <input
            id="Property-Value"
            type="number"
            value={state.propValue}
            onChange={handleChange}
            // placeholder="Property Value"
            min="0"
          />
        </div>
      </div>

      <div>
        Deposit
        <div className="textbox">
          <input
            id="Deposit"
            type="number"
            min="0"
            value={state.deposit}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        Percentage
        <div className="textbox">
          <input
            id="Percentage"
            type="range"
            min="0"
            max="100"
            step="1"
            value={state.percentage}
            onChange={handleChange}
          />
          {`${state.percentage}%`}
        </div>
      </div>

      <div>
        Mortgage Value
        <div className="textbox">
          <input
            id="Mortgage-Value"
            type="number"
            min="0"
            value={state.mortValue}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        Interest Rate
        <div className="textbox">
          <input
            id="Interest-Rate"
            type="range"
            min="0"
            step="0.1"
            max="5"
            value={state.intRate}
            onChange={handleChange}
          />
          {`${state.intRate}%`}
        </div>
      </div>

      <div>
        Years
        <div className="textbox">
          <input
            id="Years"
            type="number"
            min="0"
            value={state.years}
            onChange={handleChange}
          />
        </div>
      </div> */}
    </form>
  )
}
