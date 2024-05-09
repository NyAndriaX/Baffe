import { AbandonedCheckoutRequest } from './../../typings/checkout';
import { Request, Response } from 'express';
import { handleError } from '../utils';
import {
  handleGetCheckoutsByShop,
  handleSendAndSaveOrUpdateAbandonedCheckout,
  handleUpdateCheckoutToCatchUp,
} from './handler';
import { message } from '../errors';
import { mapToAbandonedCheckout } from '../utils/mapping';
import validation from './validation';

export const sendAndSaveOrUpdateAbandonedCheckout = async (
  req: Request,
  res: Response,
) => {
  try {
    const shopName = req.params.shop;
    const abandonedCheckouts = req.body.checkouts || [];
    if (abandonedCheckouts.length) {
      const handlers = [];
      for (const abandonedCheckoutRequest of abandonedCheckouts) {
        const abandonedCheckoutInput: AbandonedCheckoutRequest = mapToAbandonedCheckout(abandonedCheckoutRequest);
        if (abandonedCheckoutInput.customer.phone) {
          handlers.push(handleSendAndSaveOrUpdateAbandonedCheckout(shopName, abandonedCheckoutInput));
        }
      }
      await Promise.all(handlers);
      res.send({
        message: 'saveOrUpdateAbandonedCheckout success',
      });
    } else {
      throw new Error(message.REQUEST_ABANDONED_CHECKOUT_IS_EMPTY);
    }
  } catch (e) {
    handleError(res, e);
  }
};

export const updateCheckoutToCatchUp = async (req: Request, res: Response) => {
  try {
    const shopName = req.params.shop;
    const checkouts = validation.validateBodyCheckouts(req);
    const handlers = [];
    for (const obj of checkouts.data) {
      handlers.push(handleUpdateCheckoutToCatchUp(obj.checkout_id, shopName));
    }
    const results = await Promise.all(handlers);
    res.send({
      message: 'updateCheckoutToCatchUp success',
      data: results,
    });
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
