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
  Fab,
  FabButton,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import RepAvatar from '../assets/images/rep-placeholder.jpg';
import PageCss from '../css/forpharma-page.module.css';
import { db } from '../models/db';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};
const openConfirmDoctorsSync = () => {
  f7.dialog.confirm("Sync Doctor's data now?", () => {
    f7.dialog.preloader("Doctor's sync in progress...");
    f7.serviceWorker.container.controller.postMessage({ type: 'SYNC_DOCTORS_NOW' });
    f7.serviceWorker.container.onmessage = (e) => {
      if (e.data && e.data.type === 'DOCTORS_SYNC_COMPLETE') {
        f7.dialog.close();
      }
    };
    // setTimeout(() => {
    //   f7.dialog.close();
    // }, 3000);
  });
};
const TaggedChemist = ({ f7router }) => {
  {
    /** TODO: implement infinite scroll */
  }
  const chemists = useLiveQuery(async () => await db.chemists.toArray());
  const { t } = useTranslation(['dailyplanner']);
  return (
    <Page className={PageCss.forpharmaPage} pageContent={false}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_TAGGED_CHEMIST_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <div className="page-content">
        <List mediaList>
          <ul>
            {chemists &&
              chemists.slice(0, 4).map((chemist, index) => (
                <ListItem
                  key={index}
                  mediaItem
                  chevronCenter
                  title={chemist.name__c}
                  subtitle={`${chemist.locality__c}, ${chemist.city__c}`}
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
                  <Button
                    slot="after"
                    fill
                    onClick={() => f7router.navigate(`/rcpa-entry`)}
                    style={{ marginLeft: 'auto' }}
                  >
                    Create RCPA
                  </Button>
                </ListItem>
              ))}
          </ul>
        </List>
      </div>
    </Page>
  );
};

export default TaggedChemist;
