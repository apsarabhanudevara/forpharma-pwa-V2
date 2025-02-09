import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  f7,
  Gauge,
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  Progressbar,
  NavTitle,
  Page,
  PageContent,
  Popover,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import RcpaListCss from '../css/rcpa-list.module.css';
import Chart from 'react-apexcharts';

const pharmaFirms = [
  {
    fullname: "Dr. Reddy's Laboratories",
    designation: 'Pharmaceuticals',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    imagePath: '../assets/images/drReddy.png',
  },
  {
    fullname: 'Lupin',
    designation: 'Biotechnology',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/lupin.png',
  },
  {
    fullname: 'Mankind Pharma',
    designation: 'Healthcare Products',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    imagePath: '../assets/images/mankind.png',
  },
  {
    fullname: 'Abbott Laboratories',
    designation: 'Diagnostics',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    imagePath: '../assets/images/abbott.png',
  },
  {
    fullname: 'Cipla',
    designation: 'Pharmaceuticals',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/cipla.png',
  },
  {
    fullname: "Dr. Reddy's Laboratories",
    designation: 'Pharmaceuticals',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    imagePath: '../assets/images/drReddy.png',
  },
  {
    fullname: 'Lupin',
    designation: 'Biotechnology',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/lupin.png',
  },
  {
    fullname: 'Mankind Pharma',
    designation: 'Healthcare Products',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    imagePath: '../assets/images/mankind.png',
  },
  {
    fullname: 'Abbott Laboratories',
    designation: 'Diagnostics',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    imagePath: '../assets/images/abbott.png',
  },
  {
    fullname: 'Cipla',
    designation: 'Pharmaceuticals',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/cipla.png',
  },
  {
    fullname: "Dr. Reddy's Laboratories",
    designation: 'Pharmaceuticals',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    imagePath: '../assets/images/drReddy.png',
  },
  {
    fullname: 'Lupin',
    designation: 'Biotechnology',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/lupin.png',
  },
  {
    fullname: 'Mankind Pharma',
    designation: 'Healthcare Products',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    imagePath: '../assets/images/mankind.png',
  },
  {
    fullname: 'Abbott Laboratories',
    designation: 'Diagnostics',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    imagePath: '../assets/images/abbott.png',
  },
  {
    fullname: 'Cipla',
    designation: 'Pharmaceuticals',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/cipla.png',
  },
  {
    fullname: "Dr. Reddy's Laboratories",
    designation: 'Pharmaceuticals',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    imagePath: '../assets/images/drReddy.png',
  },
  {
    fullname: 'Mankind Pharma',
    designation: 'Healthcare Products',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    imagePath: '../assets/images/mankind.png',
  },
  {
    fullname: 'Abbott Laboratories',
    designation: 'Diagnostics',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    imagePath: '../assets/images/abbott.png',
  },
  {
    fullname: 'Cipla',
    designation: 'Pharmaceuticals',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    imagePath: '../assets/images/cipla.png',
  },
];

const RcpaPharma = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);

  // Colum chart data shuffle
  return (
    <Page className={RcpaListCss.forpharmaPage}>
      <Navbar className={RcpaListCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={RcpaListCss.pageTitle}>
          <p>
            {t('_RCPA_')}
            <br />
            <span>{t('_PHARAM_FIRMS_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
          <Link>
            <Icon material="filter_alt_outlined" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={RcpaListCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/retailchemist-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/rcpa-list">
          <Icon material="description_outlined" size={24} /> {t('_RCPA_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="medication_outlined" size={24} color="blue" /> {t('_PHARMA_')}
        </Link>
        <Link href="/rcpa-doctor">
          <Icon icon="doctors" size={24} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/rcpa-chemist">
          <Icon icon="chemists" size={24} />
          {t('_CHEMIST_')}
        </Link>
      </Toolbar>
      <div className={RcpaListCss.progressContainer}>
        <div>
          <span>Syncing Data</span>
        </div>
        <div>
          <Icon material="cached_outlined" size={21} color="blue" />
        </div>
        <div>
          <Progressbar className={RcpaListCss.customProgressbar} progress={20} id="demo-inline-progressbar" />
        </div>
      </div>
      <div>
        <List mediaList>
          <ul>
            {pharmaFirms.map((firm, index) => (
              <ListItem
                key={index}
                mediaItem
                chevronCenter
                link="/individual-laboratory"
                title={firm.fullname}
                text={`${firm.city}, ${firm.state}, ${firm.country}`}
                style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
              >
                <img slot="media" style={{ borderRadius: '50%' }} width={65} src={firm.imagePath} alt={firm.fullname} />
              </ListItem>
            ))}
          </ul>
        </List>
      </div>
    </Page>
  );
};

export default RcpaPharma;
