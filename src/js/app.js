import Framework7React from 'framework7-react';
import Framework7 from 'framework7/lite-bundle';
import React from 'react';
import { createRoot } from 'react-dom/client';

import 'framework7/css/bundle';
import '../css/icons.css';
import '../css/app.css';

import ForPharmaPWA from '../components/app.jsx';

import './i18n.js';

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = createRoot(document.getElementById('forpharma-pwa'));
root.render(React.createElement(ForPharmaPWA));
