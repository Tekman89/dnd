import AuthenticationController from 'modules/authentication/controllers/authentication';

const apiBasePath = '/api';

const routes = [{
    method: 'POST',
    path: `${apiBasePath}/login`,
    options: {
        auth: false
    },
    handler: AuthenticationController.authenticate
},
{
    method: 'GET',
    path: `${apiBasePath}/campaign/{id}`,
    options: {
        plugins: {
            hapiAuthorization: {
                async aclQuery(param, request) {
                    console.log('here');
                    console.log(JSON.parse(param));
                    console.log(request);
                    return true;
                }
            }
        }
    },
    async handler(request, h) {
        return h.response({ success: true });
    }
}];

export default routes;
