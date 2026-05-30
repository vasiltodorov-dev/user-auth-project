import { IncomingMessage, ServerResponse } from 'http';

export function handleRequests(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    if (url === '/api/register' && method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Register route hit' }));
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