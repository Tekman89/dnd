import Joi from '@hapi/joi';
import AuthenticationController from '../controllers/authentication';

const apiBase = process.env.API_BASE;

const routes = [{
    method: 'POST',
    path: `${apiBase}/login`,
    options: {
        auth: false
    },
    handler: AuthenticationController.authenticate,
    validate: {
        payload: {
            name: Joi.string().isRequired(),
            password: Joi.string().isRequired()
        }
    }
}];


export default routes;
