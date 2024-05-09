import { Media } from './../../typings/media';
import stream from 'stream';
import * as mediaRepository from '../../database/repository/media.repository';
import { Storage } from '@google-cloud/storage';
import config from '../../config/config';

export async function uploadMediaInGS(media: Media, audioBase64: string) {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(audioBase64, 'base64'));

  const storage = new Storage({
    keyFilename: config.gcpStorageKeyFilename,
    projectId: config.gcpStorageProjectId,
  });
  const myBucket = storage.bucket(config.gcpStorageBucket ?? '');
  const file = myBucket.file(`${media.id}-${media.file}`);
  bufferStream
    .pipe(
      file.createWriteStream({
        metadata: {
          contentType: 'audio/mpeg',
          cacheControl: 'public, max-age=31536000',
        },
        gzip: true,
        public: true,
        validation: 'md5',
      }),
    )
    .on('error', function (err) {
      console.log({ err });
    })
    .on('finish', async function () {
      const url = `${config.gcpStorageHost}/${config.gcpStorageBucket}/${media.id}-${media.file}`;
      await mediaRepository.update({
        ...media,
        url,
      });
    });
}
