import { Request, Response } from 'express';
import validation from './validation';
import { handleError } from '../utils';
import {
  handleCreate,
  handleDeleteCampaingByShopName,
  handleGetCampaignByShopName,
  handleUpdate,
} from './handler';

export const save = async (req: Request, res: Response) => {
  try {
    const request = validation.validateCampaignRequest(req);
    const { shop, ...data } = request;
    const campaign = await handleCreate(shop, data);
    res.send({ id: campaign.id });
  } catch (e) {
    handleError(res, e);
  }
};

export async function getByShop(req: Request, res: Response) {
  try {
    const shop = req.params.shop;
    const campaign = await handleGetCampaignByShopName(shop);
    res.send(campaign);
  } catch (e) {
    handleError(res, e);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const request = validation.validateCampaignRequest(req);
    const { shop, ...data } = request;
    const campaign = await handleUpdate(shop, data);
    res.send({ id: campaign.id });
  } catch (e) {
    handleError(res, e);
  }
}

export async function deleteByShop(req: Request, res: Response) {
  try {
    const shop = req.params.shop;
    const campaign = await handleDeleteCampaingByShopName(shop);
    res.send({ id: campaign.id });
  } catch (e) {
    handleError(res, e);
  }
}
