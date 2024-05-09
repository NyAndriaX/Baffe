import { message } from './../api/errors/message';
import { MockContext } from './../database/context/index';
import { Shop } from './../typings';

export const mockShopRequest: Partial<Shop> = {
  name: 'test-campaign-dev.myshopify.com',
};

export const mockShop: Partial<Shop> = {
  ...mockShopRequest,
  id: '640eff2bb63aa9959fc920e9',
};

export const mockShopWitAuditDate: Shop = {
  id: '640eff2bb63aa9959fc920e9',
  name: 'test-campaign-dev.myshopify.com',
  created_at: new Date(),
  updated_at: new Date(),
};

export function mockFindUniqueShop(mockCtx: MockContext) {
  mockCtx.prisma.shop.findUnique.mockResolvedValue(mockShopWitAuditDate);
}

export function mockFindUniqueShopEmpty(mockCtx: MockContext) {
  mockCtx.prisma.shop.findUnique.mockResolvedValue(null);
}

export function mockFindUniqueShopException(mockCtx: MockContext) {
  mockCtx.prisma.shop.findUnique.mockRejectedValue(
    new Error(message.ERROR_FIND_UNIQUE),
  );
}

export function mockCreateShop(mockCtx: MockContext) {
  mockCtx.prisma.shop.create.mockResolvedValue(mockShopWitAuditDate);
}

export function mockCreateShopException(mockCtx: MockContext) {
  mockCtx.prisma.shop.create.mockRejectedValue(new Error(message.ERROR_CREATE));
}
