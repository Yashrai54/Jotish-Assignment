import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import BarGraph from './pages/BarGraph.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bargraph" element={<BarGraph />} />
      <Route path="/details" element={<ItemDetails />} />
    </Routes>
  )
}

export default App