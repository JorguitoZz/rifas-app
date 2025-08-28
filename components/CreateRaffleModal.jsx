'use client'

import { useState } from 'react'
import { createRaffle } from '@/app/actions/createRaffle'

export default function CreateRaffleModal({ onClose }) {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData(e.target)
    console.log('📤 Enviando datos de rifa:', Object.fromEntries(formData.entries()))

    try {
      const res = await createRaffle(formData)
      console.log('✅ Respuesta del servidor:', res)

      if (res.success) {
        setStatus('✅ Rifa creada exitosamente')
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setStatus('❌ Error al crear la rifa')
      }
    } catch (error) {
      console.error('❌ Error inesperado:', error)
      setStatus('❌ Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Crear nueva rifa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Nombre de la rifa" className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Descripción" className="w-full p-2 border rounded" required />
          <input name="prize" placeholder="Premio" className="w-full p-2 border rounded" required />
          <input name="ticketPrice" type="number" step="0.01" placeholder="Precio por ticket" className="w-full p-2 border rounded" required />
          <input name="totalTickets" type="number" placeholder="Cantidad total de tickets" className="w-full p-2 border rounded" required />
          <input name="drawDate" type="date" className="w-full p-2 border rounded" required />
          <input name="image" placeholder="URL de imagen" className="w-full p-2 border rounded" />

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creando rifa...' : 'Crear'}
          </button>
        </form>

        {status && <p className="mt-4 text-center">{status}</p>}

        <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline block mx-auto">
          Cancelar
        </button>
      </div>
    </div>
  )
}
