import { message } from '../errors/message';
import { Request, Response } from 'express';
import * as shopRepository from '../../database/repository/shop.repository';
import validation from './validation';
import { handleError } from '../utils';

export const add = async (req: Request, res: Response) => {
  try {
    const { name } = validation.validateAdd(req);
    let shop = await shopRepository.findByName(name);
    if (!shop) {
      shop = await shopRepository.add(name);
      res.send({ shopCreated: true, ...shop });
    } else {
      throw new Error(message.SHOP_IS_ALREADY_EXIST);
    }
  } catch (e) {
    handleError(res, e);
  }
};
