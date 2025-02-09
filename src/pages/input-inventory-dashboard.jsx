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

const InputInventoryDashboard = ({ f7router }) => {
  const { t } = useTranslation(['drugmaster']);
  const drugs = useLiveQuery(() => db.drugs.toArray());
  const gifts = [
    {
      name: 'Shaker',
      image: 'https://m.media-amazon.com/images/I/51SKYuRNLFL._AC_UF894,1000_QL80_.jpg',
      total: 50,
      distributed: 10,
    },
    {
      name: 'Pen',
      image: 'https://5.imimg.com/data5/SQ/KU/SO/SELLER-4285212/pen-camera-full-hd.jpg',
      total: 100,
      distributed: 30,
    },
    {
      name: 'Ambitech Digital',
      image: 'https://m.media-amazon.com/images/I/71QgMa9b0-L.jpg',
      total: 100,
      distributed: 30,
    },
    {
      name: 'Himalaya Basket',
      image: 'https://www.gifts-to-india.com/images/CSCSUUN830_big.webp',
      total: 120,
      distributed: 30,
    },
  ];

  return (
    <Page className={CompareDrugsCss.forpharmaPage}>
      <Navbar className={CompareDrugsCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={CompareDrugsCss.pageTitle}>
          <p>Input Inventory</p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <Toolbar top tabbar className={CompareDrugsCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Active Input
        </Link>
        <Link tabLink="#completed">Previous Month - 3</Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <div>
            {drugs &&
              drugs.slice(0, 5).map((chemist, index) => (
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
                    // onClick={() => f7router.navigate(`/drug/${chemist.xid}/`)}
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
                      <div style={{ textAlign: 'right', marginRight: '16px' }}>
                        <p style={{ margin: '4px 0', fontSize: '9px', color: 'green' }}>Total: 80</p>
                        <p style={{ margin: '4px 0', fontSize: '9px', color: 'red' }}>Distributed: 20</p>
                      </div>
                    </div>
                  </div>

                  {/* Optional horizontal line after each chemist card */}
                  <hr style={{ margin: '8px 16px', border: '1px solid #e0e0e0' }} />
                </div>
              ))}
          </div>

          <div>
            <h2 style={{ padding: '16px' }}>Gifts</h2>
            {gifts.slice(0, 2).map((gift, index) => (
              <div
                key={index}
                className="gift-card"
                style={{ margin: '8px 16px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={gift.image}
                    alt={gift.name}
                    style={{ width: '65px', height: '65px', marginRight: '16px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                    <h3 style={{ margin: '0' }}>{gift.name}</h3>
                    <div style={{ textAlign: 'right', marginRight: '16px' }}>
                      <p style={{ margin: '4px 0', fontSize: '9px', color: 'green' }}>Total: {gift.total}</p>
                      <p style={{ margin: '4px 0', fontSize: '9px', color: 'red' }}>Distributed: {gift.distributed}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab id="completed" className="page-content">
          <div>
            {drugs &&
              drugs.slice(0, 5).map((chemist, index) => (
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
                    // onClick={() => f7router.navigate(`/drug/${chemist.xid}/`)}
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
                      <div style={{ textAlign: 'right', marginRight: '16px' }}>
                        <p style={{ margin: '4px 0', fontSize: '9px', color: 'green' }}>Total: 80</p>
                        <p style={{ margin: '4px 0', fontSize: '9px', color: 'red' }}>Distributed: 20</p>
                      </div>
                    </div>
                  </div>

                  {/* Optional horizontal line after each chemist card */}
                  <hr style={{ margin: '8px 16px', border: '1px solid #e0e0e0' }} />
                </div>
              ))}
          </div>

          {/* Gifts Section */}
          <div>
            <h2 style={{ padding: '16px' }}>Gifts</h2>
            {gifts.slice(0, 4).map((gift, index) => (
              <div
                key={index}
                className="gift-card"
                style={{ margin: '8px 16px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={gift.image}
                    alt={gift.name}
                    style={{ width: '65px', height: '65px', marginRight: '16px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                    <h3 style={{ margin: '0' }}>{gift.name}</h3>
                    <div style={{ textAlign: 'right', marginRight: '16px' }}>
                      <p style={{ margin: '4px 0', fontSize: '9px', color: 'green' }}>Total: {gift.total}</p>
                      <p style={{ margin: '4px 0', fontSize: '9px', color: 'red' }}>Distributed: {gift.distributed}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>

      <Toolbar bottom className={CompareDrugsCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={22} color="blue" /> Input Inventory
        </Link>
      </Toolbar>
    </Page>
  );
};

export default InputInventoryDashboard;
