import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faBitcoin, faDiscord, faFacebook, faGithub, faReddit, faTelegram, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(fab, faReddit, faTwitter, faFacebook, faTelegram, faDiscord, faGithub, faBitcoin)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
