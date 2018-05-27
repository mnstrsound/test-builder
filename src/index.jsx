import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

import Root from './root';
import initStores from './admin/stores/init-stores';
import initClientStores from './client/stores/init-client-stores';

const stores = { ...initStores(), ...initClientStores() };
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);
const appEl = document.getElementById('app');

ReactDOM.render(<Root stores={ stores } history={ history } />, appEl);
