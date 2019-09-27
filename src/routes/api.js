import * as AuthenticationController from 'controllers/authentication';

const apiBasePath = '/api';


const routes = [{
    method: 'POST',
    path: `${apiBasePath}/login`,
    options: {
        auth: false
    },
    handler: AuthenticationController.authenticate
}];

export default routes;
