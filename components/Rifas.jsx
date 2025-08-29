'use client'
import { useEffect, useState } from 'react'
import CardRifa from './CardRifa'

export default function Rifas() {
  const [rifas, setRifas] = useState([])

  useEffect(() => {
    const fetchRifas = async () => {
      const res = await fetch('/api/raffles')
      const data = await res.json()
      setRifas(data)
    }
    fetchRifas()
  }, [])

  if (rifas.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-xl">
        No hay rifas disponibles en este momento
      </div>
    )
  }

  const isSingle = rifas.length === 1

  return (
    <div className="w-[90%] max-w-[1600px] mx-auto py-7">
      <h2 className="text-[30px] font-semibold text-center mb-5">
        Rifas Disponibles
      </h2>
      <div className={isSingle ? "flex flex-col sm:flex-row gap-5 justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"}>
        {rifas.map((rifa) => (
          <CardRifa key={rifa.id} {...rifa} horizontal={isSingle} />
        ))}
      </div>
    </div>
  )
}
