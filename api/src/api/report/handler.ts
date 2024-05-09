import { VoicemailInput } from './../../typings/voicemail';
import { message } from '../errors';
import * as shopRepository from '../../database/repository/shop.repository';
import * as checkoutRepository from '../../database/repository/checkout.repository';
import {Checkout, CheckoutState} from './../../typings/checkout';

export async function handleGetSummaryByShop(shopName: string,) {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const today = new Date();
    const current_year_month = `${today.getFullYear()}_${today.getMonth() + 1}`;

    const tmp1 = await checkoutRepository.calcRecoverRevenueByShopId(shop.id);
    const recoverRevenueData = JSON.parse(JSON.stringify(tmp1));

    let totalMonthRevenue = 0;
    let totalRevenue = 0;
    let totalMonthCatchupTime = 0;
    let totalCatchupTime = 0;

    for (const item of recoverRevenueData) {
      totalRevenue += item.totalPrice;
      totalCatchupTime += item.totalCatchupTime;
      if (item.year_month == current_year_month) {
        totalMonthRevenue = item.totalPrice;
        totalMonthCatchupTime += item.totalCatchupTime;
      }
    }

    const tmp2 = await checkoutRepository.calcBasketPercentByShopId(shop.id);
    const basketData = JSON.parse(JSON.stringify(tmp2));

    let totalBasket = 0;
    let totalBasketRecover = 0;
    let totalMonthBasket = 0;
    let totalMonthBasketRecover = 0;
    let basketPercent = 0.0;
    let basketMonthPercent = 0.0;

    for (const item of basketData) {
      totalBasket += item.count;

      if (item.state == CheckoutState.CATCH_UP) {
        totalBasketRecover += item.count;
      }

      if (item.year_month == current_year_month) {
        totalMonthBasket += item.count;
        if (item.state == CheckoutState.CATCH_UP) {
          totalMonthBasketRecover += item.count;
        }
      }
    }

    if (totalBasket > 0) {
      basketPercent = totalBasketRecover / totalBasket * 100;
    }
    if (totalMonthBasket > 0) {
      basketMonthPercent = totalMonthBasketRecover / totalMonthBasket * 100;
    }

    return {
        total: `${totalRevenue}€`,
        totalMonth: `${totalMonthRevenue}€`,
        basketPercent: `${basketPercent.toFixed(2)}%`,
        basketMonthPercent: `${basketMonthPercent.toFixed(2)}%`,
        catchUpTime: `${(totalCatchupTime / 3600).toFixed(2)}h`,
        catchUpTimeMonth: `${(totalMonthCatchupTime / 3600).toFixed(2)}h`,
    };
  }

  throw new Error(message.SHOP_NOT_FOUND);
}

const checkIfKeyExist = (objectName: { [x: string]: any; }, keyName: string) => {
  const keyExist = Object.keys(objectName).some(key => key === keyName);
  return keyExist;
};

export async function handleGetMonthChartByShop(shopName: string,) {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
      const tmp = await checkoutRepository.calcMonthChartByShopId(shop.id);
      const data = JSON.parse(JSON.stringify(tmp));

      const chartData:{[key:string]:any} = {};

      for (const item of data) {
        if (!checkIfKeyExist(chartData, item.year_month)) {
          chartData[item.year_month] = {
            month: item._id.month,
            year: item._id.year,
            numRecovered: 0,
            numVoicemail: 0,
          };
        }

        chartData[item.year_month].numVoicemail += item.count;
        if (item._id.state == CheckoutState.CATCH_UP) {
          chartData[item.year_month].numRecovered += item.count;
        }
      }

      return chartData;
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

export async function handleGetCheckoutsByShop(shopName: string,): Promise<Checkout[]> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    return checkoutRepository.findByShopId(shop.id);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}
