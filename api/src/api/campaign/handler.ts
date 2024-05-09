import { CampaignState, VoiceMailOutput } from './../../typings/campaign';
import { message } from './../errors/message';
import * as campaignRepository from '../../database/repository/campaign.repository';
import * as shopRepository from '../../database/repository/shop.repository';
import * as mediaRepository from '../../database/repository/media.repository';
import { CampaignInput, CampaignOutput, Campaign } from '../../typings';

export async function handleCreate(
  shopName: string,
  data: CampaignInput,
): Promise<Campaign> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    data.shopId = shop.id;
    const campaign = await campaignRepository.findByShopId(shop.id);
    if (!campaign) {
      return campaignRepository.save(data);
    }
    throw new Error(message.CAMPAIGN_IS_ALREADY_EXIST);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

export async function handleUpdate(
  shopName: string,
  data: CampaignInput,
): Promise<Campaign> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const campaign = await campaignRepository.findByShopId(shop.id);
    if (campaign) {
      return campaignRepository.update(data, shop.id);
    }
    throw new Error(message.CAMPAIGN_NOT_FOUND);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

export async function handleGetCampaignByShopName(
  shopName: string,
): Promise<CampaignOutput> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const campaign = await campaignRepository.findByShopId(shop.id);
    if (campaign && campaign.id && campaign.state) {
      return populateMedia(campaign);
    }
    throw new Error(message.CAMPAIGN_NOT_FOUND);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

export async function handleDeleteCampaingByShopName(
  shopName: string,
): Promise<Campaign> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const campaign = await campaignRepository.findByShopId(shop.id);
    if (campaign && campaign.id) {
      return campaignRepository.deleteByShopId(shop.id);
    }
    throw new Error(message.CAMPAIGN_NOT_FOUND);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

async function populateMedia(campaign: Campaign): Promise<CampaignOutput> {
  if (
    !(
      campaign.days &&
      campaign.optionDays &&
      campaign.optionSchedule &&
      campaign.scheduleBegin &&
      campaign.scheduleEnd &&
      campaign.phoneNumber
    )
  ) {
    throw new Error(message.CAMPAIGN_IS_NOT_VALID);
  } else {
    const campaignOutput: CampaignOutput = {
      id: campaign.id,
      days: campaign.days,
      optionDays: campaign.optionDays,
      optionSchedule: campaign.optionSchedule,
      scheduleBegin: campaign.scheduleBegin,
      scheduleEnd: campaign.scheduleEnd,
      phoneNumber: campaign.phoneNumber,
      voicemail: [],
      state: campaign.state as CampaignState,
      shopId: campaign.shopId,
    };
    const voiceMailOutputs: VoiceMailOutput[] = [];
    let index = 1;
    for (const voicemail of campaign.voiceMails) {
      const media = await mediaRepository.findById(voicemail.mediaId);
      if (media && media.id) {
        const voiceMailOutput: VoiceMailOutput = {
          id: index,
          mediaId: media.id,
          file: media.file,
          ratio: voicemail.ratio,
        };
        voiceMailOutputs.push(voiceMailOutput);
        index++;
      } else {
        throw new Error(message.MEDIA_NOT_FOUND);
      }
    }
    campaignOutput.voicemail = voiceMailOutputs;
    return campaignOutput;
  }
}
