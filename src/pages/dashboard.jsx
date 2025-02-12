import React, { useEffect, useState } from 'react';
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
  Page,
  Toggle,
} from 'framework7-react';
import { useStore } from 'framework7-react';

import { db } from '../models/db';
import ForPharmaLogo from '../assets/images/forpharma.svg';
import DashboardCss from '../css/dashboard.module.css';

const Dashboard = ({ f7router }) => {
  const { t } = useTranslation('dashboard');
  const chemists = useLiveQuery(async () => await db.doctors.toArray());
  const [year, setYear] = useState(new Date().getFullYear());
  const isUserCheckedin = useStore('getUserCheckedinState');
  return (
    <Page id={DashboardCss.dashboardScreen} onPageInit={() => (f7.dirtyInstance = true)}>
      <Block id={DashboardCss.logOut}>
        <div
          onClick={() => {
            f7.store.dispatch('logoutUser');
            f7router.navigate('/');
          }}
          style={{ cursor: 'pointer' }}
        >
          <Icon f7="power" size="35px" color="#f1555a"></Icon>
        </div>
      </Block>
      <Block id={DashboardCss.dashboardLogo}>
        {/* <img src={ForPharmaLogo} alt="ForPharma Logo" /> */}
        <img src="../assets/images/download-removebg-preview.png" alt="ForPharma Logo" />
        {/* <Button
          id={DashboardCss.signoutBtn}
          iconMaterial="logout"
          fill
          large
          onClick={() => {
            f7.store.dispatch('logoutUser');
            f7router.navigate('/');
          }}
        >
          {t('_SIGN_OUT_', { ns: 'dashboard' })}
        </Button> */}
      </Block>

      <Block id={DashboardCss.dashboardGrid}>
        {/* <div className="grid grid-cols-1">
          <Button href="/rep-checkin" id={DashboardCss.repBtn} fill large icon="rep-icon">
            {t('_REP_CHECK_ATTENDANCE_', { ns: 'dashboard' })}
          </Button>
        </div> */}
        <div className="grid grid-cols-1">
          <Button
            href="/rep-checkin"
            id={DashboardCss.repBtn}
            fill
            large
            icon="rep-icon"
            style={{ background: isUserCheckedin ? '#a20000' : '#2186d4' }}
          >
            <span>
              {isUserCheckedin
                ? // ? t('_REP_CHECK_OUT_ATTENDANCE_', { ns: 'dashboard' })
                  // : t('_REP_CHECK_ATTENDANCE_', { ns: 'dashboard' })
                  t('_REP_CHECK_OUT_ATTENDANCE_')
                : t('_REP_CHECK_ATTENDANCE_')}
            </span>
          </Button>
        </div>
        {/* Row One */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <List strong inset>
            <ListButton href="/doctor-master-dashboard">
              <Icon icon="doctor-master" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_DOCTOR_MASTER_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/drug-dashboard">
              <Icon icon="drug-master" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_DRUG_MASTER_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
        </div>
        {/* Row Two */}
        <div className="grid grid-cols-2 grid-gap">
          <List strong inset>
            <ListButton href="/employee-dashboard">
              <Icon icon="employee-master" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_EMPLOYEE_MASTER_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/chemist-stockist">
              <Icon icon="chemist-stockist" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_CHEM_STOCK_MASTER_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
        </div>
        {/* Row Three */}
        <div className="grid grid-cols-2 grid-gap">
          <List strong inset>
            <ListButton href="/sales-targets">
              <Icon icon="core-sales" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_CORE_SALES_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/sales-visits">
              <Icon icon="core-sales-visits" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_CORE_SALES_ViSTS_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
        </div>
        {/* Row Four */}
        <div className="grid grid-cols-3 grid-gap">
          <List strong inset>
            <ListButton href="/order-capture">
              <Icon icon="order-capture" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_ORDER_CAPTURE_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/retailchemist-dashboard">
              <Icon icon="retail-chemist" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <strong>RCPA</strong>
                {/* <Trans i18nKey="_RETAIL_CHEMIST_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} /> */}
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/dcr-survey">
              <Icon icon="employee-master" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <strong>DCR</strong> Survey
                {/* <Trans i18nKey="_RETAIL_CHEMIST_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} /> */}
              </span>
            </ListButton>
          </List>
        </div>
        <div className="grid grid-cols-3">
          <List strong inset>
            <ListButton href="/inputinventory-dashboard">
              <Icon icon="input-inventory" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_INPUT_INVENTORY_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/tour-planner">
              <Icon icon="tour-planner" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_TOUR_PLANNER_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
          <List strong inset>
            <ListButton href="/expense-claim" onClick={() => console.log('Navigating to Expense Claim')}>
              <Icon icon="expense-claim" />
              <span className={DashboardCss.dashboardBtnTxt}>
                <Trans i18nKey="_EXPENSE_CLAIM_" ns="dashboard" components={{ strong: <strong />, br: <br /> }} />
              </span>
            </ListButton>
          </List>
        </div>

        <div className="grid grid-cols-1">
          <List id={DashboardCss.dailyPlanner}>
            <ListItem>
              <Link href="/rep-dashboard">
                <Icon icon="daily-planner" /> {t('_DAILY_PLANNER_', { ns: 'dashboard' })}
              </Link>
              <Link iconOnly>
                <Icon id={DashboardCss.dashboardBell} f7="bell" color="white">
                  <Badge color="red">3</Badge>
                </Icon>
              </Link>
            </ListItem>
          </List>
        </div>
        <div className="grid grid-cols-1">
          <p style={{ textAlign: 'center', color: 'white' }}>&copy; {year} Forsys Inc.</p>
        </div>
      </Block>
    </Page>
  );
};

export default Dashboard;
