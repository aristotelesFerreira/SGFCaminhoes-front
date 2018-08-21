import Enlang from './entries/en-US';
import pt from './entries/pt_BR';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  br: pt,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.br.data);

export default AppLocale;
