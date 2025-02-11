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
import ChemistsProfileCss from '../css/doctors-profile.module.css';
import { db } from '../models/db';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const ChemistsProfile = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['dailyplanner']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const chemist = useLiveQuery(async () => await db.chemists.get({ uid__c }));
  return (
    <Page pageContent={false}>
      <Navbar className={ChemistsProfileCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={ChemistsProfileCss.pageTitle}>
          <p>
            <span>Daily Planner</span>
            <br />
            Chemist Info
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} style={{ visibility: 'hidden' }} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={ChemistsProfileCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors">
          <Icon icon="doctors" size={32} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists" tabLinkActive>
          <Icon icon="chemists" size={32} color="blue" />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <PageContent id={ChemistsProfileCss.doctorProfilePageContent}>
        {chemist && (
          <>
            <Block id={ChemistsProfileCss.docProfileHeader}>
              <div id={ChemistsProfileCss.docAvatar}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#34c759',
                    color: 'white',
                    fontSize: '30px',
                    width: '65px',
                    height: '65px',
                  }}
                >
                  {createinitials(chemist.name__c)}
                </div>
              </div>
              <p>
                <strong>{chemist.name__c}</strong> <br /> {chemist.timing__c}
              </p>
              <Block id={ChemistsProfileCss.topButtons}>
                <div className={ChemistsProfileCss.topButtonsInner}>
                  <Button small outline style={{ marginRight: '12px' }} href="/chemist-drug-inventory">
                    Drug Inventory
                  </Button>
                  <Button
                    small
                    outline
                    href={`/chemist-order-history/${chemist.uid__c}/`}
                    style={{ marginRight: '12px' }}
                  >
                    Order History
                  </Button>
                  <Button small outline href="/tagged-doctors">
                    Tagged Doctors
                  </Button>
                </div>
              </Block>
            </Block>

            <Block id={ChemistsProfileCss.infoGridBlock}>
              <div className="page-width-wrapper">
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="map" color="blue" />
                  </div>
                  <div>
                    <strong>Location</strong>
                    <br />
                    {chemist.address__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="calendar_month" color="blue" />
                  </div>
                  <div>
                    <strong>Established</strong>
                    <br />
                    {chemist.established__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="phone" color="blue" />
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <br />
                    {chemist.phone__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="email" color="blue" />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <br />
                    {chemist.email__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="grade" color="blue" />
                  </div>
                  <div>
                    <strong>Rating</strong>
                    <br />
                    {chemist.rating__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="fmd_good" color="blue" />
                  </div>
                  <div>
                    <strong>Locality</strong>
                    <br />
                    {chemist.locality__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="location_city" color="blue" />
                  </div>
                  <div>
                    <strong>City</strong>
                    <br />
                    {chemist.city__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="map" color="blue" />
                  </div>
                  <div>
                    <strong>State</strong>
                    <br />
                    {chemist.state__c}
                  </div>
                </div>
                <div className={ChemistsProfileCss.infoDataGrid}>
                  <div className={ChemistsProfileCss.infoDataIcon}>
                    <Icon material="local_shipping" color="blue" />
                  </div>
                  <div>
                    <strong>Pin Code</strong>
                    <br />
                    {chemist.pin_code__c}
                  </div>
                </div>
              </div>
            </Block>
            <Block id={ChemistsProfileCss.startMeetingBtn}>
              <div className="page-width-wrapper">
                <Button
                  large
                  fill
                  onClick={() => f7router.navigate('/start-meeting-chemist', { props: { chemistUID: uid__c } })}
                >
                  <Icon icon="start-meeting" /> START MEETING <Icon material="chevron_right" />
                </Button>
              </div>
            </Block>
          </>
        )}
      </PageContent>
      <div className="page-flex-provider">
        <div className="page-width-wrapper">
          <Fab
            position="right-bottom"
            slot="fixed"
            onClick={() => setShareSheetOpen(true)}
            style={{ marginBottom: '112px' }}
          >
            <Icon md="material:share" />
          </Fab>
        </div>
      </div>
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
          {chemist && (
            <>
              {' '}
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  <p>
                    Share with <strong>{chemist.name__c}</strong>
                  </p>
                </div>
              </Block>
              <hr />
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  <p>Select content type</p>
                  <div id={ChemistsProfileCss.shareModalTop}>
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
                  <div id={ChemistsProfileCss.shareModalTopToggle}>
                    Followup communication <Toggle color="green" />
                  </div>
                </div>
              </Block>
              <hr />
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  <p>Choose communication method</p>
                  <div id={ChemistsProfileCss.shareModalBottom}>
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
                  <div id={ChemistsProfileCss.shareContentBtn}>
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
export default ChemistsProfile;
