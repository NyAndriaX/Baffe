import { Card, Stack, Text, TextContainer } from '@shopify/polaris';
import React, { useContext } from 'react';
import styled from 'styled-components';
import ABTestingRatios from '../common/ABTestingRatios';
import FooterStep from '../common/FooterStep';
import CampaignSettingContext from '../../context/campaignSetting.context';

export default function ABTestingRatiosStep() {
  const { i18n } = useContext(CampaignSettingContext);

  return (
    <StyledDiv>
      <Card>
        <Card.Section>
          <Stack spacing="loose" vertical>
            <TextContainer>
              <Text variant="headingMd" as="h2">
                {i18n.translate('stepThree.title')}
              </Text>
              <p className="description">
                {i18n.translate('stepThree.description')}
              </p>
            </TextContainer>
          </Stack>
          <ABTestingRatios />
          <FooterStep stepNext={4} hasPrevious stepPrevious={2} />
        </Card.Section>
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
    width: 38.5rem;
    margin-top: 2rem;
    padding: 1rem 0.5rem;

    .Polaris-Card__Section {
      .Polaris-Stack {
        .Polaris-Stack__Item {
          .Polaris-TextContainer {
            p.description {
              color: #6d7175;
              margin-bottom: 2rem;
            }
          }
        }
      }
    }
  }
`;
