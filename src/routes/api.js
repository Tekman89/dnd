const apiBasePath = '/api';


const routes = [{
    method: 'POST',
    path: `${apiBasePath}/login`,
    handler: request => {
        console.log(request.payload);
        return 200;
    }
}];

export default routes;
