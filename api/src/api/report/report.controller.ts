import { AbandonedCheckoutRequest } from './../../typings/checkout';
import { Request, Response } from 'express';
import { handleError } from '../utils';
import {
  handleGetSummaryByShop,
  handleGetMonthChartByShop,
  handleGetCheckoutsByShop,
} from './handler';
import { message } from '../errors';
import { mapToAbandonedCheckout } from '../utils/mapping';
import validation from './validation';


export const getSummaryByShop = async(req: Request, res: Response) => {
  try {
    const shopName = req.params.shop;
    const data = await handleGetSummaryByShop(shopName);
    res.send(data);
  } catch (e) {
    handleError(res, e);
  }
};

export const getMonthChartByShop = async(req: Request, res: Response) => {
  try {
    const shopName = req.params.shop;
    const data = await handleGetMonthChartByShop(shopName);
    res.send(data);
  } catch (e) {
    handleError(res, e);
  }
};

export const getCheckoutsByShop = async (req: Request, res: Response) => {
  try {
    const shopName = req.params.shop;
    const checkouts = await handleGetCheckoutsByShop(shopName);
    res.send(checkouts);
  } catch (e) {
    handleError(res, e);
  }
};
