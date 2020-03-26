import React, { useState } from 'react'

import './App.scss'

const init = {
  propValue: '',
  deposit: '',
  percentage: '',
  mortValue: '',
  intRate: '',
  years: '',
  mortFinal: 0,
}

export default function App() {
  const [state, setState] = useState(init)

  const handleChange = event => {
    const toNumber = event.target.value
    switch (event.target.placeholder) {
      case 'Property Value':
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
          mortValue: state.propValue - (state.propValue * toNumber) / 100,
          mortFinal: (state.mortValue * (state.intRate / 100 + 1) ** state.years).toFixed(
            2,
          ),
        })
        break
      case 'Mortgage Value':
        setState({
          ...state,
          mortValue: toNumber,
          deposit: state.propValue - toNumber,
          percentage: state.propValue - toNumber,
          mortFinal: (toNumber * (state.intRate / 100 + 1) ** state.years).toFixed(2),
        })
        break
      case 'Interest Rate':
        setState({
          ...state,
          intRate: toNumber,
          mortFinal: (state.mortValue * (toNumber / 100 + 1) ** state.years).toFixed(2),
        })
        break
      case 'Years':
        setState({
          ...state,
          years: toNumber,
          mortFinal: (state.mortValue * (state.intRate / 100 + 1) ** toNumber).toFixed(2),
        })
        break
      default:
        break
    }
  }

  console.log(state)

  return (
    <form>
      <div className="textbox">
        <input
          type="number"
          value={state.propValue}
          onChange={handleChange}
          placeholder="Property Value"
          min="0"
        />
      </div>

      <div className="textbox">
        <input
          type="number"
          min="0"
          value={state.deposit}
          onChange={handleChange}
          placeholder="Deposit"
        />
      </div>

      <div className="textbox">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={state.percentage}
          onChange={handleChange}
          placeholder="Percentage"
        />
        {`${state.percentage}%`}
      </div>

      <div className="textbox">
        <input
          type="number"
          min="0"
          value={state.mortValue}
          onChange={handleChange}
          placeholder="Mortgage Value"
        />
      </div>

      <div className="textbox">
        <input
          type="range"
          min="0"
          step="0.1"
          max="5"
          value={state.intRate}
          onChange={handleChange}
          placeholder="Interest Rate"
        />
        {`${state.intRate}%`}
      </div>

      <div className="textbox">
        <input
          type="number"
          min="0"
          value={state.years}
          onChange={handleChange}
          placeholder="Years"
        />
      </div>

      {state.mortFinal}
    </form>
  )
}
