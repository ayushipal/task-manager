import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import EditTask from './pages/EditTask'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">Task Manager</Link>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </main>
    </div>
  )
}