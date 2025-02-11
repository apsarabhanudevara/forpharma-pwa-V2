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

import IndividualLaboratoryCss from '../css/individual-laboratory.module.css';
import Chart from 'react-apexcharts';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import QrCode from '../assets/images/Qr-code.png';

const IndividualLaboratory = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);
  const drugs = useLiveQuery(() => db.drugs.toArray());

  // Colum chart data shuffle
  return (
    <Page className={IndividualLaboratoryCss.forpharmaPage}>
      <Navbar className={IndividualLaboratoryCss.pageNavBar} sliding={false}>
        <Link onClick={() => f7router.back()}>
          <Icon material="chevron_left" color="white" size={36} />
        </Link>
        <NavTitle className={IndividualLaboratoryCss.pageTitle}>
          <p>
            {t('_RCPA_')}
            <br />
            <span>Cipla</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={IndividualLaboratoryCss.bottomToolBar} outline={false}>
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
        <Link href="/rcpa-pharma" tabLinkActive>
          <Icon material="medication_outlined" size={32} color="blue" /> {t('_PHARMA_')}
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
      <Toolbar top tabbar className={IndividualLaboratoryCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Our Drugs
        </Link>
        <Link tabLink="#completed">Competitors Drugs</Link>
      </Toolbar>

      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <div className={IndividualLaboratoryCss.progressContainer}>
            <div>
              <span>Syncing Data</span>
            </div>
            <div>
              <Icon material="cached_outlined" size={21} color="blue" />
            </div>
            <div>
              <Progressbar
                className={IndividualLaboratoryCss.customProgressbar}
                progress={20}
                id="demo-inline-progressbar"
              />
            </div>
          </div>
          <div>
            {drugs &&
              drugs.map((chemist, index) => (
                <div key={index}>
                  <div
                    className="chemist-card"
                    style={{
                      borderRadius: '4px',
                      margin: '8px 16px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      overflow: 'hidden', // Prevent overflow
                    }}
                  >
                    {/* Chemist image */}
                    <div
                      style={{
                        display: 'flex',
                        width: '65px',
                        height: '65px',
                        overflow: 'hidden',
                        marginRight: '16px',
                      }}
                    >
                      <img
                        src={chemist.image__c}
                        alt={chemist.name__c}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* Chemist details */}
                    <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                      {' '}
                      {/* Added minWidth and maxWidth */}
                      <h3 style={{ margin: '0', width: '100%' }}>{chemist.name__c}</h3>
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%' }}>{chemist.composition__c}</p>
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%', color: '#00a086' }}>
                        Stock: Available
                      </p>
                    </div>

                    {/* Icons at the end of the row */}
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <div>
                        <img src={QrCode} alt="QR Code" style={{ width: '40px', height: '40px', marginLeft: '16px' }} />
                      </div>
                    </div>
                  </div>

                  {/* Optional horizontal line after each chemist card */}
                  <hr style={{ margin: '8px 16px', border: '1px solid #e0e0e0' }} />
                </div>
              ))}
          </div>
        </Tab>
        <Tab id="completed" className="page-content" tabActive>
          <div className={IndividualLaboratoryCss.progressContainer}>
            <div>
              <span>Syncing Data</span>
            </div>
            <div>
              <Icon material="cached_outlined" size={21} color="blue" />
            </div>
            <div>
              <Progressbar
                className={IndividualLaboratoryCss.customProgressbar}
                progress={20}
                id="demo-inline-progressbar"
              />
            </div>
          </div>
          <div>
            {drugs &&
              drugs.map((chemist, index) => (
                <div key={index}>
                  <div
                    className="chemist-card"
                    style={{
                      borderRadius: '4px',
                      margin: '8px 16px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      overflow: 'hidden', // Prevent overflow
                    }}
                    onClick={() => f7router.navigate(`/drug/${chemist.xid}/`)}
                  >
                    {/* Chemist image */}
                    <div
                      style={{
                        display: 'flex',
                        width: '65px',
                        height: '65px',
                        overflow: 'hidden',
                        marginRight: '16px',
                      }}
                    >
                      <img
                        src={chemist.image__c}
                        alt={chemist.name__c}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* Chemist details */}
                    <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                      {' '}
                      {/* Added minWidth and maxWidth */}
                      <h3 style={{ margin: '0', width: '100%' }}>{chemist.name__c}</h3>
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%' }}>{chemist.composition__c}</p>
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%', color: '#00a086' }}>
                        Stock: Available
                      </p>
                    </div>

                    {/* Icons at the end of the row */}
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <div>
                        <img src={QrCode} alt="QR Code" style={{ width: '40px', height: '40px', marginLeft: '16px' }} />
                      </div>
                    </div>
                  </div>

                  {/* Optional horizontal line after each chemist card */}
                  <hr style={{ margin: '8px 16px', border: '1px solid #e0e0e0' }} />
                </div>
              ))}
          </div>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default IndividualLaboratory;
