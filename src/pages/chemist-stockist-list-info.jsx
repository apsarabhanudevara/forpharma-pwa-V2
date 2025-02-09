import {
  Badge,
  Button,
  Block,
  BlockTitle,
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Sheet,
  Toggle,
  Toolbar,
} from 'framework7-react';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import DoctorsProfileCss from '../css/doctors-profile.module.css';
import { db } from '../models/db';

const ChemistStockistListInfo = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['chemiststockist']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const chemists = uid__c ? useLiveQuery(async () => await db.chemists.get({ uid__c })) : [];
  return (
    <Page pageContent={false}>
      <Navbar className={DoctorsProfileCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={DoctorsProfileCss.pageTitle}>
          <p>
            <span>{t('_CHEMIST_STOCKIST_HEADER_')}</span>
            <br />
            Chemist Info
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={DoctorsProfileCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/chemist-stockist">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={24} color="blue" />
          {t('_CHEMIST_STOCKIST_')}
        </Link>
      </Toolbar>
      <PageContent id={DoctorsProfileCss.doctorProfilePageContent}>
        {chemists && (
          <>
            <Block id={DoctorsProfileCss.docProfileHeader}>
              <div id={DoctorsProfileCss.docAvatar}>
                <img src={RepAvatar} alt="Avatar" />
              </div>
              <p>
                <strong>{chemists.name__c}</strong> <br />
                Chemist ID: {chemists.id}
              </p>
              <Block id={DoctorsProfileCss.topButtons}>
                <div className={DoctorsProfileCss.topButtonsInner}>
                  <Button
                    onClick={() => props.f7router.navigate('/drug-inventory')}
                    small
                    outline
                    style={{ marginRight: '12px' }}
                  >
                    Drug Inventor
                  </Button>
                  <Button onClick={() => props.f7router.navigate('/order-history')} small outline>
                    Order History
                  </Button>
                </div>
              </Block>
            </Block>

            <Block id={DoctorsProfileCss.infoGridBlock}>
              <div className="page-width-wrapper">
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="access_time_filled" color="blue" />
                  </div>
                  <div>
                    <strong>Timing</strong>
                    <br />
                    {chemists.timing__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="phone" color="blue" />
                  </div>
                  <div>
                    <strong>Mobile</strong>
                    <br />
                    {chemists.phone__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="grade" color="blue" />
                  </div>
                  <div>
                    <strong>Rating</strong>
                    <br />
                    {chemists.rating__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="account_balance_wallet" color="blue" />
                  </div>
                  <div>
                    <strong>Payment terms</strong>
                    <br />
                    Agreed payment terms between the company and chemist and stockist
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="library_add" color="blue" />
                  </div>
                  <div>
                    <strong>Discount / Promitions</strong>
                    <br />
                    Information on any discount or promotional offers available to chemist and stockist
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="fmd_good" color="blue" />
                  </div>
                  <div>
                    <strong>Address</strong>
                    <br />
                    {chemists.address__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="location_city" color="blue" />
                  </div>
                  <div>
                    <strong>City</strong>
                    <br />
                    {chemists.city__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="map" color="blue" />
                  </div>
                  <div>
                    <strong>State</strong>
                    <br />
                    {chemists.state__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="local_shipping" color="blue" />
                  </div>
                  <div>
                    <strong>Pin Code</strong>
                    <br />
                    {chemists.pin_code__c}
                  </div>
                </div>
              </div>
            </Block>
          </>
        )}
      </PageContent>
      <Sheet
        opened={shareSheetOpen}
        className="demo-sheet-swipe-to-close"
        style={{ height: 'auto' }}
        swipeToClose
        push
        backdrop
        onSheetClosed={() => setShareSheetOpen(false)}
      >
        <div className="swipe-handler"></div>

        <PageContent>
          {/* <BlockTitle large>Share with Dr.Sridhar Peddi Reddi</BlockTitle> */}
          {chemists && (
            <>
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  <p>Select content type</p>
                  <div id={DoctorsProfileCss.shareModalTop}>
                    <Link>
                      <Icon icon="share-icon-01" />
                      <p>
                        Template text <br /> messages
                      </p>
                    </Link>
                    <Link>
                      <Icon icon="share-icon-02" />
                      <p>
                        Drug details/ <br /> Visual Aids
                      </p>
                    </Link>
                    <Link>
                      <Icon icon="share-icon-03" />
                      <p>Reports</p>
                    </Link>
                    <Link>
                      <Icon icon="more-icon" />
                      <p>More</p>
                    </Link>
                  </div>
                  <div id={DoctorsProfileCss.shareModalTopToggle}>
                    Followup communication <Toggle color="green" />
                  </div>
                </div>
              </Block>
              <hr />
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  <p>Choose communication method</p>
                  <div id={DoctorsProfileCss.shareModalBottom}>
                    <Link>
                      <Icon icon="whatsapp" />
                      <p>WhatsApp</p>
                    </Link>
                    <Link>
                      <Icon icon="fpmail" />
                      <p>Email</p>
                    </Link>
                    <Link>
                      <Icon icon="fpmessage" />
                      <p>Messages</p>
                    </Link>
                    <Link>
                      <Icon icon="more-icon" />
                      <p>More</p>
                    </Link>
                  </div>
                  <div id={DoctorsProfileCss.shareContentBtn}>
                    <Button large fill>
                      <Icon material="share" style={{ marginRight: '16px' }} /> Share
                    </Button>
                  </div>
                </div>
              </Block>
            </>
          )}
        </PageContent>
      </Sheet>
    </Page>
  );
};
export default ChemistStockistListInfo;
