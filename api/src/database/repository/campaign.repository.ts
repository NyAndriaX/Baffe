import { Campaign, CampaignInput, CampaignState } from '../../typings';
import { Context, getContext } from '../context';

const ctx: Context = getContext();

export async function save(data: CampaignInput): Promise<Campaign> {
  return ctx.prisma.campaign.create({
    data,
  });
}

export async function findByShopId(shopId: string): Promise<Campaign | null> {
  return ctx.prisma.campaign.findUnique({
    where: { shopId },
  });
}

export async function update(
  data: CampaignInput,
  shopId: string,
): Promise<Campaign> {
  return ctx.prisma.campaign.update({
    where: { shopId },
    data,
  });
}

export async function deleteByShopId(shopId: string): Promise<Campaign> {
  return ctx.prisma.campaign.delete({
    where: { shopId },
  });
}

export async function findByState(state: string): Promise<Campaign[]> {
  return ctx.prisma.campaign.findMany({
    where: { state },
  });
}

export async function findCampaignActiveByShopId(
  shopId: string,
): Promise<Campaign | null> {
  const result = await ctx.prisma.campaign.findMany({
    where: { state: CampaignState.ACTIVE, shopId },
  });
  return result && result.length ? result[0] : null;
}
