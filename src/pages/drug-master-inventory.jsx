import { Page, Navbar, NavLeft, NavTitle, NavRight, Icon, Link, Toolbar } from 'framework7-react';
import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
import drugMasterCss from '../css/drug-master.module.css';
import QrCode from '../assets/images/Qr-code.png';

const DrugMasterInventory = (props) => {
  const { f7router } = props;
  const drugs = useLiveQuery(() => db.drugs.toArray());

  return (
    <Page className={drugMasterCss.forpharmaPage}>
      <Navbar className={drugMasterCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={drugMasterCss.pageTitle}>
          <p>Drug Inventory</p>
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
                  <p style={{ margin: '4px 0', fontSize: '9px', width: '100%' }}>
                    Manufacturer: {chemist.manufacturer__c}
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
      {/* Bottom Toolbar */}
      <Toolbar bottom className={drugMasterCss.bottomToolBar}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> Home
        </Link>
        <Link href="/chemist-stockist">
          <Icon icon="dashboard" size={32} /> Dashboard
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={24} color="blue" /> Chemist Stockist
        </Link>
      </Toolbar>
    </Page>
  );
};

export default DrugMasterInventory;
