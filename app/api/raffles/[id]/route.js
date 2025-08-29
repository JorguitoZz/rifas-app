import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function DELETE(request, { params }) {
  const { id } = params

  try {
    const client = await pool.connect()
    await client.query('BEGIN')

    // Eliminar tickets, transacciones, etc. si hay relaciones
    await client.query('DELETE FROM tickets WHERE raffle_id = $1', [id])
    await client.query('DELETE FROM transactions WHERE raffle_id = $1', [id])
    await client.query('DELETE FROM raffles WHERE id = $1', [id])

    await client.query('COMMIT')
    client.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error eliminando rifa:', error)
    return NextResponse.json({ error: 'Error al eliminar rifa' }, { status: 500 })
  }
}
