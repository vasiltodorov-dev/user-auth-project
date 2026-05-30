import { IncomingMessage } from 'http';

export function parseJsonBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                if (!body) {
                    return resolve({});
                }
                const parsedData = JSON.parse(body);
                resolve(parsedData);
            } catch (err) {
                reject(new Error('Invalid JSON format'));
            }
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
}