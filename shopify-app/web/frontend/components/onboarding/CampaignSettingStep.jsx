import React, { useContext, useState } from 'react';
import {
  Banner,
  Button,
  ButtonGroup,
  Card,
  Spinner,
  Text,
  TextContainer,
  Toast,
} from '@shopify/polaris';
import styled from 'styled-components';
import CampaignSettingContext, {
  StateType,
} from '../../context/campaignSetting.context';
import CampaignSettingForm from '../common/CampaingSettingForm';
import ButtonHelpSupport from '../common/ButtonHelpSupport';
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';

export default function CampaignSettingStep() {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);
  const [error, setError] = useState(false);
  const [saveRuning, setSaveRuning] = useState(false);
  const [launchCampaignRuning, setLaunchCampaignRuning] = useState(false);

  const fetch = useAuthenticatedFetch();

  const PostCampaignSetting = async state => {
    const voiceMails = value.voicemail.map(el => ({
      mediaId: el.mediaId,
      ratio: el.ratio,
    }));
    const {
      days,
      optionDays,
      optionSchedule,
      phoneNumber,
      scheduleBegin,
      scheduleEnd,
    } = value;
    const data = {
      state,
      days,
      optionDays,
      optionSchedule,
      phoneNumber,
      scheduleBegin,
      scheduleEnd,
      voiceMails,
    };
    const res = await fetch('/api/campaign/save', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res && res.status === 200;
  };

  const handleSaveCampaignSetting = async state => {
    setLaunchCampaignRuning(state);
    setSaveRuning(!state);
    const isSaved = await PostCampaignSetting(
      state ? StateType.ACTIVE : StateType.PAUSE
    );
    setLaunchCampaignRuning(false);
    setSaveRuning(false);
    if (isSaved) {
      setValue({
        ...value,
        status: state ? StateType.ACTIVE : StateType.PAUSE,
        step: state ? 6 : 7,
      });
    } else {
      setError(true);
    }
  };

  const toastError = error ? (
    <Toast content="Server error" error onDismiss={() => setError(false)} />
  ) : null;

  return (
    <StyledDiv>
      <Card>
        <Card.Section>
          {error && (
            <Banner
              title={i18n.translate('global.errorTitle')}
              state="critical"
              onDismiss={() => setError(false)}
            >
              <p>{i18n.translate('global.errorInformation')}</p>
            </Banner>
          )}
          <TextContainer>
            <Text variant="headingMd" as="h2">
              {i18n.translate('stepFive.title')}
            </Text>
            <p className="description">
              {i18n.translate('stepFive.description')}
            </p>
          </TextContainer>
          <CampaignSettingForm />
          {toastError}
        </Card.Section>
        <div className="btn-group__footer">
          <ButtonHelpSupport />
          <ButtonGroup>
            <Button
              onClick={() => handleSaveCampaignSetting(false)}
              disabled={launchCampaignRuning}
            >
              {saveRuning ? (
                <Spinner size="small" />
              ) : (
                i18n.translate('global.save')
              )}
            </Button>
            <Button
              primary
              onClick={() => handleSaveCampaignSetting(true)}
              disabled={saveRuning}
            >
              {launchCampaignRuning ? (
                <Spinner size="small" />
              ) : (
                i18n.translate('stepFive.launchCampaign')
              )}
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .Polaris-Card {
    width: 45.5rem;
    margin: 2rem auto;
    padding: 1rem 0.5rem;

    .Polaris-Card__Section {
      .Polaris-TextContainer {
        p.description {
          color: #6d7175;
        }
      }
    }

    .btn-group__footer {
      display: flex;
      padding: 0 1.25rem;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 792px) {
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  }
`;
