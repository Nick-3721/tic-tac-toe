import { useState } from 'react'
import './App.css'
import TicTacToe from './Components/TicTacToe.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TicTacToe/>
    </div>
  )
}

export default App
