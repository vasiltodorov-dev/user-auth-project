import http from 'http';
import 'dotenv/config';
import { initDatabase } from './config/db.js';     
import { handleRequests } from './router.js';       

export async function startServer() {
    try {
        await initDatabase();

        const server = http.createServer((req, res) => {
            handleRequests(req, res); 
        });

        const port = parseInt(process.env.PORT || '8080', 10);
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

startServer();