'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function PurchaseModal({ rifa, onClose }) {
  const [form, setForm] = useState({
    fullName: '',
    cedula: '',
    email: '',
    confirmEmail: '',
    phone: '',
    methodId: '',
    holderName: '',
    reference: '',
    tickets: 1,
    captureUrl: ''
  })

  const [errors, setErrors] = useState({})
  const [methods, setMethods] = useState([])

  useEffect(() => {
    const fetchMethods = async () => {
      const res = await fetch('/api/payment-methods')
      const data = await res.json()
      setMethods(data)
    }
    fetchMethods()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Nombre requerido'
    if (!/^\d{6,10}$/.test(form.cedula)) newErrors.cedula = 'Cédula inválida'
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
    if (form.email !== form.confirmEmail) newErrors.confirmEmail = 'Emails no coinciden'
    if (!/^\d{10,15}$/.test(form.phone)) newErrors.phone = 'Teléfono inválido'
    if (!form.methodId) newErrors.methodId = 'Selecciona método de pago'
    if (!form.holderName.trim()) newErrors.holderName = 'Nombre del titular requerido'
    if (!form.reference || form.reference.length < 6) newErrors.reference = 'Referencia inválida'
    if (form.tickets < 1 || form.tickets > rifa.disponibles) newErrors.tickets = 'Cantidad inválida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return toast.error('Corrige los errores del formulario')

    const res = await fetch('/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.fullName,
        cedula: form.cedula,
        email: form.email,
        phone: form.phone,
        payment_method_id: parseInt(form.methodId),
        reference: form.reference,
        tickets: parseInt(form.tickets),
        raffleId: rifa.id,
        payment_data: {
          holderName: form.holderName,
          captureUrl: form.captureUrl,
          amount: form.tickets * rifa.precio
        }
      })
    })

    if (res.ok) {
      toast.success('Compra registrada correctamente')
      onClose()
    } else {
      toast.error('Error al registrar la compra')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e24] text-white p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Comprar boleto – {rifa.nombre}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nombre completo" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          <input name="cedula" value={form.cedula} onChange={handleChange} placeholder="Cédula" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula}</p>}

          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input name="confirmEmail" value={form.confirmEmail} onChange={handleChange} placeholder="Confirmar Email" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail}</p>}

          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <select name="methodId" value={form.methodId} onChange={handleChange} className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded">
            <option value="">Selecciona método de pago</option>
            {methods.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {errors.methodId && <p className="text-red-500 text-sm">{errors.methodId}</p>}

          {/* Campos dinámicos */}
          {form.methodId && (
            <>
              <input name="holderName" value={form.holderName} onChange={handleChange} placeholder="Nombre del titular" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
              {errors.holderName && <p className="text-red-500 text-sm">{errors.holderName}</p>}

              <input name="reference" value={form.reference} onChange={handleChange} placeholder="Referencia de pago" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
              {errors.reference && <p className="text-red-500 text-sm">{errors.reference}</p>}

              <input name="captureUrl" value={form.captureUrl} onChange={handleChange} placeholder="URL del comprobante (opcional)" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
            </>
          )}

          <input name="tickets" type="number" value={form.tickets} onChange={handleChange} min={1} max={rifa.disponibles} placeholder="Cantidad de boletos" className="w-full p-2 bg-[#2e2e34] border border-gray-600 rounded" />
          {errors.tickets && <p className="text-red-500 text-sm">{errors.tickets}</p>}

          <button type="submit" className="bg-[#e9b30e] text-black font-bold w-full py-2 rounded hover:opacity-90 transition">
            Confirmar compra
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-sm text-gray-400 underline block mx-auto">
          Cancelar
        </button>
      </div>
    </div>
  )
}
