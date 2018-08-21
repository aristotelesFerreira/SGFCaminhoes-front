import appLocaleData from 'react-intl/locale-data/br';
import ptBrMessages from '../locales/pt_BR.json';
import antdptBR from 'antd/lib/locale-provider/pt_BR';

const ptBR = {
  messages: {
    ...ptBrMessages
  },
  antd: antdptBR,
  locale: 'br',
  data: appLocaleData
};
export default ptBR;
