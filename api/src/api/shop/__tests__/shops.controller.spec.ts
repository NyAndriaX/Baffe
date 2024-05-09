import { message } from './../../errors/message';
import { getContext, MockContext } from '../../../database/context';
import request from 'supertest';
import app from '../../../config/app';
import {
  mockFindUniqueShopEmpty,
  mockFindUniqueShop,
  mockFindUniqueShopException,
  mockCreateShopException,
  mockCreateShop,
} from '../../../mocks';

let mockCtx: MockContext;
jest.useRealTimers();

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

describe('API SHOP /api/shop', () => {
  it('POST /api/shop/add should create new shop', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    mockCreateShop(mockCtx);
    const { body, status } = await request(app).post('/api/shop/add').send({
      name: 'test-campaign-dev.myshopify.com',
    });
    expect(status).toEqual(200);
    expect(body.shopCreated).toEqual(true);
    expect(body.id).toEqual('640eff2bb63aa9959fc920e9');
  });

  it('POST /api/shop/add should throw an error when shop is already exist', async () => {
    mockFindUniqueShop(mockCtx);
    const { body, status } = await request(app)
      .post('/api/shop/add')
      .send({ name: 'test-campaign-dev.myshopify.com' });
    expect(status).toEqual(500);
    expect(body.message).toEqual(message.SHOP_IS_ALREADY_EXIST);
  });

  it('POST /api/shop/add should throw an error when find unique rejected value', async () => {
    mockFindUniqueShopException(mockCtx);
    const { body, status } = await request(app)
      .post('/api/shop/add')
      .send({ name: 'test-campaign-dev.myshopify.com' });
    expect(status).toEqual(500);
    expect(body.message).toEqual(message.ERROR_FIND_UNIQUE);
  });

  it('POST /api/shop/add should throw an error when find unique rejected value', async () => {
    mockFindUniqueShopEmpty(mockCtx);
    mockCreateShopException(mockCtx);

    const { body, status } = await request(app)
      .post('/api/shop/add')
      .send({ name: 'test-campaign-dev.myshopify.com' });
    expect(status).toEqual(500);
    expect(body.message).toEqual(message.ERROR_CREATE);
  });

  it('POST /api/shop/add should throw exception when field request is not allowed', async () => {
    const { body, status } = await request(app)
      .post('/api/shop/add')
      .send({ shopName: 'test-campaign-dev.myshopify.com' });
    expect(status).toEqual(500);
    expect(body.message).toEqual(message.NAME_IS_REQUIRED);
  });
});
