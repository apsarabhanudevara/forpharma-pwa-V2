import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';

import {
  Badge,
  Button,
  Card,
  CardContent,
  f7,
  Gauge,
  Icon,
  Link,
  Navbar,
  NavRight,
  NavTitle,
  Page,
  NavLeft,
  Progressbar,
  Toolbar,
} from 'framework7-react';

import RcpaListCss from '../css/rcpa-list.module.css';
import { db } from '../models/db';

const createInitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const RcpaChemist = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);
  const chemists = useLiveQuery(async () => await db.chemists.toArray());

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
            <span>{t('_CHEMIST_')}</span>
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
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/retailchemist-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/rcpa-list">
          <Icon material="description_outlined" size={24} /> {t('_RCPA_')}
        </Link>
        <Link href="/rcpa-pharma">
          <Icon material="medication_outlined" size={24} /> {t('_PHARMA_')}
        </Link>
        <Link href="/rcpa-doctor">
          <Icon icon="doctors" size={24} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="chemists" size={24} color="blue" />
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
      <div className={RcpaListCss.chemistList}>
        {chemists &&
          chemists.map((chemist, index) => (
            <div
              key={index}
              className={RcpaListCss.listItem} // Custom CSS for styling
              style={{
                backgroundColor: '#e9f3fb',
                borderRadius: '4px',
                margin: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: (index + 1) % 3 === 0 ? '#134e7c' : (index + 1) % 2 === 0 ? '#6d24cc' : '#34c759',
                  color: 'white',
                  fontSize: '30px',
                  width: '65px',
                  height: '65px',
                  marginRight: '10px',
                }}
              >
                {createInitials(chemist.name__c)}
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{chemist.name__c}</h3>
                <p style={{ margin: 0 }}>{chemist.locality__c + ', ' + chemist.city__c}</p>
                <p style={{ margin: 0 }}>{chemist.timing__c}</p>
              </div>
            </div>
          ))}
      </div>
    </Page>
  );
};

export default RcpaChemist;
