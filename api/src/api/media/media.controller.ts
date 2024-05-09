import { Request, Response } from 'express';
import * as mediaRepository from '../../database/repository/media.repository';
import validation from './validation';
import { handleError } from '../utils';
import { uploadMediaInGS } from './handler';

export const add = async (req: Request, res: Response) => {
  try {
    const mediaInput = validation.validateAdd(req);
    const media = await mediaRepository.add({file: mediaInput.file as string});
    uploadMediaInGS(media, mediaInput.audioBase64)
      .then(() => console.log('uploadMediaInGS in success'))
      .catch(() => console.log('uploadMediaInGS error occured'));
    res.send({ mediaUploaded: true, id: media.id });
  } catch (e) {
    const message = (e as Error).message;
    handleError(res, e);
  }
};
