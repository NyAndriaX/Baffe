import { Banner } from '@shopify/polaris';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CampaignSettingForm from '../common/CampaingSettingForm';
import CampaignSettingContext, {
  StateType,
} from '../../context/campaignSetting.context';
import { supportMail } from '../../data';

export default function Settings({ PutUpdateCampaignSetting }) {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);
  const [activateRunning, setActivateRunning] = useState(false);

  const handleActivateTheCampaign = async () => {
    setActivateRunning(true);
    const isUpdated = await PutUpdateCampaignSetting(StateType.ACTIVE);
    if (isUpdated) {
      setValue({ ...value, state: StateType.ACTIVE, dismiss: false, confirmUpdate: false });
    }
    setActivateRunning(false);
  };

  return (
    <StyledDiv>
      {value.state === StateType.PAUSE && (
        <Banner
          title={i18n.translate('settings.pauseTitle')}
          status="warning"
          action={{
            content: activateRunning
              ? i18n.translate('information.pleaseWait')
              : i18n.translate('settings.pauseAction'),
            onAction: () => handleActivateTheCampaign(),
          }}
          secondaryAction={{
            content: i18n.translate('settings.pauseHelpAction'),
            url: `mailto:${supportMail}`,
          }}
          onDismiss={() => {
            s(true);
          }}
        >
          <p>{i18n.translate('settings.pauseContent')}</p>
        </Banner>
      )}
      {/* {value.state === StateType.ACTIVE && !value.dismiss && (
        <StyleBannerCenter>
          <Banner
            title={i18n.translate('settings.activateTitle')}
            status="success"
            action={{
              content: i18n.translate('global.close'),
              onAction: () => setValue({ ...value, dismiss: true, confirmUpdate: false }),
            }}
            onDismiss={() => setValue({ ...value, dismiss: true, confirmUpdate: false })}
          >
            <p>{i18n.translate('settings.activateContent')}</p>
          </Banner>
        </StyleBannerCenter>
      )} */}
      {value.confirmUpdate && (
        <StyleBannerCenter>
          <Banner
            title={i18n.translate('settings.updateConfirmTitle')}
            status="success"
            action={{
              content: i18n.translate('global.close'),
              onAction: () => setValue({ ...value, confirmUpdate: false, dismiss: false }),
            }}
            onDismiss={() => setValue({ ...value, confirmUpdate: false, dismiss: false })}
          >
            <p>{i18n.translate('settings.updateConfirmContent')}</p>
          </Banner>
        </StyleBannerCenter>
      )}
      <CampaignSettingForm />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 40.5rem;
`;

const StyleBannerCenter = styled.div`
  position: absolute;
  height: 200px;
  z-index: 7777;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;
