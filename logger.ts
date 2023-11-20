import pino, { LoggerOptions } from 'pino';

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
      { target: 'pino/file', options: { destination: logFile } as LogFileTransportOptions,level:'info' }
    ]
  }
};

const logger = pino(loggerOptions);

export default logger;
