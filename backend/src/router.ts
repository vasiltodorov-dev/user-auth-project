import { IncomingMessage, ServerResponse } from 'http';
import { registerUser } from './controllers/authController.js';

export async function handleRequests(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    if (url === '/api/register' && method === 'POST') {
        return await registerUser(req, res);
    }

    if (url === '/api/login' && method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Login route hit' }));
    }

    if (url === '/api/logout' && method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Logout route hit' }));
    }

    if (url === '/api/user/update' && method === 'PUT') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User update route hit' }));
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Route not found' }));
}