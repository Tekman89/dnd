import Joi from '@hapi/joi';
import AuthenticationController from '../controllers/authentication';

export const login = {
    handler: AuthenticationController.login,
    auth: false,
    validate: {
        payload:
            Joi.object({
                name: Joi.string().required(),
                password: Joi.string().required()
            })
    }
};

export default { login };
