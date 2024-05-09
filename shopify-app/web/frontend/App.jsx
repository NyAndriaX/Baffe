import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nContext, I18nManager } from '@shopify/react-i18n';
import Routes from './Routes';
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from './components';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)');

  const locale = 'fr';
  
  const i18nManager = useMemo(
    () =>
      new I18nManager({
        locale,
        onError(_error) {
          console.log({ _error });
        },
      }),
    []
  );

  return (
    <PolarisProvider>
      <I18nContext.Provider value={i18nManager}>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </I18nContext.Provider>
    </PolarisProvider>
  );
}
