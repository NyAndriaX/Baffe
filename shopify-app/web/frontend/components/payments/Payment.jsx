import {
  Button,
  Collapsible,
  TextContainer,
  Card,
  LegacyStack,
} from '@shopify/polaris';
import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import check from '../../assets/images/check.png';
import up from '../../assets/images/up.png';
import down from '../../assets/images/down.png';
import { PaymentStyledDiv } from './Payment.styled';
import CampaignSettingContext from '../../context/campaignSetting.context';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
import { useNavigate } from '@shopify/app-bridge-react';

export default function Payment() {
  const { i18n } = useContext(CampaignSettingContext);
  const [open, setOpen] = useState(true);
  const handleToggle = useCallback(() => setOpen(open => !open), []);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const GetConfirmationUrl = async () => {
    try {
      const response = await fetch('/api/initBilling', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const goToBilling = async () => {
    const response = await GetConfirmationUrl();
    const confirmationUrl =
      response.body.data.appSubscriptionCreate.confirmationUrl;
    navigate(confirmationUrl);
  };

  return (
    <PaymentStyledDiv>
      <div>
        <center>
          <p className="rate">{i18n.translate('payment.rate')}</p>
          <br />
          <p className="textHeader centerText">
            {i18n.translate('payment.textHeader')}
          </p>
          <br />
          <p className="textSecond centerText">
            {i18n.translate('payment.textSecond')}
          </p>
        </center>
        <StyledDiv>
          <Card>
            <Card.Section>
              <div>
                <p className="textCardHeader">
                  {i18n.translate('payment.textCardHeader')}
                </p>
                <Button id="textSupport">
                  {i18n.translate('payment.textSupport')}
                </Button>
              </div>
              <p className="textPrice">{i18n.translate('payment.textPrice')}</p>
              <br /> <p id="text0">{i18n.translate('payment.text0')}</p>
              <div>
                <div id="checkImg">
                  <img src={check} className="check" />
                  <img src={check} className="check" />
                  <img src={check} className="check" />
                  <img src={check} className="check" />
                  <img src={check} className="check" />
                </div>
                <div id="checkText">
                  <p id="text0">{i18n.translate('payment.text1')}</p>
                  <p id="text0">{i18n.translate('payment.text2')}</p>
                  <p id="text0">{i18n.translate('payment.text3')}</p>
                  <p id="text0">{i18n.translate('payment.text4')}</p>
                  <p id="text0">{i18n.translate('payment.text5')}</p>
                </div>
              </div>
              <br />
              <center>
                {' '}
                <Button id="textSubmit" onClick={goToBilling}>
                  {i18n.translate('payment.textSubmit')}
                </Button>
              </center>
              <br />
            </Card.Section>
          </Card>
        </StyledDiv>
        <center>
          <div id="faqBody">
            <p id="faq">{i18n.translate('payment.faq')}</p>
            <br />
            <p id="faqSecond">{i18n.translate('payment.faqSecond')}</p>
            <br />
          </div>
          <div id="card2">
            <LegacyStack vertical>
              <div>
                <p id="card2Header">{i18n.translate('payment.card2Header')}</p>
                <div id="btnUpland" onClick={handleToggle}>
                  <img id="btnUp" src={`${open ? up : down}`} />
                </div>
              </div>
              <Collapsible
                open={open}
                id="basic-collapsible"
                transition={{
                  duration: '500ms',
                  timingFunction: 'ease-in-out',
                }}
                expandOnPrint
              >
                <TextContainer>
                  <p id="card2Second">
                    {i18n.translate('payment.card2Second')}
                  </p>
                </TextContainer>
              </Collapsible>
            </LegacyStack>
          </div>
        </center>
      </div>
    </PaymentStyledDiv>
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
    padding-top: 5%;
    padding-right: 5%;
    padding-left: 5%;
    padding-bottom: 0%;

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
