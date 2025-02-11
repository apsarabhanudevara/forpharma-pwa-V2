import React, { useState, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  useStore,
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
  Fab,
  PageContent,
  Popover,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import RcpaListCss from '../css/rcpa-list.module.css';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';

// const pharmaFirms = [
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Observation made during the audit',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Observation made during the audit',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Observation made during the audit',
//   },
//   {
//     rcpaId: '0102',
//     chemistStockistId: 'CH0120',
//     drugName: 'Azithromycin',
//     quantity: '289',
//     competitordrugName: 'Azithral',
//     compititirQuantity: '275',
//     observeDate: '10/09/2024',
//     remarks: 'Additional Comments',
//   },
// ];

const RcpaList = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);
  // const rcpas = useStore('rcpaList');
  const rcpas = useLiveQuery(() => db.rcpas.toArray());
  const drugs = useLiveQuery(() => db.drugs.toArray());
  const chemists = useLiveQuery(async () => await db.chemists.toArray());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (rcpas && drugs && chemists) {
      // console.log('Before Is Data loaded >> ', rcpas, drugs, chemists);
      (rcpas || []).forEach((r) => {
        if (r.chemist_uid__c) {
          const chemistObj = chemists?.find((c) => c.uid__c === r.chemist_uid__c);
          if (chemistObj) {
            r.chemistStockistId = chemistObj.name__c;
          }
          let drugObj = drugs?.find((d) => d.uid__c === r.drug_uid__c);
          if (drugObj) {
            r.drugName = drugObj.name__c;
          }
          drugObj = drugs?.find((d) => d.uid__c === r.comp_drug_uid__c);
          if (drugObj) {
            r.competitordrugName = drugObj.name__c;
          }
          r.rcpaId = r.uid__c;
          r.quantity = r.quantity__c;
          r.compititirQuantity = r.comp_quantity__c;
          r.observeDate = r.audit_date__c;
          r.remarks = r.remarks__c;
        }
      });
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 1000);
    }
  }, [rcpas, drugs, chemists]);
  if (!isDataLoaded) {
    return <p>Loading data...</p>;
  }
  const navigateToRCPAEntryForm = (e) => {
    console.log('In navigateToRCPAEntryForm >> ', e);
    f7router.navigate(`/rcpa-entry`);
  };
  return (
    <Page className={RcpaListCss.forpharmaPage}>
      <Navbar className={RcpaListCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
          <Link></Link>
        </NavLeft>
        <NavTitle className={RcpaListCss.pageTitle}>
          <p>
            {t('_RCPA_')}
            <br />
            <span>{t('_RCPA_LIST_')}</span>
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
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/retailchemist-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="description_outlined" size={32} color="blue" /> {t('_RCPA_')}
        </Link>
        <Link href="/rcpa-pharma">
          <Icon material="medication_outlined" size={32} /> {t('_PHARMA_')}
        </Link>
        <Link href="/rcpa-doctor">
          <Icon icon="doctors" size={32} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/rcpa-chemist">
          <Icon icon="chemists" size={32} />
          {t('_CHEMIST_')}
        </Link>
      </Toolbar>
      <Fab
        position="right-bottom"
        slot="fixed"
        onClick={navigateToRCPAEntryForm}
        style={{ width: '60px', height: '60px' }}
      >
        <Icon material="plagiarism_outlined" size="20px" />
        <small style={{ marginTop: '28px', fontSize: '8px' }}>RCPA</small>
      </Fab>
      <div>
        {rcpas?.map((observation, index) => (
          <div key={index}>
            <div
              className="rcpa-card"
              style={{
                borderRadius: '4px',
                margin: '8px 16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              {/* Icon section */}
              <div
                style={{
                  display: 'flex',
                  width: '65px',
                  height: '65px',
                  overflow: 'hidden',
                  marginRight: '16px',
                }}
              >
                <Icon
                  material="plagiarism_outlined" // Replace with an appropriate icon name for drug observations
                  size={40}
                  style={{
                    borderRadius: '50%',
                    background: '#2186d4',
                    padding: '10px',
                    color: 'white',
                  }}
                />
              </div>

              {/* Drug details */}
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                <h3 style={{ margin: '0', fontSize: '11px', fontWeight: 'bold' }}>
                  RCPA ID: {observation.rcpaId} | Chemist/Stockist ID: {observation.chemistStockistId}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>Drug Name (Own): {observation.drugName}</p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>Quantity: {observation.quantity}</p>
                <div style={{ fontSize: '12px' }}>
                  <div>
                    <small>Drug Name (Competitor):</small> {observation.competitordrugName}
                  </div>
                  <div>
                    <small>Quantity (Competitor):</small> {observation.compititirQuantity}
                  </div>
                  <div>
                    <small>Observed Date:</small> {observation.observeDate}
                  </div>
                  <div>
                    <small>Remarks:</small> {observation.remarks}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional horizontal line after each observation card */}
            <hr style={{ margin: '8px 16px', border: '1px solid #e0e0e0' }} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default RcpaList;
