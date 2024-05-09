import {
    Page,
    IndexTable,
    Layout,
    LegacyCard,
    useIndexResourceState,
    Badge,
    EmptySearchResult,
    Link,
    Grid,
} from '@shopify/polaris';
import React, { useContext, useState } from 'react';
import CampaignSettingContext from '../../../context/campaignSetting.context';
import { useAppQuery } from '../../../hooks';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { BsArrowUpRight } from 'react-icons/bs';
import './style.css';

export default function SummaryBlock() {
    const { i18n } = useContext(CampaignSettingContext);
    const [summaryData, setSummaryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const app = useAppBridge();
    const redirect = Redirect.create(app);

    const { data, isFetched } = useAppQuery({
        url: '/api/report/getSummary',
        reactQueryOptions: {
            onSuccess: () => {
                console.log('summaryData is successfully fetched');
            },
            onError: e => {
                console.log({ e });
                setLoading(false);
            },
        },
    });

    if (isFetched && loading) {
        setLoading(true);
        if (data) {
            setSummaryData(data);
        }
        setLoading(false);
    }

    return (
        <Page fullWidth>
            <h1 id='text1Header'>{i18n.translate('summaryBlock.chat')}</h1>
            <Layout>
                <Layout.Section oneThird>
                    <div className="summary-item">
                        <h2 className="text1"> {i18n.translate('summaryBlock.total')}</h2>
                        <h1 className="text2"> {summaryData.total}</h1>
                        <h2 className="text3">{i18n.translate('summaryBlock.month')}</h2>
                        <h2 className="text4">{summaryData.totalMonth} <BsArrowUpRight id='arrow'/></h2>
                    </div>
                </Layout.Section>
                <Layout.Section oneThird>
                    <div className="summary-item">
                        <h2 className="text1"> {i18n.translate('summaryBlock.basketCatchesUp')}</h2>
                        <h1 className="text2"> {summaryData.basketPercent}</h1>
                        <h2 className="text3">{i18n.translate('summaryBlock.month')}</h2>
                        <h2 className="text4"> {summaryData.basketMonthPercent} <BsArrowUpRight className='arrow'/></h2>
                    </div>
                </Layout.Section>
                <Layout.Section oneThird>
                    <div className="summary-item">
                        <h2 className="text1"> {i18n.translate('summaryBlock.catchUPtime')}</h2>
                        <h1 className="text2">{summaryData.catchUpTime}</h1>
                        <h2 className="text3">{i18n.translate('summaryBlock.month')}</h2>
                        <h2 className="text4">{summaryData.catchUpTimeMonth} <BsArrowUpRight id='arrow'/></h2>
                    </div>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
