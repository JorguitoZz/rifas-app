-- Crear tabla de usuarios para autenticación
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para las rifas
CREATE TABLE IF NOT EXISTS raffles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    prize VARCHAR(255) NOT NULL,
    total_tickets INTEGER NOT NULL,
    available_tickets INTEGER NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    draw_date TIMESTAMP NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Crear tabla para los participantes
CREATE TABLE IF NOT EXISTS participants (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    identification_number VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para métodos de pago
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    details JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Crear tabla para transacciones/pagos
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    raffle_id INTEGER REFERENCES raffles(id),
    participant_id INTEGER REFERENCES participants(id),
    payment_method_id INTEGER REFERENCES payment_methods(id),
    tickets_count INTEGER NOT NULL,
    reference_number VARCHAR(100) NOT NULL,
    payment_data JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para tickets vendidos
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    raffle_id INTEGER REFERENCES raffles(id),
    transaction_id INTEGER REFERENCES transactions(id),
    ticket_number INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(raffle_id, ticket_number)
);

-- Insertar métodos de pago iniciales
INSERT INTO payment_methods (name, details) VALUES
('Zelle', '{"accountNumber": "1234567890", "accountName": "Rifas Company", "email": "transfers@rifas.com"}'),
('Binance', '{"walletId": "binance123456", "walletName": "Rifas Company"}'),
('Pago Móvil', '{"phoneNumber": "0412-1234567", "identification": "12345678", "bank": "Banco de Venezuela"}')
ON CONFLICT DO NOTHING;