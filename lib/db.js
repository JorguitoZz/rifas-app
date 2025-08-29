// lib/db.js
import { Pool } from 'pg'

// Evitar múltiples instancias del pool en desarrollo (hot reload)
const globalForPg = globalThis

if (!process.env.POSTGRES_URL) {
  throw new Error('❌ POSTGRES_URL no está definida en el entorno de producción')
}

console.log('🔍 POSTGRES_URL en producción:', process.env.POSTGRES_URL)


export const pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }, // requerido por Neon
  })

if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = pool

// Función genérica para ejecutar consultas SQL
export async function queryDB(text, params = []) {
  let client
  try {
    client = await pool.connect()
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error('❌ Database error:', error)
    throw error
  } finally {
    if (client) client.release()
  }
}

// Función para reservar tickets con transacción segura
export async function reserveTickets(raffleId, ticketNumbers, transactionId) {
  let client
  try {
    client = await pool.connect()
    await client.query('BEGIN')

    for (const ticketNumber of ticketNumbers) {
      await client.query(
        `INSERT INTO tickets (raffle_id, transaction_id, ticket_number)
         VALUES ($1, $2, $3)`,
        [raffleId, transactionId, ticketNumber]
      )
    }

    await client.query(
      `UPDATE raffles SET available_tickets = available_tickets - $1 WHERE id = $2`,
      [ticketNumbers.length, raffleId]
    )

    await client.query('COMMIT')
    return true
  } catch (error) {
    if (client) await client.query('ROLLBACK')
    console.error('❌ Error reservando tickets:', error)
    throw error
  } finally {
    if (client) client.release()
  }
}

// Función para obtener rifas activas
export async function getRaffles() {
  const result = await queryDB(
    'SELECT * FROM raffles WHERE status = $1 ORDER BY created_at DESC',
    ['active']
  )
  return result.rows
}
