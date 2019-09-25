import { AuthenticationService } from 'services';
import Boom from '@hapi/boom';

const apiBasePath = '/api';


const routes = [{
    method: 'POST',
    path: `${apiBasePath}/login`,
    options: {
        auth: false
    },
    handler: async (request, h) => {
        try {
            const token = await AuthenticationService.authenticate(request.payload.name, request.payload.password, '1d');
            return h.response({ success: true }).header('Server-Authorization', token);
        } catch (err) {
            request.log('error', request);
            return Boom.unauthorized(err.message);
        }
    }
}];

export default routes;
