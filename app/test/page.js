// app/test/page.js
import { queryDB } from '@/lib/db'

export default async function TestPage() {
  let raffles = []

  try {
    const result = await queryDB(
      'SELECT * FROM raffles WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    )
    raffles = result.rows
  } catch (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial', color: 'red' }}>
        <h1>❌ Error conectando a la base de datos</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>✅ Conexión a Base de Datos Exitosa</h1>
      <p>Total de rifas activas en la base de datos: <strong>{raffles.length}</strong></p>

      {raffles.length > 0 && (
        <>
          <h2>🎟️ Rifas activas:</h2>
          <ul>
            {raffles.map((raffle) => (
              <li key={raffle.id}>
                <strong>{raffle.name}</strong> — {raffle.available_tickets} disponibles / {raffle.total_tickets} totales
              </li>
            ))}
          </ul>
        </>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>📦 Tablas esperadas en la base de datos:</h2>
      <ul>
        <li>✅ users (para autenticación)</li>
        <li>✅ raffles (rifas)</li>
        <li>✅ participants (participantes)</li>
        <li>✅ payment_methods (métodos de pago)</li>
        <li>✅ transactions (transacciones)</li>
        <li>✅ tickets (tickets vendidos)</li>
      </ul>

      <hr style={{ margin: '30px 0' }} />

      <h2>🔐 Credenciales de administrador (solo para desarrollo):</h2>
      <p>Email: <strong>admin@rifas.com</strong></p>
      <p>Contraseña: <strong>admin123</strong></p>

      <div style={{ background: '#fef3c7', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
        <strong>⚠️ IMPORTANTE:</strong> Cambia la contraseña del administrador después del primer acceso.
      </div>
    </div>
  )
}
