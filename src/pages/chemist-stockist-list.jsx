import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  f7,
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
  Tabs,
  Tab,
  Toolbar,
  Progressbar,
} from 'framework7-react';

import chemistStockistListCss from '../css/chemist-stockist-list.module.css';
import { db } from '../models/db';

const createinitials = (name) => {
  const chopped = name?.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const ChemistStockistList = ({ props }) => {
  const { t } = useTranslation(['chemiststockist']);
  const chemists = useLiveQuery(() => db.chemists.toArray());

  return (
    <Page className={chemistStockistListCss.forpharmaPage}>
      <Navbar className={chemistStockistListCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={chemistStockistListCss.pageTitle}>
          <p>
            <span>{t('_CHEMIST_STOCKIST_HEADER_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Block>
        <List mediaList>
          <ul>
            {chemists &&
              chemists.map((chemist, index) => (
                <ListItem
                  key={index}
                  mediaItem
                  chevronCenter
                  link={`/chemist-info/${chemist.uid__c}/`}
                  title={chemist.name__c}
                  subtitle={`${chemist.locality__c}, ${chemist.city__c}`}
                  text={`${chemist.phone__c}, ${chemist.email__c}`}
                  style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
                >
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
                    {createinitials(chemist.name__c)}
                  </div>
                </ListItem>
              ))}
          </ul>
        </List>
      </Block>

      <Toolbar bottom className={chemistStockistListCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/chemist-stockist">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={24} color="blue" />
          {t('_CHEMIST_STOCKIST_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default ChemistStockistList;
