import './App.less';
import { HashRouter as Router } from 'react-router-dom';
import RenderRouter from './routes';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { IntlProvider } from 'react-intl';
import { localeConfig } from './locales';

function App() {
  const locale = 'zh';

  const getAntdLocale = () => {
    if (locale === 'zh') {
      return zhCN;
    } else if (locale === 'en') {
      return enUS;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()}>
      <IntlProvider locale={locale} messages={localeConfig[locale]}>
        <Router>
          <RenderRouter></RenderRouter>
        </Router>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
