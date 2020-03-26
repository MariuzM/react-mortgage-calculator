import React, { useState } from 'react'

import './App.scss'

const init = {
  propValue: '',
  deposit: '',
  percentage: '',
  mortValue: '',
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
          deposit: (state.propValue * toNumber) / 100,
          percentage: toNumber,
          mortValue: state.propValue - (state.propValue * toNumber) / 100,
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
    </form>
  )
}
