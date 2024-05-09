import { message } from './../api/errors/message';
import { MockContext } from './../database/context/index';
import {
  CampaignInput,
  CampaignResolved,
  CampaignStateType,
  CampaignState,
} from './../typings';

const campaign = {
  days: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  optionDays: 'everyDayExceptWeekends',
  phoneNumber: '+123456789',
  optionSchedule: '9h-19h',
  scheduleBegin: '9h',
  scheduleEnd: '19h',
  voiceMails: [
    {
      mediaId: '63ea109dba678075a50bb581',
      ratio: 100,
    },
  ],
  state: CampaignState.ACTIVE as CampaignStateType,
};

const campaingInput = {
  ...campaign,
  voiceMails: campaign.voiceMails.map((el) => ({
    url: 'https://example.com/upvoice-1.mp3',
    mediaId: el.mediaId,
    ratio: el.ratio,
  })),
};

export const mockCampaignRequest = {
  ...campaign,
  shop: 'test-campaign-dev.myshopify.com',
};

export const mockCampaignUpdateRequest = {
  ...campaign,
  shop: 'test-campaign-dev.myshopify.com',
  state: CampaignState.PAUSE,
};

export const mockCampaignInput: CampaignInput = {
  ...campaingInput,
  shopId: '640eff2bb63aa9959fc920e9',
};

export const mockCampaignUpdateInput: CampaignInput = {
  ...campaingInput,
  shopId: '640eff2bb63aa9959fc920e9',
  state: CampaignState.PAUSE,
};

export const mockCampaignWithAuditDate: CampaignResolved = {
  ...campaingInput,
  id: '6410562e7170d091ceec8a12',
  shopId: '640eff2bb63aa9959fc920e9',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCampaignUpdateWithAuditDate: CampaignResolved = {
  ...campaingInput,
  id: '6410562e7170d091ceec8a12',
  shopId: '640eff2bb63aa9959fc920e9',
  state: 'pause',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCampaignWithPhoneNumberNull: CampaignResolved = {
  ...mockCampaignWithAuditDate,
  phoneNumber: null,
};

export function mockFindUniqueCampaign(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findUnique.mockResolvedValue(
    mockCampaignWithAuditDate,
  );
}

export function mockFindUniqueCampaignNotValid(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findUnique.mockResolvedValue(
    mockCampaignWithPhoneNumberNull,
  );
}

export function mockFindUniqueCampaignEmpty(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findUnique.mockResolvedValue(null);
}

export function mockFindUniqueCampaignException(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findUnique.mockRejectedValue(
    new Error(message.ERROR_FIND_UNIQUE),
  );
}

export function mockCreateCampaign(mockCtx: MockContext) {
  mockCtx.prisma.campaign.create.mockResolvedValue(mockCampaignWithAuditDate);
}

export function mockCreateCampaignException(mockCtx: MockContext) {
  mockCtx.prisma.campaign.create.mockRejectedValue(
    new Error(message.ERROR_CREATE),
  );
}

export function mockUpdateCampaign(mockCtx: MockContext) {
  mockCtx.prisma.campaign.update.mockResolvedValue(
    mockCampaignUpdateWithAuditDate,
  );
}

export function mockUpdateCampaignException(mockCtx: MockContext) {
  mockCtx.prisma.campaign.update.mockRejectedValue(
    new Error(message.ERROR_UPDATE),
  );
}

export function mockDeleteCamapign(mockCtx: MockContext) {
  mockCtx.prisma.campaign.delete.mockResolvedValue(
    mockCampaignUpdateWithAuditDate,
  );
}

export function mockDeleteCamapignException(mockCtx: MockContext) {
  mockCtx.prisma.campaign.delete.mockRejectedValue(
    new Error(message.ERROR_DELETE),
  );
}

export function mockFindManyCampaign(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findMany.mockResolvedValue([
    mockCampaignUpdateWithAuditDate,
  ]);
}

export function mockFindManyCampaignEmpty(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findMany.mockResolvedValue([]);
}

export function mockFindManyCampaignException(mockCtx: MockContext) {
  mockCtx.prisma.campaign.findMany.mockRejectedValue(
    new Error(message.ERROR_FIND_MANY),
  );
}
