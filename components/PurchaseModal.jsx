'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function PurchaseModal({ rifa, onClose }) {
  const [form, setForm] = useState({
    fullName: '',
    cedula: '',
    email: '',
    phone: '',
    method: '',
    tickets: 1
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Nombre requerido'
    if (!/^\d{6,10}$/.test(form.cedula)) newErrors.cedula = 'Cédula inválida'
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
    if (!/^\d{10,15}$/.test(form.phone)) newErrors.phone = 'Teléfono inválido'
    if (!form.method) newErrors.method = 'Selecciona un método de pago'
    if (form.tickets < 1 || form.tickets > rifa.disponibles) newErrors.tickets = 'Cantidad inválida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return toast.error('Corrige los errores del formulario')

    // Aquí iría el fetch o Server Action
    const res = await fetch('/api/purchase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: form.fullName,
    cedula: form.cedula,
    email: form.email,
    phone: form.phone,
    method: form.method,
    reference: form.reference,
    tickets: form.tickets,
    raffleId: rifa.id
  })
})

if (res.ok) {
  toast.success('Compra registrada correctamente')
  onClose()
} else {
  toast.error('Error al registrar la compra')
}

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Comprar boleto – {rifa.nombre}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="w-full p-2 border rounded"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          <input
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Cédula"
            className="w-full p-2 border rounded"
          />
          {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula}</p>}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona método de pago</option>
            <option value="zelle">Zelle</option>
            <option value="binance">Binance</option>
            <option value="pago-movil">Pago Móvil</option>
          </select>
          {errors.method && <p className="text-red-500 text-sm">{errors.method}</p>}

          {/* Mostrar datos ficticios según método */}
          {form.method && (
            <div className="bg-gray-100 p-3 rounded text-sm">
              {form.method === 'zelle' && (
                <p>Email: transfers@rifas.com<br />Nombre: Rifas Company</p>
              )}
              {form.method === 'binance' && (
                <p>Wallet ID: binance123456<br />Nombre: Rifas Company</p>
              )}
              {form.method === 'pago-movil' && (
                <p>Teléfono: 0412-1234567<br />CI: 12345678<br />Banco: Venezuela</p>
              )}
            </div>
          )}

          <input
            name="tickets"
            type="number"
            value={form.tickets}
            onChange={handleChange}
            min={1}
            max={rifa.disponibles}
            placeholder="Cantidad de boletos"
            className="w-full p-2 border rounded"
          />
          {errors.tickets && <p className="text-red-500 text-sm">{errors.tickets}</p>}

          <button type="submit" className="bg-[#e9b30e] text-black font-bold w-full py-2 rounded">
            Confirmar compra
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline block mx-auto">
          Cancelar
        </button>
      </div>
    </div>
  )
}
