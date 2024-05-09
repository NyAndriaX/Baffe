import { Card, EmptyState } from '@shopify/polaris';
import React, { useContext, useEffect } from 'react';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { logo } from '../../assets';
import './welcome.css';
import { supportMail } from '../../data';
import ButtonHelpSupport from '../common/ButtonHelpSupport';

export default function ConfirmationCampaignLaunched() {
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
            action={{
              content: i18n.translate('launchingPage.analysis-action'),
              id: 'analysis-action',
              onAction: () => setValue({ ...value, step: 8 }),
            }}
            secondaryAction={{
              id: 'look-action',
              content: i18n.translate('launchingPage.settings-action'),
              onAction: () => setValue({ ...value, step: 7 }),
            }}
            image={logo}
          >
            <br />
            <p className="header-new">
              {i18n.translate('launchingPage.congratulation')}
            </p>
            <br />
            <p className="lign-content">
              {i18n.translate('launchingPage.lign-1')}
            </p>
          </EmptyState>
          <div className="support-link">
            <ButtonHelpSupport />
          </div>
        </div>
      </Card>
    </div>
  );
}
