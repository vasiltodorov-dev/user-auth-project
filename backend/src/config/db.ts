import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export async function initDatabase() {
    try {
        await pool.query(
            'CREATE TABLE IF NOT EXISTS Users (id SERIAL PRIMARY KEY,email VARCHAR(255) UNIQUE NOT NULL, full_name VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL);'
        )
    } catch (err) {
        console.error('Error initilizing database', err);
        throw err;
    }
}

export const query = (text: string, params?: any[]) => pool.query(text, params);