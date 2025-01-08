import { useState } from 'react'
import './App.css'
import { APP_NAME } from './constants';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to {APP_NAME}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
