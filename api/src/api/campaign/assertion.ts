import { MockContext, getContext } from '../../database/context/index';
import request from 'supertest';
import { mockFindUniqueShopEmpty } from '../../mocks/shop';
import { message } from '../errors';
import app from '../../config/app';
import { mockFindUniqueCampaignEmpty } from '../../mocks/campaign';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';
const mockCtx: MockContext = getContext() as MockContext;

async function executeRequest(url: string, method: Method, mockRequest: any) {
  if (method === 'POST') return request(app).post(url).send(mockRequest);
  else if (method === 'GET') return request(app).get(url);
  else if (method === 'DELETE') return request(app).delete(url);
  else return request(app).put(url).send(mockRequest);
}

export async function assertException(
  url: string,
  method: Method,
  mockRequest: any,
  errorMessage: string,
): Promise<void> {
  const { body, status } = await executeRequest(url, method, mockRequest);
  expect(status).toEqual(500);
  expect(body.message).toEqual(errorMessage);
}

export async function assertExceptionShopNotFound(
  url: string,
  method: Method,
  mockRequest: any,
): Promise<void> {
  mockFindUniqueShopEmpty(mockCtx);
  await assertException(url, method, mockRequest, message.SHOP_NOT_FOUND);
}

export async function assertExceptionCampaignNotFound(
  url: string,
  method: Method,
  mockRequest: any,
): Promise<void> {
  mockFindUniqueCampaignEmpty(mockCtx);
  await assertException(url, method, mockRequest, message.CAMPAIGN_NOT_FOUND);
}
