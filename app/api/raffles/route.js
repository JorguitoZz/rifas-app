import { NextResponse } from 'next/server'
import { getRaffles } from '@/lib/db'

export async function GET() {
  try {
    const raffles = await getRaffles()
    return NextResponse.json(raffles)
  } catch (error) {
    console.error('❌ Error en API /raffles:', error)
    return NextResponse.json({ error: 'Error al obtener rifas' }, { status: 500 })
  }
}
