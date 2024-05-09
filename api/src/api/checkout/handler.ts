import { VoicemailInput } from './../../typings/voicemail';
import { message } from '../errors';
import * as shopRepository from '../../database/repository/shop.repository';
import * as checkoutRepository from '../../database/repository/checkout.repository';
import * as campaignRepository from '../../database/repository/campaign.repository';
import * as mediaRepository from '../../database/repository/media.repository';
import {
  AbandonedCheckoutRequest,
  Checkout,
  CheckoutInput,
  CheckoutState,
  CheckoutToCatchUpResult,
} from './../../typings/checkout';
import * as voicemailService from '../../services/voicemail.service';

function stripPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export async function handleSendAndSaveOrUpdateAbandonedCheckout(
  shopName: string,
  data: AbandonedCheckoutRequest,
): Promise<void> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const campaign = await campaignRepository.findCampaignActiveByShopId(
      shop.id,
    );
    if (campaign) {
      const checkoutInDB = await checkoutRepository.findByAbandonedCheckoutId(
        data.abandonedCheckoutId,
      );
      if (!checkoutInDB) {
        const checkoutInput: CheckoutInput = {
          ...data,
          shopId: shop.id,
          state: CheckoutState.ABANDONED,
        };
        const checkout = await checkoutRepository.save(checkoutInput);
        if (checkout && checkout.id) {
          campaign.voiceMails.forEach(async (el) => {
            const voiceMail = await mediaRepository.findById(el.mediaId);
            if (voiceMail && voiceMail.url) {
              const callerID = campaign.phoneNumber || '33000000000';
              await sendCampaign({
                campaignName: `${data.name.replace(/^#/, '')}_${shop.id}`,
                phone: stripPhoneNumber(data.customer.phone),
                url: voiceMail.url,
                checkoutId: checkout.id,
                callerPhone: stripPhoneNumber(callerID),
                country: data.customer.country,
              });
            } else {
              throw new Error(message.MEDIA_NOT_FOUND);
            }
          });
        } else {
          console.error(message.ERROR_CREATE, checkoutInput);
        }
      }
    } else {
      throw new Error(message.CAMPAIGN_NOT_FOUND);
    }
  } else {
    throw new Error(message.SHOP_NOT_FOUND);
  }
}

export async function handleUpdateCheckoutToCatchUp(
  checkoutId: number,
  shopName: string,
): Promise<CheckoutToCatchUpResult> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    const checkout = await checkoutRepository.findByAbandonedCheckoutId(
      checkoutId,
    );
    let out: CheckoutToCatchUpResult = {
      id: checkoutId.toString(),
      status: 'failed',
      total_price: '0.0',
      currency: 'EUR',
    };

    if (checkout) {
      if (checkout.state === CheckoutState.VOICEMAIL_SENT) {
        const result = await checkoutRepository.update(
          { state: CheckoutState.CATCH_UP },
          checkout.id,
        );
        if (result) {
          out = {
            id: result.abandonedCheckoutId.toString(),
            status: CheckoutState.CATCH_UP,
            total_price: result.subtotalPrice,
            currency: result.currency,
          };
        }
      } else if (checkout.state === CheckoutState.ABANDONED) {
        const result = await checkoutRepository.update(
          { state: CheckoutState.PAID_WITHOUT_BEING_CATCH_UP },
          checkout.id,
        );
        if (result) {
          out = {
            id: result.abandonedCheckoutId.toString(),
            status: CheckoutState.PAID_WITHOUT_BEING_CATCH_UP,
            total_price: result.subtotalPrice,
            currency: result.currency,
          };
        }
      }
    }

    return out;
  } else {
    throw new Error(message.SHOP_NOT_FOUND);
  }
}

export async function handleGetCheckoutsByShop(
  shopName: string,
): Promise<Checkout[]> {
  const shop = await shopRepository.findByName(shopName);
  if (shop && shop.id) {
    return checkoutRepository.findByShopId(shop.id);
  }
  throw new Error(message.SHOP_NOT_FOUND);
}

export async function sendCampaign(param: VoicemailInput): Promise<void> {
  const response = await voicemailService.sendVoicemailBySlybroadcast(param);
  if (response) {
    console.log('sendCampaign success', param);
    await checkoutRepository.update(
      {
        state: CheckoutState.VOICEMAIL_SENT,
        voicemail_sent_at: new Date(),
      },
      param.checkoutId,
    );
  } else {
    console.error('sendCampaign error', param);
  }
}
