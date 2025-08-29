import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST(req) {
  const body = await req.json()
  const {
    fullName,
    cedula,
    email,
    phone,
    method,
    reference,
    tickets,
    raffleId
  } = body

  try {
    const client = await pool.connect()
    await client.query('BEGIN')

    // Insertar participante
    const participantRes = await client.query(
      `INSERT INTO participants (full_name, email, identification_number, phone_number)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [fullName, email, cedula, phone]
    )
    const participantId = participantRes.rows[0].id

    // Insertar transacción
    const transactionRes = await client.query(
      `INSERT INTO transactions (raffle_id, participant_id, payment_method_id, tickets_count, reference_number, payment_data, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
      [raffleId, participantId, method, tickets, reference, { amount: tickets * 15 }]
    )
    const transactionId = transactionRes.rows[0].id

    // Insertar tickets
    for (let i = 0; i < tickets; i++) {
      await client.query(
        `INSERT INTO tickets (raffle_id, transaction_id, ticket_number)
         VALUES ($1, $2, $3)`,
        [raffleId, transactionId, Math.floor(Math.random() * 10000)]
      )
    }

    await client.query('COMMIT')
    client.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error registrando compra:', error)
    return NextResponse.json({ error: 'Error al registrar compra' }, { status: 500 })
  }
}
