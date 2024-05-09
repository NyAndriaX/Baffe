import config from '../config';
import logger from './logger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const callr = require('callr');

const api = new callr.api(
  callr.loginPasswordAuth(config.voiceProvider.id, config.voiceProvider.pw),
);

async function dtv(param: {
  message: string;
  cli: string;
  targetNumber: string;
}): Promise<string> {
  const { message, cli, targetNumber } = param;
  const target = { number: `${targetNumber}`, timeout: 30 };
  const messages = [message];
  const options = {
    cdr_field: 'userData',
    cli: `+${cli}`,
    direct_to_voicemail: true,
  };

  logger.info(
    `[CALLR DTV] :: 1. Shooting Phone ${targetNumber} With CLI ${options.cli}`,
  );
  return new Promise((resolve, reject) => {
    api
      .call('calls.broadcast_1', target, messages, options)
      .success(async (r: any) => {
        logger.info(
          `[CALLR DTV] :: 2. Successfully Shoot Phone ${targetNumber} With CLI ${options.cli}`,
        );
        resolve(r);
      })
      .error(async (e: any) => {
        logger.error(
          `[CALLR DTV] :: ERROR :: Unable To Shoot Phone ${targetNumber} With CLI ${options.cli} :: ${e}`,
        );
        reject(e);
      });
  });
}

async function createMedia(): Promise<string> {
  return new Promise((resolve, reject) => {
    api
      .call('media/library.create', 'name')
      .success(async (r: string) => {
        logger.info(`[CALLR CREATE MEDIA] :: Successfully Created Media ${r}`);
        resolve(r);
      })
      .error(async (e: any) => {
        logger.error(
          `[CALLR CREATE MEDIA] :: ERROR :: Unable To Create Media :: ${e}`,
        );
        reject(e);
      });
  });
}

async function getMedia(): Promise<any> {
  return new Promise((resolve, reject) => {
    api
      .call('media/library.get_list', null)
      .success(async (r: any) => {
        logger.info('[CALLR GET MEDIA LIST] :: Successfully Fetch Media List');
        resolve(r);
      })
      .error(async (e: any) => {
        logger.error(
          `[CALLR GET MEDIA LIST] :: ERROR :: Unable To Get Media :: ${e}`,
        );
        reject(e);
      });
  });
}

async function getById(id: string): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    api
      .call('media/library.get', id)
      .success(async (r: any) => {
        logger.info(`[CALLR GET MEDIA] :: Successfully Fetch Media ${id}`);
        resolve(r);
      })
      .error(async (e: any) => {
        logger.error(
          `[CALLR GET MEDIA] :: ERROR :: Unable To Get Media ${id} :: ${e}`,
        );
        reject(e);
      });
  });
}

async function uploadMediaBase64(data: any): Promise<string> {
  const webhook = {
    endpoint: config.voiceProvider.webhook,
  };

  return new Promise((resolve, reject) => {
    api
      .call('media.import_file_from_base64_async', data, webhook)
      .success(async (r: string) => {
        logger.info(
          `[CALLR UPLOAD MEDIA BASE64] :: Successfully Started Upload Process, Waiting Response On ${webhook.endpoint}`,
        );
        resolve(r);
      })
      .error(async (e: any) => {
        logger.error(
          `[CALLR UPLOAD MEDIA BASE64] :: ERROR :: Unable To Start Media Upload :: ${e}`,
        );
        reject(e);
      });
  });
}

async function bindMedia(param: { media_id: string; file: any }) {
  const { media_id, file } = param;
  return new Promise((resolve, reject) => {
    api
      .call('media/library.set_content_from_file', media_id, file)
      .success(async (r: any) => {
        logger.info(
          `[CALLR BIND MEDIA] :: Successfully Bound MediaId ${media_id} With File ${file}`,
        );
        resolve(r);
      })
      .error(async (e: any) => {
        logger.info(
          `[CALLR BIND MEDIA] :: ERROR :: Unable To Bind MediaId ${media_id} With File ${file} :: ${e}`,
        );
        reject(e);
      });
  });
}

async function whVoiceMail() {
  return new Promise((resolve, reject) => {
    api
      .call(
        'webhooks.subscribe',
        'media.recording.status_update',
        config.voiceProvider.whRTVoiceMail,
        null,
      )
      .success(async (r: any) => {
        resolve(r);
      })
      .error(async (e: any) => {
        logger.info(
          `[CALLR WH VOICE MAIL] :: ERROR :: Unable To Subscribe To WH ${config.voiceProvider.whRTVoiceMail} :: ${e}`,
        );
        reject(e);
      });
  });
}

async function listWebhooks() {
  return new Promise((resolve, reject) => {
    api
      .call('webhooks.get_list')
      .success(async (r: any) => {
        resolve(r);
      })
      .error(async (e: any) => {
        logger.info(
          `[CALLR LIST WEBHOOKS] :: ERROR :: Unable To List Webhooks :: ${e}`,
        );
        reject(e);
      });
  });
}

export default {
  dtv,
  createMedia,
  getMedia,
  getById,
  uploadMediaBase64,
  bindMedia,
  whVoiceMail,
  listWebhooks,
};
