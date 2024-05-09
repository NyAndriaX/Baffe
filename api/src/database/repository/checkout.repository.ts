import { Prisma } from '@prisma/client';

import { Checkout, CheckoutInput, CheckoutVoicemailInput } from '../../typings';
import { Context, getContext } from '../context';

const ctx: Context = getContext();

export async function save(data: CheckoutInput): Promise<Checkout> {
  return ctx.prisma.checkout.create({
    data,
  });
}

export async function findByShopId(shopId: string): Promise<Checkout[]> {
  return ctx.prisma.checkout.findMany({
    where: { shopId },
  });
}

export async function findByShopIdAndState(
  shopId: string,
  state: string,
): Promise<Checkout[]> {
  return ctx.prisma.checkout.findMany({
    where: { shopId, state },
  });
}

export async function findByAbandonedCheckoutId(
  abandonedCheckoutId: number,
): Promise<Checkout | null> {
  return ctx.prisma.checkout.findUnique({
    where: { abandonedCheckoutId },
  });
}

export async function update(
  data: Partial<CheckoutInput> | Partial<CheckoutVoicemailInput>,
  id: string,
): Promise<Checkout> {
  return ctx.prisma.checkout.update({
    where: { id },
    data,
  });
}

export async function calcRecoverRevenueByShopId(shopId: string): Promise<Prisma.JsonObject> {
  return ctx.prisma.checkout.aggregateRaw({
    pipeline: [
      {
        $match: {
          'shopId': {$oid: shopId},
          'state': 'catchUp'
        }
      },
      {
        $group: {
          '_id': {
            'month': { $month: '$created_at' }, 
            'year': { $year: '$created_at' },
          }, 
          'totalPrice': { $sum: { $toDouble: '$totalPrice' } }, 
          'totalCatchupTime': {
            $sum: {
              $dateDiff: {
                startDate: '$voicemail_sent_at',
                endDate: '$updated_at',
                unit: 'second'
              }
            }
          },
          'count': { $sum: 1 }
        }
      },
      {
        $addFields: {
          'year_month': {
            $concat: [
              { $toString: '$_id.year' },
              '_',
              { $toString: '$_id.month' },
            ]
          }
        }
      },
    ],
  });
}

export async function calcBasketPercentByShopId(shopId: string): Promise<Prisma.JsonObject> {
  return ctx.prisma.checkout.aggregateRaw({
    pipeline: [
      {
        $match: {
          'shopId': {$oid: shopId}, 
        }
      },
      {
        $group: {
          '_id': {
            'month': { $month: '$created_at' }, 
            'year': { $year: '$created_at' },
            'state': '$state',
          },
          'count': { $sum: 1 }
        }
      },
      {
        $addFields: {
          'year_month': {
            $concat: [
              { $toString: '$_id.year' },
              '_',
              { $toString: '$_id.month' },
            ]
          },
          'state': '$_id.state',
        }
      },
    ],
  });
}

export async function calcMonthChartByShopId(shopId: string): Promise<Prisma.JsonObject> {
  return ctx.prisma.checkout.aggregateRaw({
    pipeline: [
      {
        $match: {
          'shopId': {$oid: shopId}, 
          'state': { $in: ['catchUp', 'voicemailSent'] }
        }
      },
      {
        $group: {
          '_id': {
            'month': { $month: '$created_at' }, 
            'year': { $year: '$created_at' },
            'state': '$state',
          },
          'count': { $sum: 1 }
        }
      },
      {
        $addFields: {
          'year_month': {
            $concat: [
              { $toString: '$_id.year' },
              '_',
              { $toString: '$_id.month' },
            ]
          },
          'state': '$_id.state',
        }
      },
    ],
  });
}
