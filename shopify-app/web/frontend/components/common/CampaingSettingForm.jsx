import { Stack, Text, TextContainer, Divider } from '@shopify/polaris';
import React, { useContext } from 'react';
import ABTestingRatios from './ABTestingRatios';
import CallbackNumber from './CallbackNumber';
import ChoiceOfDepositFrequency from './ChoiceOfDepositFrequency';
import CampaignSettingContext from '../../context/campaignSetting.context';
import styled from 'styled-components';

export default function CampaignSettingForm() {
  const { i18n } = useContext(CampaignSettingContext);
  const styles = {
    container: {
      flex: 1,
    },
  };
  return (
    <StyledDiv>
      <Stack spacing="loose" vertical styles={styles.container}>
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="medium">
            {i18n.translate('campaign.titleFrequencyOfDeposit')}
          </Text>
          <Divider borderStyle="base" />
        </TextContainer>
        <ChoiceOfDepositFrequency />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="medium">
            {i18n.translate('campaign.titleAudioFile')}
          </Text>
          <Divider borderStyle="base" />
        </TextContainer>
        <ABTestingRatios />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="medium">
            {i18n.translate('campaign.titleCallNumber')}
          </Text>
          <Divider borderStyle="base" />
          <p>{i18n.translate('campaign.descriptionCallNumber')}</p>
        </TextContainer>
        <CallbackNumber />
      </Stack>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 2.5rem auto 0.5rem;
`;
