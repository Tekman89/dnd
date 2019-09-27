import * as AuthenticationController from 'controllers/authentication';
import UserType from 'enums/user-type';

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
            hapiAuthorization: { roles: [UserType.PLAYER, UserType.DM] },
            async aclQuery(param, request) {
                console.log(JSON.parse(param), JSON.parse(request));
            }
        }
    },
    async handler(request, h) {
        return h.success(200);
    }
}];

export default routes;
