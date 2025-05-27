import { t } from '#src/utils/i18n.js';
import { config } from '#src/config/index.js';
import { dirname, path } from '#src/utils/get-dirname.js';

import fs from 'fs';
import { hostname } from 'os';

let logArr, logIndex = 0;
const logsDir = path.join(dirname, '../../' + config.defaultLogPath);

const infoLogsPath = path.join(logsDir, 'info-log.jsonl');
const errorLogsPath = path.join(logsDir, 'error-log.jsonl');

const getNewLog = async (logType = 'INFO', mode, processes) => {

  if (logType !== 'INFO' && logType !== 'ERROR') {
    throwErr(logType);
  }

  let resultFile;
  logType === 'INFO' ? resultFile = {
    pathType: infoLogsPath,
    isThereFile: isThereFile(infoLogsPath)
  }
    : resultFile = {
      pathType: errorLogsPath,
      isThereFile: isThereFile(errorLogsPath)
    };

  logArr = {
    'ID': logIndex,
    'level': logType,
    'started_time': new Date().toISOString(),
    'hostname': hostname(),
    'mode': mode,
    'processes': processes
  };

  if (!resultFile['isThereFile']) {
    appendLogFile(resultFile['pathType'], logArr);
  } else {

    let clearLogData = await checkLogFile(resultFile);
    clearLogData = parseData(clearLogData);
    writeAllLog(clearLogData, logArr, resultFile);
  }
}

const appendLogFile = (path, data) => {
  const stream = fs.createWriteStream(path, { flag: 'a+', encoding: 'utf-8' });
  stream.write(JSON.stringify(data));
  stream.end();
}

const checkLogFile = (resultFile) => {

  return new Promise((res, rej) => {

    const stream = fs.createReadStream(resultFile['pathType'], { encoding: 'utf-8' });
    let clearLogJson = [], buffer = '';

    stream.on('data', chunk => {
      buffer += chunk
    });

    stream.on('end', () => {

      let logJson = buffer.trim().split('\n');

      for (let j = 0; j < logJson.length; j++) {
        if (logJson[j].length > 0) {
          clearLogJson.push(logJson[j]);
        }
      }

      if (clearLogJson.length >= config.defaultLogCount) {
        clearLogJson = clearLogJson.slice(-config.defaultLogCount);
      }

      res(clearLogJson);

    });

    stream.on('error', (err) => {
      rej(err);
    });

  });
}

const parseData = (clearLogJson) => {
  const parsedData = []
  for (let i = 0; i < clearLogJson.length; i++) {
    try {
      parsedData.push(JSON.parse(clearLogJson[i]));
    } catch (err) {
      console.log(t('log.broken_json'));
      continue;
    }
  }
  return parsedData;
}

const writeAllLog = (clearLogData, newLog, resultFile) => {
  try {
    newLog['ID'] = clearLogData[clearLogData.length - 1]['ID'] + 1;
  } catch (err) {
    newLog['ID'] = 0;
  }
  clearLogData.push(newLog);
  const stream = fs.createWriteStream(resultFile['pathType'], {
    flags: 'w',
    encoding: 'utf-8'
  });

  for (const log of clearLogData) {
    stream.write(JSON.stringify(log) + '\n');
  }

  stream.end();

}

const throwErr = (logType) => {
  throw new Error(`Invalid Log Type: '${logType}'. Only INFO and ERROR are accepted!`);
}

const isThereFile = (logPath) => fs.existsSync(logPath);

export default getNewLog;
