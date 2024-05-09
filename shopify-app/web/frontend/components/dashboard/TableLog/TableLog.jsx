import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Pagination,
  Badge,
  EmptySearchResult,
  Link,
} from '@shopify/polaris';
import React, { useContext, useState } from 'react';
import CampaignSettingContext from '../../../context/campaignSetting.context';
import { useAppQuery } from '../../../hooks';
import moment from 'moment';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

export default function TableLog() {
  const { i18n } = useContext(CampaignSettingContext);
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const { data, isFetched } = useAppQuery({
    url: '/api/checkout/getCheckouts',
    reactQueryOptions: {
      onSuccess: () => {
        console.log('Checkouts is successfully fetched');
      },
      onError: e => {
        console.log({ e });
        setLoading(false);
      },
    },
  });

  const resourceName = {
    singular: i18n.translate('tableLog.header'),
    plural: i18n.translate('tableLog.header'),
  };

  if (isFetched && loading) {
    setLoading(true);
    const response = data.checkouts;
    if (response && response.length) {
      setCheckouts(response);
    }
    setLoading(false);
  }

  function getBadgeStatus(state) {
    if (state === 'abandoned') return 'attention';
    else if (state === 'catchUp') return 'success';
    else if (state === 'voicemailSent') return 'info';
    else if (state === 'paidWithoutBeingCatchUp') return 'Payée';
    return '';
  }

  function goTo(path) {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path,
      newContext: true,
    });
  }

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(checkouts);
  const rowMarkup = checkouts.map(
    (
      {
        id,
        created_at,
        abandonedCheckoutId,
        state,
        totalLineItemsPrice,
        currency,
        customer,
      },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{moment(created_at).calendar()}</IndexTable.Cell>
        <IndexTable.Cell>
          <Link
            onClick={() => goTo(`/customers/${customer.id}`)}
            dataPrimaryLink
          >
            {customer.firstName} {customer.lastName}
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge status={getBadgeStatus(state)}>
            {i18n.translate(`checkouts.${state}`)}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{customer.phone}</IndexTable.Cell>
        <IndexTable.Cell>
          {(state === 'abandoned' || state === 'voicemailSent') && (
            <Link
              dataPrimaryLink
              onClick={() => goTo(`/checkouts/${abandonedCheckoutId}`)}
            >
              #{abandonedCheckoutId}
            </Link>
          )}
          {(state === 'catchUp' || state === 'paidWithoutBeingCatchUp') && (
            <Link
              onClick={() => goTo(`/checkouts/${abandonedCheckoutId}`)}
              dataPrimaryLink
            >
              #{abandonedCheckoutId}
            </Link>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {totalLineItemsPrice} {currency}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const emptyStateMarkup = (
    <EmptySearchResult
      title={i18n.translate('tableLog.emptyTitle')}
      description=""
      withIllustration
    />
  );

  return (
    <div>
      <h1 id="text1footer">{i18n.translate('tableLog.header')}</h1>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={checkouts.length}
          emptyState={emptyStateMarkup}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Date' },
            { title: 'Client' },
            { title: 'État' },
            { title: 'Téléphone' },
            { title: 'ID Paniers' },
            { title: 'Prix Paniers' },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <center>
        {checkouts.length > 10 && (
          <div id="pagination">
            <Pagination />
          </div>
        )}
      </center>
    </div>
  );
}
