import {LegacyCard} from '@shopify/polaris';
import React, { useContext, useState } from 'react';
import CampaignSettingContext from '../../../context/campaignSetting.context';
import { useAppQuery } from '../../../hooks';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function StackedChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const { i18n } = useContext(CampaignSettingContext);
    const [monthData, setMonthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const app = useAppBridge();
    const redirect = Redirect.create(app);

    const { data, isFetched } = useAppQuery({
        url: '/api/report/getMonthChart',
        reactQueryOptions: {
            onSuccess: () => {
                console.log('monthChart is successfully fetched');
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
            setMonthData(data);
        }
        setLoading(false);
    }

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        maintainAspectRatio: false,
    };

    let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    let labels = [];
    let dataset_recovered = [];
    let dataset_voicemail = [];
    Object.keys(monthData).sort(collator.compare).reduce(
        (_, key) => {
            labels.push(monthData[key].month);
            dataset_recovered.push(monthData[key].numRecovered);
            dataset_voicemail.push(monthData[key].numVoicemail); 
            return;
        }, 
        {}
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: i18n.translate('stackedChart.numberRecoveredCheckout'),
                data: dataset_recovered,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: i18n.translate('stackedChart.numberVoicemail'),
                data: dataset_voicemail,
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    };

    return (
        <div>
            <LegacyCard>
                <Bar height={400} options={chartOptions} data={chartData} />
            </LegacyCard>
        </div>
    );
}
