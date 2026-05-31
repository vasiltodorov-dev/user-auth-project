import { IncomingMessage, ServerResponse } from 'http';
import { parseJsonBody } from '../utils/bodyParser.js';
import { insertUser } from '../repositories/authRepository.js';
import { validateRegistrateUserInput } from '../utils/validation.js'
import { hashPassword } from '../utils/hashPassword.js';

export async function registerUser(req: IncomingMessage, res: ServerResponse) {
    try {
        const body = await parseJsonBody(req);
        
        const { email, full_name, password } = body;

        const validation_error = validateRegistrateUserInput({email, full_name, password});
        if(validation_error.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ 
                message: 'Validation failed',
                errors: validation_error
             }));
        }

        const hash_Password = await hashPassword(password)

        await insertUser(full_name, email, hash_Password);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User regisrated successufly' }));

    } catch (err: any) {
        if (err.code === "23505") {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Email already exists' }));
        }

        throw err;
    }
}