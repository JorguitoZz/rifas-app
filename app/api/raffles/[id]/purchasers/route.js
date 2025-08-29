import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(request, { params }) {
  const { id } = params

  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.full_name AS buyerName,
        p.email AS buyerEmail,
        p.identification_number AS buyerCedula,
        t.ticket_number,
        tr.payment_method_id,
        tr.tickets_count,
        tr.payment_data,
        tr.status,
        tr.created_at AS paymentDate
      FROM participants p
      JOIN transactions tr ON tr.participant_id = p.id
      JOIN tickets t ON t.transaction_id = tr.id
      WHERE tr.raffle_id = $1
    `, [id])

    // Agrupar por comprador
    const grouped = {}
    result.rows.forEach(row => {
      if (!grouped[row.id]) {
        grouped[row.id] = {
          id: row.id,
          buyerName: row.buyername,
          buyerEmail: row.buyeremail,
          buyerCedula: row.buyeredula,
          paymentMethod: row.payment_method_id,
          amount: row.payment_data?.amount || 0,
          assignedNumbers: [],
          paymentDate: row.paymentdate,
          confirmed: row.status === 'confirmed'
        }
      }
      grouped[row.id].assignedNumbers.push(row.ticket_number)
    })

    return NextResponse.json(Object.values(grouped))
  } catch (error) {
    console.error('❌ Error obteniendo compradores:', error)
    return NextResponse.json({ error: 'Error al obtener compradores' }, { status: 500 })
  }
}
