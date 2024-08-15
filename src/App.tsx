import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex gap-4 mb-6">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={viteLogo}
            className="w-16 h-16"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="w-16 h-16"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-6">Vite + React</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <button
          onClick={() => setCount(count => count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-6 text-gray-600">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
