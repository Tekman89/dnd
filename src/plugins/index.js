import logger from './logger';
import auth from './authentication';
import database from './database';
import authorization from './authorization';
import repository from './repository';


export default [logger, auth, database, authorization, repository];
