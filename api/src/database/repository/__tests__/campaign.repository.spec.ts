import {
  mockCampaignUpdateInput,
  mockDeleteCamapign,
  mockDeleteCamapignException,
  mockFindManyCampaign,
  mockFindManyCampaignEmpty,
  mockFindManyCampaignException,
} from './../../../mocks/campaign';
import { MockContext, getContext } from './../../context/index';
import * as campaignRepository from '../campaign.repository';
import {
  mockCampaignInput,
  mockCreateCampaign,
  mockCreateCampaignException,
  mockFindUniqueCampaign,
  mockFindUniqueCampaignEmpty,
  mockFindUniqueCampaignException,
  mockUpdateCampaign,
  mockUpdateCampaignException,
} from '../../../mocks';
import { CampaignState } from '../../../typings';

let mockCtx: MockContext;

beforeEach(async () => {
  mockCtx = getContext() as MockContext;
});

test('should create new campaign if not exist in database', async () => {
  mockCreateCampaign(mockCtx);

  const campaignCreated = await campaignRepository.save(mockCampaignInput);

  expect(campaignCreated?.shopId).toEqual('640eff2bb63aa9959fc920e9');
});

test('should throw runtime exception when create rejected value', async () => {
  mockCreateCampaignException(mockCtx);

  await expect(campaignRepository.save(mockCampaignInput)).rejects.toThrow(
    Error,
  );
});

test('should find campaign by shop when campaign is exist', async () => {
  mockFindUniqueCampaign(mockCtx);

  const campaignFind = await campaignRepository.findByShopId(
    '640eff2bb63aa9959fc920e9',
  );

  expect(campaignFind?.shopId).toEqual('640eff2bb63aa9959fc920e9');
});

test('should find null when campaign is not exist', async () => {
  mockFindUniqueCampaignEmpty(mockCtx);

  const campaignFind = await campaignRepository.findByShopId(
    '640eff2bb63aa9959fc920e9',
  );

  expect(campaignFind).toEqual(null);
});

test('should throw runtime exception when find unique rejected value', async () => {
  mockFindUniqueCampaignException(mockCtx);

  await expect(
    campaignRepository.findByShopId('640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should update campaign if exist in database', async () => {
  mockUpdateCampaign(mockCtx);

  const campaingUpdated = await campaignRepository.update(
    mockCampaignUpdateInput,
    '640eff2bb63aa9959fc920e9',
  );

  expect(campaingUpdated?.state).toEqual('pause');
});

test('should throw runtime exception when update rejected value', async () => {
  mockUpdateCampaignException(mockCtx);

  await expect(
    campaignRepository.update(mockCampaignInput, '640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should delete campaign if exist in database', async () => {
  mockDeleteCamapign(mockCtx);

  const campaingDeleted = await campaignRepository.deleteByShopId(
    '640eff2bb63aa9959fc920e9',
  );

  expect(campaingDeleted?.id).toEqual('6410562e7170d091ceec8a12');
});

test('should throw runtime exception when delete rejected value', async () => {
  mockDeleteCamapignException(mockCtx);

  await expect(
    campaignRepository.deleteByShopId('640eff2bb63aa9959fc920e9'),
  ).rejects.toThrow(Error);
});

test('should find campaign by state when campaign is exist', async () => {
  mockFindManyCampaign(mockCtx);

  const campaignFind = await campaignRepository.findByState(
    CampaignState.ACTIVE,
  );

  expect(campaignFind?.length).toEqual(1);
});

test('should find null when checkout is not exist', async () => {
  mockFindManyCampaignEmpty(mockCtx);

  const campaignFind = await campaignRepository.findByState(
    CampaignState.ACTIVE,
  );

  expect(campaignFind.length).toEqual(0);
});

test('should throw runtime exception when find many rejected value', async () => {
  mockFindManyCampaignException(mockCtx);

  await expect(
    campaignRepository.findByState(CampaignState.ACTIVE),
  ).rejects.toThrow(Error);
});
