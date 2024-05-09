import React, { useContext, useState } from 'react';
import { Button, ButtonGroup, Spinner } from '@shopify/polaris';
import styled from 'styled-components';
import CommonModal from '../common/CommonModal';
import CampaignSettingContext, {
  StateType,
  initialCampaignValue,
} from '../../context/campaignSetting.context';

export default function FooterDashboard({
  PutUpdateCampaignSetting,
  DeleteCampaignSetting,
}) {
  const { value, setValue, i18n } = useContext(CampaignSettingContext);
  const [optionModal, setOptionModal] = useState({
    open: false,
    title: null,
    content: null,
    buttonLabel: null,
  });
  const [status, setStatus] = useState(null);
  const [activateRuning, setActivateRuning] = useState(false);
  const [saveRuning, setSaveRuning] = useState(false);
  const [pauseRuning, setPauseRuning] = useState(false);
  const [deleteRuning, setDeleteRuning] = useState(false);

  const handleUpdateCampaignSetting = async statusValue => {
    setSaveRuning(true);
    const isUpdated = await PutUpdateCampaignSetting(statusValue);
    if (isUpdated) {
      setValue({ ...value, confirmUpdate: true, dismiss: false });
    }
    setSaveRuning(false);
  };

  const handlePauseTheCampaign = () => {
    setPauseRuning(true);
    setStatus(StateType.PAUSE);
    setOptionModal({
      open: true,
      title: i18n.translate('dashboard.confirmationTitlePause'),
      content: i18n.translate('dashboard.confirmationContentPause'),
      buttonLabel: i18n.translate('dashboard.confirmationButtonPause'),
    });
    setPauseRuning(false);
  };

  const handleDeleteTheCampaign = () => {
    setDeleteRuning(true);
    setOptionModal({
      open: true,
      title: i18n.translate('dashboard.confirmationTitleDelete'),
      content: i18n.translate('dashboard.confirmationContentDelete'),
      buttonLabel: i18n.translate('dashboard.confirmationButtonDelete'),
    });
    setDeleteRuning(false);
  };

  const handleActivateTheCampaign = async () => {
    setActivateRuning(true);
    const isUpdated = await PutUpdateCampaignSetting(StateType.ACTIVE);
    if (isUpdated) {
      setValue({ ...value, state: StateType.ACTIVE, dismiss: false, confirmUpdate: false });
      setStatus(null);
    }
    setActivateRuning(false);
  };

  const handleAction = async () => {
    setOptionModal({
      ...optionModal,
      buttonLabel: i18n.translate('information.pleaseWait'),
    });
    if (status === StateType.PAUSE) {
      const isUpdated = await PutUpdateCampaignSetting(StateType.PAUSE);
      if (isUpdated) {
        setValue({ ...value, state: StateType.PAUSE });
        setStatus(null);
      }
      setOptionModal({
        ...optionModal,
        buttonLabel: i18n.translate('dashboard.confirmationButtonPause'),
      });
    } else {
      const isDeleted = await DeleteCampaignSetting();
      if (isDeleted) {
        setStatus(null);
        setValue(initialCampaignValue);
      }
      setOptionModal({
        ...optionModal,
        buttonLabel: i18n.translate('dashboard.confirmationButtonDelete'),
      });
    }
  };

  return (
    <StyledDiv>
      <Button primary onClick={() => handleUpdateCampaignSetting(value.state)}>
        {saveRuning ? (
          <Spinner size="small" />
        ) : (
          i18n.translate('global.register')
        )}
      </Button>
      <CommonModal
        optionModal={optionModal}
        setOptionModal={setOptionModal}
        handleAction={handleAction}
      />
      <ButtonGroup>
        {value.state === StateType.PAUSE ? (
          <Button primary onClick={handleActivateTheCampaign}>
            {activateRuning ? (
              <Spinner size="small" />
            ) : (
              i18n.translate('settings.pauseAction')
            )}
          </Button>
        ) : (
          <Button outline destructive onClick={handlePauseTheCampaign}>
            {pauseRuning ? (
              <Spinner size="small" />
            ) : (
              i18n.translate('dashboard.pauseCampaign')
            )}
          </Button>
        )}
        <Button outline destructive onClick={handleDeleteTheCampaign}>
          {deleteRuning ? (
            <Spinner size="small" />
          ) : (
            i18n.translate('dashboard.deleteCampaign')
          )}
        </Button>
      </ButtonGroup>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 25px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .Polaris-ButtonGroup {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`;
