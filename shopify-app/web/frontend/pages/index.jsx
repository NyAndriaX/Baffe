import React from 'react';
import { Page, Layout } from '@shopify/polaris';
import Upvoice from '../components/Upvoice';

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Upvoice />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
