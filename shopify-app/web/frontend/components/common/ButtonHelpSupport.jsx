import { Link } from '@shopify/polaris';
import React, { useContext } from 'react';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { supportMail } from '../../data';

export default function ButtonHelpSupport() {
  const { i18n } = useContext(CampaignSettingContext);

  return (
    <Link href={`mailto:${supportMail}`} url={`mailto:${supportMail}`}>
      {i18n.translate('stepOne.helpSupportButton')}
    </Link>
  );
}
