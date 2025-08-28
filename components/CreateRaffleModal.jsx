// components/CreateRaffleModal.'use client';
"use client"
import { useState } from 'react';
import { createRaffle } from '@/app/actions/createRaffle';

export default function CreateRaffleModal({ onClose }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await createRaffle(formData);
    setStatus(res.success ? '✅ Rifa creada' : '❌ Error al crear');
  };

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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
        </form>
        {status && <p className="mt-4">{status}</p>}
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline">Cerrar</button>
      </div>
    </div>
  );
}
