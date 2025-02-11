import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
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

import CompareDrugsCss from '../css/compare-drugs.module.css';
import QrCode from '../assets/images/Qr-code.png';

const DrugMaster = ({ f7router }) => {
  const { t } = useTranslation(['drugmaster']);
  const drugs = useLiveQuery(() => db.drugs.toArray());
  return (
    <Page className={CompareDrugsCss.forpharmaPage}>
      <Navbar className={CompareDrugsCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={CompareDrugsCss.pageTitle}>
          <p>{t('_DRUG_MASTER_')}</p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <Toolbar top tabbar className={CompareDrugsCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Our Drugs
        </Link>
        <Link tabLink="#completed">Competitors Drugs</Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
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
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%' }}>
                        Manufacturer: {chemist.manufacturer__c}
                      </p>
                    </div>

                    {/* Icons at the end of the row */}
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <div>
                        <img
                          src={QrCode}
                          alt="QR Code"
                          style={{ width: '34px', height: '34px', marginRight: '6px', marginTop: '6px' }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#2186d4',
                          marginRight: '8px',
                          width: '34px',
                        }}
                      >
                        <Icon material="bookmark_border_outlined" color="white" />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#2186d4',
                          width: '34px',
                        }}
                      >
                        <Icon material="share" color="white" />
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
                      <p style={{ margin: '4px 0', fontSize: '9px', width: '100%' }}>
                        Manufacturer: {chemist.manufacturer__c}
                      </p>
                    </div>

                    {/* Icons at the end of the row */}
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <div>
                        <img
                          src={QrCode}
                          alt="QR Code"
                          style={{ width: '34px', height: '34px', marginRight: '6px', marginTop: '6px' }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#2186d4',
                          marginRight: '8px',
                          width: '34px',
                        }}
                      >
                        <Icon material="bookmark_border_outlined" color="white" />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#2186d4',
                          width: '34px',
                        }}
                      >
                        <Icon material="share" color="white" />
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

      <Toolbar bottom className={CompareDrugsCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/drug-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={32} color="blue" /> {t('_DRUG_MASTER_')}
        </Link>
        <Link href="/compare-drugs">
          <Icon material="compare_arrows_outlined" size={32} /> {t('_COMPARE_DRUGS_')}
        </Link>
        <Link href="/drug-category">
          <Icon material="category_outlined" size={24} />
          {t('_DRUGS_BY_CATEGORY_')}
        </Link>
      </Toolbar>
    </Page>
  );
};
export default DrugMaster;
