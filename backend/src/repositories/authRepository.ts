import { query } from "../config/db.js";

export async function insertUser(full_name: string, email: string, hashPassword: string) {
    try {
        const query_text = 'INSERT INTO Users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [full_name, email, hashPassword];
        const result = await query(query_text, values);
        console.log('Inserted user:', result.rows[0]);
    } catch (err) {
        console.error('Error inserting user', err);
        throw err;
    }
}