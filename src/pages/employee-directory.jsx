import {
  f7,
  Badge,
  Button,
  Block,
  Gauge,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  ListItem,
  Navbar,
  NavTitle,
  NavRight,
  PageContent,
  Progressbar,
  Tab,
  Tabs,
  Toolbar,
  useStore,
  NavLeft,
} from 'framework7-react';
import React, { useState, useEffect } from 'react';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { Trans, useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
import EmployeeDirectoryCss from '../css/employee-directory.module.css';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const EmployeeDirectory = ({ f7router }) => {
  const doctors = useLiveQuery(async () => await db.doctors.toArray());
  const { t } = useTranslation(['employeemaster']);

  return (
    <Page className={EmployeeDirectoryCss.forpharmaPage}>
      <Navbar className={EmployeeDirectoryCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={EmployeeDirectoryCss.pageTitle}>
          <p>
            <span>{t('_EMPLOYEE_MASTER_')}</span>
            <br />
            <span className={EmployeeDirectoryCss.updatedAt}>Employee Directory</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <div>
        <List mediaList>
          <ul>
            {doctors &&
              doctors.map((doctor, index) => (
                <ListItem
                  key={index}
                  mediaItem
                  chevronCenter
                  link={`/employee/${doctor.uid__c}/`}
                  title={doctor.full_name__c}
                  subtitle="Sales Representative"
                  text="Hyderabad, Telengana"
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
      <Toolbar bottom className={EmployeeDirectoryCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/employee-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="groups_outlined" size={32} color="blue" />
          {t('_EMPLOYEE_DIRECTORY_')}
        </Link>
        <Link href="/employee-location">
          <Icon material="person_pin_circle_outlined" size={32} />
          {t('_EMPLOYEE_BY_LOCATION_')}
        </Link>
        <Link href="#">
          <Icon material="person_pin_outlined" size={32} />
          {t('_EMPLOYEE_BY_DEPARTMENT_')}
        </Link>
      </Toolbar>
    </Page>
  );
};
export default EmployeeDirectory;
