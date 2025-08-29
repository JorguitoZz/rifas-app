import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, name, details FROM payment_methods WHERE is_active = true'
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('❌ Error cargando métodos de pago:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
