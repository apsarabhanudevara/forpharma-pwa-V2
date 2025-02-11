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
  NavTitle,
  Page,
  Progressbar,
  PageContent,
  Popover,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import RcpaListCss from '../css/rcpa-list.module.css';
import Chart from 'react-apexcharts';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const RcpaDoctor = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);
  const doctors = useLiveQuery(() => db.doctors.toArray());

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
            <span>{t('_DOCTORS_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={RcpaListCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/retailchemist-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/rcpa-list">
          <Icon material="description_outlined" size={32} /> {t('_RCPA_')}
        </Link>
        <Link href="/rcpa-pharma">
          <Icon material="medication_outlined" size={32} /> {t('_PHARMA_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/rcpa-chemist">
          <Icon icon="chemists" size={32} />
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
            {doctors &&
              doctors.map((doctor, index) => (
                <ListItem
                  key={index}
                  mediaItem
                  chevronCenter
                  link="#"
                  title={doctor.title__c + doctor.full_name__c}
                  subtitle={doctor.designation__c}
                  text={doctor.timing__c}
                  style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
                >
                  {(index + 1) % 3 === 0 ? (
                    <div
                      slot="media"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: '#134e7c',
                        color: 'white',
                        fontSize: '30px',
                        width: '65px',
                        height: '65px',
                      }}
                      width={65}
                    >
                      {createinitials(doctor.full_name__c)}
                    </div>
                  ) : (
                    <img slot="media" style={{ borderRadius: '50%' }} width={65} src={RepAvatar} />
                  )}
                </ListItem>
              ))}
          </ul>
        </List>
      </div>
    </Page>
  );
};

export default RcpaDoctor;
