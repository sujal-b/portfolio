import React from 'react'
import BentoGrid from './components/BentoGrid'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-0">
      <ThemeToggle />
      <BentoGrid />
    </div>
  )
}

export default App
