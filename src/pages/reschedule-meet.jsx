import React, { useEffect, useRef } from 'react';
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

const RescheduleMeet = ({ f7router }) => {
  {
    /** TODO: implement infinite scroll */
  }
  const doctors = useLiveQuery(async () => await db.doctors.toArray());
  const dialogRef = useRef(null);
  console.log(doctors);
  const { t } = useTranslation(['dailyplanner']);

  const handleBack = () => {
    // Prevent the dialog from closing
    if (dialogRef.current && dialogRef.current.opened) {
      // If the dialog is open, do NOT close it
      console.log('Dialog is still open, preventing close.');
    } else {
      // Navigate back if dialog is not open
      f7router.back();
    }
  };

  return (
    <Page className={PageCss.forpharmaPage} pageContent={false}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={handleBack}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            Reschedule Meet
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <div className="page-content">
        <Card>
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>John Doe</div>
              <div>Sr. Medical Representative</div>
            </div>

            {/* Horizontal Line */}
            <hr style={{ marginTop: '20px', border: '1px solid #ccc' }} />

            <div style={{ marginTop: '70px', textAlign: 'center' }}>Select a new Date and Time</div>

            {/* List with Date Picker */}
            <List strongIos outlineIos className={PageCss.calender}>
              <ListInput
                outline
                type="datepicker"
                placeholder="Select date or range"
                readonly
                calendarParams={{ openIn: 'customModal', header: true, footer: true, rangePicker: true }}
              >
                <Icon material="calendar_month" slot="inner-end" color="blue" />
              </ListInput>
            </List>

            <div style={{ marginTop: '70px', textAlign: 'center' }}>
              <p>Meetin Doctor Detals</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {doctors &&
                doctors.slice(0, 1).map((doctor, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center', // Vertically center the image and text
                      justifyContent: 'center', // Center the whole content
                      backgroundColor: '#e9f3fb',
                      borderRadius: '4px',
                      margin: '8px 16px',
                      padding: '10px',
                      width: '100%', // Take full width of the container
                      maxWidth: '500px', // Optional: Set a max width for the item
                    }}
                  >
                    {/* Image */}
                    {(index + 1) % 3 === 0 ? (
                      <div
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
                          marginRight: '20px', // Add space between image and text
                        }}
                      >
                        {createinitials(doctor.full_name__c)}
                      </div>
                    ) : (
                      <img style={{ borderRadius: '50%', marginRight: '20px' }} width={65} src={RepAvatar} />
                    )}

                    {/* Text Content */}
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {doctor.title__c + ' ' + doctor.full_name__c}
                      </div>
                      <div>{doctor.designation__c}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{doctor.timing__c}</div>
                      <div>{doctor.city__c + ' ' + doctor.state__c}</div>
                    </div>
                  </div>
                ))}
            </div>
            <Block id={PageCss.topButtons}>
              <div className={PageCss.topButtonsInner}>
                <Button small outline style={{ marginRight: '12px' }} onClick={handleBack}>
                  Cancel
                </Button>
                <Button small outline color="blue" style={{ marginRight: '12px' }} href="/doctors">
                  Ok
                </Button>
              </div>
            </Block>
          </CardContent>
        </Card>
      </div>

      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default RescheduleMeet;
