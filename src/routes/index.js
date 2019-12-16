import AuthRoutes from 'modules/authentication/routes';
import dotenv from 'dotenv';

dotenv.config();

const apiBase = process.env.API_BASE;

export default [{
    method: 'POST',
    path: `${apiBase}/login`,
    config: AuthRoutes.login
}];
