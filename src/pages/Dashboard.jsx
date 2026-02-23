import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BarGraph from './BarGraph'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search,setSearch] = useState('')
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/backend_dev/gettabledata.php", {
        "username": "test",
        "password": "123456"
      })
      setData(response.data.TABLE_DATA.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function handleItemClick(item, index) {
    navigate(`/details`, { state: { item, index } });
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500 text-sm animate-pulse">Loading data...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200' onClick={()=>navigate("/bargraph",{state:{data}})}>Salary Bar Graph</button>
        </div>
       
        <input 
          type="text" 
          name="search" 
          id="search" 
          placeholder="Search items by name" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />

        {data.filter(item => item[0].toLowerCase().includes(search.toLowerCase())) && data.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {data.filter(item => item[0].toLowerCase().includes(search.toLowerCase())).map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item, index)}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-150 group"
              >
                <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors duration-150">
                  {item[0]}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm text-center py-8">No data available.</p>
        )}

      </div>
    </div>
  )
}

export default Dashboard