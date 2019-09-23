/* eslint-disable no-console */

import chalk from 'chalk';
import Good from '@hapi/good';
import formatDate from 'dateformat';

let globalServer;

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        file: [{
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*', request: '*' }]
        },
        {
            module: '@hapi/good-squeeze',
            name: 'SafeJson'
        },
        {
            module: 'rotating-file-stream',
            args: [
                'access.log',
                {
                    interval: '1d',
                    path: './logs'
                }
            ]
        }]
    }
};

export const logLevels = {
    error: 'error',
    info: 'info',
    debug: 'debug'
};


function printPretty(color, string) {
    console.log(chalk[color](string));
}

function logError(error, date) {
    printPretty(this.color, date + JSON.stringify(error.callStack, error.message));
}

function logInfo(info, date) {
    printPretty(this.color, date + JSON.stringify(info));
}

function logDebug(event, date) {
    if (!process.env.DEBUG_MODE) {
        return;
    }

    printPretty(this.color, date + JSON.stringify(event));
}


const logger = {
    [logLevels.error]: {
        log: logError,
        color: 'red'
    },
    [logLevels.info]: {
        log: logInfo,
        color: 'blue'
    },
    [logLevels.debug]: {
        log: logDebug,
        color: 'yellow'
    }
};


// need to find a way to reduce the tags to only one, priority like stuff?
function serverLog(event, tags) {
    const date = event.timestamp ? formatDate(event.timestamp) : formatDate(Date.now());

    // log appropriately for each level of log
    Object.values(logLevels).forEach(level => {
        if (tags[level]) {
            logger[level].log(event, date);
        }
    });
}

// TODO: this func please
function requestLog(request, event, tags) {
    printPretty('cyan', JSON.stringify(event, tags));
}
/*
    Every time we ask for a server.log() a "log" event is fired that we can subscribe and print the
    response as we want. the 'signature' is (event<Object>, tags<Object>)
    If the request.log() is invoked a "request" event is fired.
    The 'signature' is (request<Object>, event<Object>, tags<Object>)
*/

async function register(server) {
    globalServer = server;

    await server.register({
        plugin: Good,
        options
    });

    server.events.on('log', serverLog);
    server.events.on('request', requestLog);
}

export function log(tags, event) {
    globalServer.log(tags, event);
}

export default { name: 'logger', register };
