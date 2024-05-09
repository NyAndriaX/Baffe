import { Card, TextContainer, Text, Image } from '@shopify/polaris';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { logo as logoUpvoice } from '../../assets';
import CampaignSettingContext from '../../context/campaignSetting.context';
import ChoiceOfDepositFrequency from '../common/ChoiceOfDepositFrequency';
import FooterStep from '../common/FooterStep';

export default function ChoiceOfDepositFrequencyStep() {
  const { i18n } = useContext(CampaignSettingContext);
  return (
    <StyledDiv className="ob-card-container">
      <Card>
        <Card.Section>
          <div className="ob-leading-card-section">
            <Image source={logoUpvoice} width={161} height={65} />
            <TextContainer>
              <Text
                as="span"
                color="subdued"
                variant="bodyMd"
                fontWeight="regular"
              >
                {i18n.translate('stepOne.introduction')}
              </Text>
            </TextContainer>
            <TextContainer>
              <Text variant="headingMd" as="h2">
                {i18n.translate('stepOne.title')}
              </Text>
              <p className="stepOne__description">
                {i18n.translate('stepOne.description')}
              </p>
            </TextContainer>
          </div>
          <ChoiceOfDepositFrequency />
          <FooterStep stepNext={2} />
        </Card.Section>
      </Card>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  .Polaris-Card {
    width: 38.5rem;
    padding: 1rem 0.5rem;
    .Polaris-Card__Section {
      .ob-leading-card-section {
        .Polaris-TextContainer:first-of-type {
          margin-bottom: 2.75rem;
        }
        .Polaris-TextContainer:last-of-type {
          margin-bottom: 2.25rem;
        }
      }
    }
  }
`;