import { Card, EmptyState } from '@shopify/polaris';
import React, { useContext, useEffect } from 'react';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { logo } from '../../assets';
import { supportMail } from '../../data';

export default function WelcomeOnBoarding() {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);

  useEffect(() => {
    const emptyStateElm = document.getElementById('start-campaign-action');
    emptyStateElm?.parentElement?.classList?.add('actions-container');
  }, []);

  return (
    <div className="ob-welcome">
      <Card sectioned>
        <div className="empty-state-container">
          <EmptyState
            heading={i18n.translate('welcome.heading')}
            action={{
              content: i18n.translate('welcome.start-campaign-action'),
              id: 'start-campaign-action',
              onAction: () => setValue({ ...value, step: 1 }),
            }}
            secondaryAction={{
              id: 'help-action',
              content: i18n.translate('welcome.help-action'),
              onAction: () => {
                window.location.href = `mailto:${supportMail}`;
              },
            }}
            image={logo}
          >
            <p>{i18n.translate('welcome.content')}</p>
          </EmptyState>
        </div>
      </Card>
    </div>
  );
}
