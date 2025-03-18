"use client"

import { useEffect, useState } from "react"

const FootballAssociations = () => {
  const [associations, setAssociations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/associations") // Ensure the correct URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json()
      })
      .then((data) => {
        setAssociations(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center">Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Football Associations</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2">ID</th> */}
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Code</th>
          </tr>
        </thead>
        <tbody>
          {associations.map((assoc) => (
            <tr key={assoc.id} className="text-center">
              {/* <td className="border border-gray-300 px-4 py-2">{assoc.id}</td> */}
              <td className="border border-gray-300 px-4 py-2">{assoc.name}</td>
              <td className="border border-gray-300 px-4 py-2">{assoc.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FootballAssociations
