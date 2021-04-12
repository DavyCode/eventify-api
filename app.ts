import 'express-async-errors';
import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors'
import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './modules/users/users.routes.config';
import {AuthRoutes} from './modules/auth/auth.routes.config'
import debug from 'debug';
import helmet from 'helmet';
import headerOptions from './setup/headerOptions';
import {PORT} from './config/env'

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json())
app.use(cors());
app.use(helmet());

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (process.env.DEBUG) {
	process.on('unhandledRejection', function(reason) {
		debugLog('Unhandled Rejection:', reason);
		process.exit(1);
	});
} else {
  loggerOptions.meta = false;
}

/**
 * Header options
 */
app.use(headerOptions);

// app.all('/*', checkHeader)
app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send({ message: `Server running at http://localhost:${PORT}` })
});

server.listen(PORT, () => {
	debugLog(`Server running at http://localhost:${PORT}`);
		routes.forEach((route: CommonRoutesConfig) => {
	debugLog(`Routes configured for ${route.getName()}`);
	});
});