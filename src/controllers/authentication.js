import Boom from '@hapi/boom';
import { AuthenticationService } from 'services';


export async function authenticate(request, h) {
    try {
        const token = await AuthenticationService.authenticate(request.payload.name, request.payload.password, '1d');
        return h.response({ success: true }).header('Server-Authorization', token);
    } catch (err) {
        request.log('error', err);
        return Boom.unauthorized(err.message);
    }
}

export default { authenticate };
