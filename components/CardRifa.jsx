'use client'

import { Calendar, Ticket, Users } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import { useState } from 'react'

export default function CardRifa({ rifa, horizontal = false }) {
  const {
    nombre,
    descripcion,
    precio,
    premio,
    vendidos,
    total,
    disponibles,
    fechaSorteo,
    img
  } = rifa


  const [showModal, setShowModal] = useState(false)

  const porcentaje = Math.round((vendidos / total) * 100)

  return (
    <>
      <article
        className={`w-full bg-[#1e1e24] rounded-[10px] overflow-hidden border-2 border-[rgba(80,80,80,0.5)] 
        ${horizontal ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
      >
        <picture className={`${horizontal ? 'md:w-1/2' : 'w-full'} relative`}>
          <img
            className="w-full object-cover h-full"
            src={img}
            alt={`Imagen de la rifa ${nombre}`}
          />
          <div className="absolute top-4 right-4 bg-[#e9b30e] text-[#000] py-1 px-3 rounded-full text-sm font-semibold text-[20px]">
            {precio}$
          </div>
        </picture>

        <div
          className={`${
            horizontal ? 'md:w-1/2' : 'w-[90%] mx-auto'
          } px-4 pt-5 pb-7 flex flex-col justify-between`}
        >
          <div>
            <h3 className="text-[#e9b30e] text-[25px] font-semibold">{nombre}</h3>

            {/* Descripción */}
            <p className="text-[#94a3b8] text-[18px] mb-2">{descripcion}</p>

            {/* Premio */}
            <div className="flex items-center gap-2 mt-2">
              <Ticket className="h-4 w-4 text-[#16a249]" />
              <p className="text-[#16a249] text-[20px]">Premio: {premio}</p>
            </div>

            {/* Boletos vendidos */}
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between text-[#94a3b8] text-[16px]">
                <p>Boletos vendidos</p>
                <p>
                  {vendidos}/{total}
                </p>
              </div>
              <div className="w-full rounded bg-[#27272A]">
                <div
                  className="bg-[#e9b30e] h-[10px] rounded"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>

            {/* Boletos disponibles */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <Users className="h-4 w-4 text-[#94a3b8]" />
              <p className="text-[17px] text-[#94a3b8]">
                {disponibles} boletos disponibles
              </p>
            </div>

            {/* Fecha del sorteo */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <Calendar className="h-4 w-4 text-[#94a3b8]" />
              <p className="text-[#94a3b8] text-[17px]">Sorteo: {fechaSorteo}</p>
            </div>
          </div>

          {/* Botón de compra */}
          <button
            className="mt-6 w-full bg-[#e9b30e] text-black font-semibold py-3 rounded hover:opacity-90 transition"
            onClick={() => setShowModal(true)}
          >
            Comprar boleto
          </button>
        </div>
      </article>

      {/* Modal de compra */}
      {showModal && (
        <PurchaseModal rifa={rifa} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
