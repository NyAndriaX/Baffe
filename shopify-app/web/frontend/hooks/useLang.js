import { useI18n } from '@shopify/react-i18n';
import fr from '../translations/fr.json';

export default function useLang() {
  const [i18n] = useI18n({
    id: 'Translations',
    fallback: fr,
    translations(locale) {
      return import(`../translations/${locale}.json`);
    },
  });
  return value => i18n(value);
}
