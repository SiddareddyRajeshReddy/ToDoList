import { useState } from 'react'
import Navbar from './components/Navbar'
import Todo from './components/ToDo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Todo />
    </>
  )
}

export default App
