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
const DoctorsMainPage = ({ f7router }) => {
  {
    /** TODO: implement infinite scroll */
  }
  const doctors = useLiveQuery(async () => await db.doctors.toArray());
  const { t } = useTranslation(['dailyplanner']);
  return (
    <Page className={PageCss.forpharmaPage} pageContent={false}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link>{/* <Icon material="chevron_left" color="white" size={36} /> */}</Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_CONNECT_DOCTORS_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={PageCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          {t('_FRESH_TASKS_')}
        </Link>
        <Link tabLink="#completed">{t('_COMPLETED_')}</Link>
        <Link tabLink="#no-show">{t('_NO_SHOW_')}</Link>
      </Toolbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={22} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Fab position="right-bottom" slot="fixed" style={{ bottom: '150px' }} onClick={openConfirmDoctorsSync}>
        <Icon md="material:sync" />
      </Fab>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <List mediaList>
            <ul>
              {doctors &&
                doctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    mediaItem
                    chevronCenter
                    link={`/doctor/${doctor.uid__c}/`}
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
        </Tab>
        <Tab id="completed" className="page-content">
          <List mediaList>
            <ul>
              {doctors &&
                doctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    mediaItem
                    chevronCenter
                    // link={`/doctor/${doctor.uid__c}/`}
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
        </Tab>
        <Tab id="no-show" className="page-content">
          <List mediaList>
            <ul>
              {doctors &&
                doctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    mediaItem
                    chevronCenter
                    // link={`/doctor/${doctor.uid__c}/`}
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
        </Tab>
      </Tabs>
    </Page>
  );
};

export default DoctorsMainPage;
