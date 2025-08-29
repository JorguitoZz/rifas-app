'use server'

import { queryDB } from '@/lib/db'

export async function createRaffle(formData) {
  const name = formData.get('title') // el input se llama "title", pero la columna es "name"
  const description = formData.get('description')
  const prize = formData.get('prize')
  const ticketPrice = parseFloat(formData.get('ticketPrice'))
  const totalTickets = parseInt(formData.get('totalTickets'))
  const drawDate = formData.get('drawDate')
  const imageUrl = formData.get('image') // el input se llama "image", pero la columna es "image_url"

  try {
    await queryDB(
      `INSERT INTO raffles (
        name, description, prize, ticket_price, total_tickets, available_tickets, draw_date, image_url
      ) VALUES ($1, $2, $3, $4, $5, $5, $6, $7)`,
      [name, description, prize, ticketPrice, totalTickets, drawDate, imageUrl]
    )
    return { success: true }
  } catch (error) {
    console.error('❌ Error creando rifa:', error)
    return { success: false, error }
  }
}
