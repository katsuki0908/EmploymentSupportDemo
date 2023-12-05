import pino, { LoggerOptions } from 'pino';//npm install pino-pretty必須
interface LogFileTransportOptions {
  destination: string;
}

const logFile = 'logs.txt';

const loggerOptions: LoggerOptions = {
  level: 'info',
  base: null,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  transport: {
    targets: [
      { target: 'pino/file', options: { destination: logFile } as LogFileTransportOptions,level:'info' },
      {
        target: 'pino-pretty',
        options: { colorize: true },
        level: 'info'
      }
    ]
  }
};

const logger = pino(loggerOptions);

function logUser(){
  logger.info('a');
}

export default logger;