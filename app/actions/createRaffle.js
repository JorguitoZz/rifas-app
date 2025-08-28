// app/actions/createRaffle.js
'use server';

import { queryDB } from '@/lib/db';

export async function createRaffle(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const prize = formData.get('prize');
  const ticketPrice = parseFloat(formData.get('ticketPrice'));
  const totalTickets = parseInt(formData.get('totalTickets'));
  const drawDate = formData.get('drawDate');
  const image = formData.get('image');

  try {
    await queryDB(
      `INSERT INTO raffles (title, description, prize, ticket_price, total_tickets, available_tickets, draw_date, image)
       VALUES ($1, $2, $3, $4, $5, $5, $6, $7)`,
      [title, description, prize, ticketPrice, totalTickets, drawDate, image]
    );
    return { success: true };
  } catch (error) {
    console.error('Error creando rifa:', error);
    return { success: false, error };
  }
}
