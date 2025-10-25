import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello Tailwind CSS!
        </h1>
        <p className="text-gray-600">
          React + Tailwind đã sẵn sàng!
        </p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Click me
        </button>
      </div>
    </div>
    </>
  )
}

export default App
