import React, { useMemo, useState } from 'react';
import { useI18n } from '@shopify/react-i18n';
import fr from '../translations/fr.json';
import CampaignSettingContext, {
  initialCampaignValue,
} from '../context/campaignSetting.context';
import Dashboard from './dashboard/Dashboard';
import OnBoarding from './onboarding/OnBoarding';
import { useAppQuery } from '../hooks';
import SkeletonLoading from './common/SkeletonLoading';
import { Frame } from '@shopify/polaris';
import Payment from './payments/Payment';

export default function Upvoice() {
  const [value, setValue] = useState(initialCampaignValue);
  const [i18n] = useI18n({
    id: 'Translations',
    fallback: fr,
    translations(locale) {
      return import(`../translations/${locale}.json`);
    },
  });
  const campaign = useMemo(
    () => ({ value, i18n, setValue }),
    [value, i18n, setValue]
  );
  const [loading, setLoading] = useState(true);

  const { data, isFetched } = useAppQuery({
    url: '/api/campaign/get',
    reactQueryOptions: {
      onSuccess: () => {
        console.log('Campaign is successfully fetched');
      },
      onError: e => {
        console.log({ e });
        setLoading(false);
      },
    },
  });

  if (isFetched && loading) {
    setLoading(true);
    const response = data.campaign;
    console.log({ response });
    console.log({ data });
    if (response && response.id) {
      setValue({ ...response, step: 7, saved: true });
    }
    setLoading(false);
  }

  useAppQuery({
    url: '/api/shop/add',
    reactQueryOptions: {
      onSuccess: () => {
        console.log('Shop is successfully saved');
      },
    },
  });

  return (
    <CampaignSettingContext.Provider value={campaign}>
      {
        (loading && <SkeletonLoading />)
        || (value.saved && <Dashboard />)
        || (<OnBoarding />)
      }
    </CampaignSettingContext.Provider>
  );
}
