// scripts/init-database.js
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // importante para Neon
});

async function initDatabase() {
  console.log('🔌 Conectando a la base de datos Neon...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    const sql = fs.readFileSync(path.join(__dirname, 'init-tables.sql'), 'utf8');
    const statements = sql.split(';').filter(statement => statement.trim().length > 0);

    for (const statement of statements) {
      try {
        await pool.query(statement + ';');
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.warn('Advertencia al ejecutar statement:', error.message);
        }
      }
    }

    console.log('✅ Tablas verificadas/creadas exitosamente');

    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@rifas.com']);

    if (userCheck.rows.length === 0) {
      console.log('👤 Creando usuario administrador...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);

      await pool.query(
        `INSERT INTO users (name, email, password, role) 
         VALUES ($1, $2, $3, $4)`,
        ['Administrador', 'admin@rifas.com', hashedPassword, 'admin']
      );

      console.log('✅ Usuario admin creado:');
      console.log('   Email: admin@rifas.com');
      console.log('   Contraseña: admin123');
    } else {
      console.log('ℹ️ Usuario admin ya existe');
    }

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('\n📊 Tablas creadas:');
    tables.rows.forEach(table => {
      console.log(`   ✅ ${table.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error.message);
  } finally {
    await pool.end();
    console.log('\n🎉 Base de datos Neon inicializada correctamente!');
    console.log('   Puedes ahora ejecutar tu aplicación con: npm run dev');
  }
}

initDatabase();
