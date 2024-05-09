import { VoicemailInput } from './../typings/voicemail';
import axios from 'axios';
import FormData from 'form-data';
import config from '../config/config';

export async function sendVoicemailBySlybroadcast(
  param: VoicemailInput,
): Promise<boolean> {
  const { campaignName, callerPhone, phone, url, country } = param;

  // Slybroadcast international is currently available in the following countries: Australia, Austria, Belgium, Denmark, England, Finland, France, Germany, Ireland, the Netherlands, Norway, Spain, Sweden and Switzerland
  // https://www.slybroadcast.com/international/docglobal.php
  let targetURL = config.mobilesphereUrl;
  let targetUid = config.mobilesphereUid;
  let targetPass = config.mobilespherePassword;

  // Slybroadcast can send voicemails to U.S. and Canadian mobile numbers and select landline phones
  // https://www.slybroadcast.com/documentation.php
  if(country === 'United States') {
    targetURL = config.slybroadcastUrl;
    targetUid = config.slybroadcastUid;
    targetPass = config.slybroadcastPassword;
  }

  const formData = new FormData();
  formData.append('c_method', 'new_campaign');
  formData.append('c_uid', targetUid);
  formData.append('c_password', targetPass);
  formData.append('c_title', campaignName);
  formData.append('c_callerID', callerPhone);
  formData.append('c_phone', phone);
  // formData.append('c_record_audio', 'record-one');
  formData.append('c_url', url);
  formData.append('c_audio', 'mp3');
  formData.append('c_date', 'now');
  formData.append('mobile_only', '1');

  const axiosConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: targetURL,
    data: formData,
  };

  try {
    const { data } = await axios(axiosConfig);
    console.log('Slybroadcast response: ', data);
    return (data && data.new_campaign && data.new_campaign === 'OK') || false;
  } catch (e) {
    console.log('Slybroadcast error: ', e);
    return false;
  }
}
