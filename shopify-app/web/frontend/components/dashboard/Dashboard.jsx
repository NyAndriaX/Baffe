import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Card, Tabs, Image, Frame } from '@shopify/polaris';
import styled from 'styled-components';
import Settings from './Settings';
import AnalysisAndFeedback from './AnalysisAndFeedback';
import FooterDashboard from './FooterDashboard';
import { logo } from '../../assets';
import ButtonHelpSupport from '../common/ButtonHelpSupport';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';

export default function Dashboard() {
  const { i18n, value } = useContext(CampaignSettingContext);
  const [selected, setSelected] = useState(0);
  const fetch = useAuthenticatedFetch();
  const handleTabChange = useCallback(selectedTabIndex => {
    setSelected(selectedTabIndex);
  }, []);

  useEffect(() => {
    if (value.step === 7) {
      setSelected(0);
    } else if (value.step === 8) {
      setSelected(1);
    }
  }, [value.step]);

  const tabs = [
    {
      id: 'id-tab-settings',
      content: i18n.translate('dashboard.titleTabSettings'),
    },
    {
      id: 'id-tab-analysis-and-feedback',
      content: i18n.translate('dashboard.titleAnalysisAndFeedback'),
    },
  ];

  const PutUpdateCampaignSetting = async state => {
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
    const res = await fetch('/api/campaign/update', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return res && res.status === 200;
  };

  const DeleteCampaignSetting = async () => {
    const res = await fetch('/api/campaign/delete', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    return res && res.status === 200;
  };

  return (
    <Frame>
      <StyledDiv>
        <Card>
          <Card.Section>
            <Image source={logo} height={50} />
            <ButtonHelpSupport />
          </Card.Section>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <Card.Section>
              {selected === 0 ? (
                <Settings PutUpdateCampaignSetting={PutUpdateCampaignSetting} />
              ) : (
                <AnalysisAndFeedback />
              )}
            </Card.Section>
          </Tabs>
        </Card>
        <FooterDashboard
          PutUpdateCampaignSetting={PutUpdateCampaignSetting}
          DeleteCampaignSetting={DeleteCampaignSetting}
        />
      </StyledDiv>
    </Frame>
  );
}

const StyledDiv = styled.div`
  .Polaris-Card {
    padding: 1rem 0.5rem;

    .Polaris-Card__Section:first-of-type {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 576px) {
        flex-direction: column;
      }
    }

    .Polaris-Card__Section:last-of-type {
      flex-direction: row;
    }
  }
`;
