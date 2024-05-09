import { MockContext, getContext } from './../../context/index';
import * as shopRepository from '../shop.repository';
import {
  mockCreateShop,
  mockCreateShopException,
  mockFindUniqueShop,
  mockFindUniqueShopEmpty,
  mockFindUniqueShopException,
} from '../../../mocks';

let mockCtx: MockContext;

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

test('should create new shop if not exist in database', async () => {
  mockCreateShop(mockCtx);

  const shopCreated = await shopRepository.add('test-campaign-dev.myshopify.com');

  expect(shopCreated?.name).toEqual('test-campaign-dev.myshopify.com');
});

test('should throw runtime exception when create rejected value', async () => {
  mockCreateShopException(mockCtx);

  await expect(
    shopRepository.add('test-campaign-dev.myshopify.com'),
  ).rejects.toThrow(Error);
});

test('should find shop by name when shop is exist', async () => {
  mockFindUniqueShop(mockCtx);

  const shopFind = await shopRepository.findByName(
    'test-campaign-dev.myshopify.com',
  );

  expect(shopFind?.name).toEqual('test-campaign-dev.myshopify.com');
});

test('should find null when shop is not exist', async () => {
  mockFindUniqueShopEmpty(mockCtx);

  const shopFind = await shopRepository.findByName(
    'test-campaign-dev.myshopify.com',
  );

  expect(shopFind).toEqual(null);
});

test('should throw runtime exception when find unique rejected value', async () => {
  mockFindUniqueShopException(mockCtx);

  await expect(
    shopRepository.findByName('test-campaign-dev.myshopify.com'),
  ).rejects.toThrow(Error);
});
