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
  f7,
  NavRight,
  NavTitle,
  Sheet,
  Toggle,
  Toolbar,
} from 'framework7-react';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import DoctorsProfileCss from '../css/doctors-profile.module.css';
import { db } from '../models/db';
import DoctorMasterInfoCss from '../css/doctor-master-info.module.css';

const DoctorsProfile = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['dailyplanner']);
  const dialogRef = useRef(null);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const doctor = useLiveQuery(async () => await db.doctors.get({ uid__c }));
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleSave = () => {
    f7.toast
      .create({
        text: 'Check-in successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    setView('list');
  };

  const showNoShowDialog = () => {
    dialogRef.current = f7.dialog.create({
      title: `
      <div style="text-align: center;">
        Confirm Doctor Unavailable?
      </div>
        <div style="font-size: 15px; color: #666; margin-top: 5px; text-align: center">Are you sure the doctor was unavailable for the meeting?</div>
        <div style="font-size: 15px; color: #666; margin-top: 5px; text-align: center">Hyderabad, Gacchibowli</div>
        <div style="font-size: 15px; color: #666; margin-top: 5px; text-align: center">Jul 23, 2024, 0:35 AM to 10:40 AM</div>
        <hr style="margin-top: 10px; border: 1px solid #ccc;"/>
        <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 16px; padding: 15px">
          <label>
            <input type="radio" name="availability" value="no_show" style="margin-right: 5px;" checked/> No Show
          </label>
          <div style="font-size: 17px; margin-left: 16px">(For when the doctor is unavailable)</div>
          <br />
          <label>
            <input type="radio" name="availability" value="reschedule" style="margin-right: 5px;" /> Reschedule
          </label>
          <div style="font-size: 17px; margin-left: 16px">(For changing the meeting time)</div>
        </div>
        <hr style="margin-top: 10px; border: 1px solid #ccc;"/>

      `,
      buttons: [
        {
          text: 'Cancel',
          color: 'red',
          onClick() {
            dialogRef.current.close();
          },
        },
        {
          text: 'OK',
          bold: true,
          onClick() {
            const selectedValue = document.querySelector('input[name="availability"]:checked').value;

            if (selectedValue === 'no_show') {
              // Close the dialog and navigate to /doctors with No Show tab activated
              dialogRef.current.close();
              f7router.navigate('/doctors', {
                reloadCurrent: true,
                onComplete: () => {
                  const activeTabLink = document.querySelector('a.tab-link[href="#no-show"]');
                  if (activeTabLink) {
                    activeTabLink.click();
                  }
                },
              });
            } else if (selectedValue === 'reschedule') {
              // Keep the dialog open and navigate to /reschedule-meet
              f7router.navigate('/reschedule-meet');
              dialogRef.current.open();
            }
          },
        },
      ],
    });

    dialogRef.current.open();

    // Adjust styles after opening the dialog
    setTimeout(() => {
      if (dialogRef.current) {
        dialogRef.current.$el.css({
          left: '37%',
          width: '93vw',
        });
      }
    }, 0);
  };

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
            <span>Daily Planner</span>
            <br />
            Doctor Info
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} style={{ visibility: 'hidden' }} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={DoctorsProfileCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="#">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors" tabLinkActive>
          <Icon icon="doctors" size={22} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      {/* <PageContent id={DoctorsProfileCss.doctorProfilePageContent}>
        {doctor && (
          <>
            <Block id={DoctorsProfileCss.docProfileHeader}>
              <div id={DoctorsProfileCss.docAvatar}>
                <img src={RepAvatar} alt="Avatar" />
              </div>
              <p>
                <strong>{doctor.title__c + doctor.full_name__c}</strong> <br /> {doctor.designation}
              </p>
              <Block id={DoctorsProfileCss.topButtons}>
                <div className={DoctorsProfileCss.topButtonsInner}>
                  <Button small outline style={{ marginRight: '2px' }} onClick={showNoShowDialog}>
                    Update Status
                  </Button>
                  <Button small outline style={{ marginRight: '2px' }} href="/transfer-doctor-meeting">
                    Transfer Meeting
                  </Button>
                  <Button small outline href="/tagged-chemist">
                    Tagged Chemist
                  </Button>
                </div>
              </Block>
            </Block>

            <Block id={DoctorsProfileCss.infoGridBlock}>
              <div className="page-width-wrapper">
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="school" color="blue" />
                  </div>
                  <div>
                    <strong>Education</strong>
                    <br />
                    {doctor.qualification__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="local_hospital" color="blue" />
                  </div>
                  <div>
                    <strong>Hospital</strong>
                    <br />
                    {doctor.hospital__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="access_time_filled" color="blue" />
                  </div>
                  <div>
                    <strong>Timing</strong>
                    <br />
                    {doctor.timing__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="person" color="blue" />
                  </div>
                  <div>
                    <strong>About the Doctor</strong>
                    <br />
                    {doctor.bio__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="phone" color="blue" />
                  </div>
                  <div>
                    <strong>Mobile</strong>
                    <br />
                    {doctor.mobile__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="workspace_premium" color="blue" />
                  </div>
                  <div>
                    <strong>Registration No.</strong>
                    <br />
                    {doctor.regn_no__c}
                  </div>
                </div>

                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="grade" color="blue" />
                  </div>
                  <div>
                    <strong>Rating</strong>
                    <br />
                    {doctor.rating__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="fmd_good" color="blue" />
                  </div>
                  <div>
                    <strong>Locality</strong>
                    <br />
                    {doctor.locality__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="location_city" color="blue" />
                  </div>
                  <div>
                    <strong>City</strong>
                    <br />
                    {doctor.city__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="map" color="blue" />
                  </div>
                  <div>
                    <strong>State</strong>
                    <br />
                    {doctor.state__c}
                  </div>
                </div>
                <div className={DoctorsProfileCss.infoDataGrid}>
                  <div className={DoctorsProfileCss.infoDataIcon}>
                    <Icon material="local_shipping" color="blue" />
                  </div>
                  <div>
                    <strong>Pin Code</strong>
                    <br />
                    {doctor.pin_code__c}
                  </div>
                </div>
              </div>
            </Block>
            <Block id={DoctorsProfileCss.startMeetingBtn}>
              <div className="page-width-wrapper">
                <Button
                  large
                  fill
                  onClick={() => f7router.navigate('/start-meeting', { props: { doctorUID: uid__c } })}
                >
                  <Icon icon="start-meeting" /> START MEETING <Icon material="chevron_right" />
                </Button>
              </div>
            </Block>
          </>
        )}
      </PageContent> */}

    <PageContent id={DoctorMasterInfoCss.doctorProfilePageContent}>
            {doctor && (
              <>
                <Block id={DoctorMasterInfoCss.docProfileHeader}>
                              <div id={DoctorMasterInfoCss.docAvatar}>
                                <img src={RepAvatar} alt="Avatar" />
                              </div>
                              <p>
                                <span>{doctor.title__c + doctor.full_name__c}</span>
                                <br />
                                {doctor.designation__c},&nbsp;
                                {doctor.hospital__c}
                                <br />
                                {doctor.timing__c}
                                <br />
                                {doctor.mobile__c}
                              </p>
                            </Block>

                            <Block id={DoctorMasterInfoCss.infoGridBlock}>
                                          <div className="page-width-wrapper">
                                            <div className={DoctorMasterInfoCss.infoDataGrid}>
                                              <div>{doctor.bio__c}</div>
                                            </div>
                                            <div className={DoctorMasterInfoCss.infoDataGrid}>
                                              <div className={DoctorMasterInfoCss.infoDataIcon}>
                                                <Icon material="fmd_good" color="blue" />
                                              </div>
                                              <div>
                                                {doctor.locality__c}, {doctor.city__c}, {doctor.state__c}, {doctor.pin_code__c}
                                              </div>
                                            </div>
                            
                                            {/* Check-in Button (Placed Right After Doctor Info for Better UX) */}
                                            <Block id={DoctorsProfileCss.topButtons}>
                                                    <div className={DoctorsProfileCss.topButtonsInner}>
                                                    <Button small outline style={{ marginRight: '2px' }} onClick={showNoShowDialog} tooltip="Update Status">
                                                      <i className="icon f7-icons">clock</i>
                                                      {/* Update Status */}
                                                      </Button>
                                                      <Button small outline style={{ marginRight: '2px' }} href="/transfer-doctor-meeting" tooltip="Transfer Meeting">
                                                      <i className="icon f7-icons">arrow_right_arrow_left</i>
                                                      
                                                      {/* Transfer Meeting */}
                                                      </Button>
                                                      <Button small outline href="/tagged-chemist" tooltip="Tagged Chemist">
                                                      <i className="icon f7-icons">person_2</i>
                                                      {/* Tagged Chemist */}
                                                      </Button>
                                                    </div>
                                                    
                                            <div
                                              className={DoctorMasterInfoCss.infoDataGrid}
                                              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}
                                            >
                                              <button
                                                id="checkInBtn"
                                                className={DoctorMasterInfoCss.checkInButton}
                                                onClick={handleSave}
                                                 // ✅ Using the toast function
                                                            >
                                                            <i className="icon f7-icons">checkmark_circle</i> Check-in
                                                            </button>
                                                            </div>
                                                            </Block>
                                                            
                                                        
                                                            <div className={DoctorMasterInfoCss.infoDataGrid}>
                                                            <div>
                                                            <p className={DoctorMasterInfoCss.headingTables}>
                                                              Last 3 MR Visits <span>View All</span>
                                                            </p>
                                                            <table className={DoctorMasterInfoCss.tableData}>
                                                              <thead>
                                                              <tr>
                                                              <th>Date</th>
                                                              <th>MR</th>
                                                              <th>Comments</th>
                                                              </tr>
                                                              </thead>
                                                              <tbody>
                                                              <tr>
                                                              <td>18 Jan 24 3:30PM</td>
                                                              <td>Aryan</td>
                                                              <td>Reschedule to 25th Jan</td>
                                                              </tr>
                                                              <tr>
                                                              <td>10 Jan 24 3:30PM</td>
                                                              <td>Aryan</td>
                                                              <td>Reordered existing drugs</td>
                                                              </tr>
                                                              <tr>
                                                              <td>4 Jan 24 10:30AM</td>
                                                              <td>Aryan</td>
                                                              <td>Explained New Drugs</td>
                                                              </tr>
                                                              </tbody>
                                                            </table>
                                                            </div>
                                                            </div>
                                                            <div className={DoctorMasterInfoCss.infoDataGrid}>
                                                            <div>
                                                            <p className={DoctorMasterInfoCss.headingTables}>
                                                              Last 3 Orders Placed <span>View All</span>
                                                            </p>
                                                            <table className={DoctorMasterInfoCss.tableData}>
                                                              <thead>
                                                              <tr>
                                                              <th>Date</th>
                                                              <th>Name</th>
                                                              <th>Price MRP/RP</th>
                                                              <th>Comments</th>
                                                              </tr>
                                                              </thead>
                                                              <tbody>
                                                              <tr>
                                                              <td>18 Jan 24 3:30PM</td>
                                                              <td>Myrion Tablets</td>
                                                              <td>570/500</td>
                                                              <td>Approved</td>
                                                              </tr>
                                                              <tr>
                                                              <td>10 Jan 24 3:30PM</td>
                                                              <td>Amox-300</td>
                                                              <td>650/550</td>
                                                              <td>Dispatched</td>
                                                              </tr>
                                                              <tr>
                                                              <td>4 Jan 24 10:30AM</td>
                                                              <td>Penta-500</td>
                                                              <td>150/130</td>
                                                              <td>Pending</td>
                                                              </tr>
                                                              </tbody>
                                                            </table>
                                                            </div>
                                                            </div>
                                                            </div>
                                                          </Block>
                                                          <Block id={DoctorsProfileCss.startMeetingBtn}>
              <div className="page-width-wrapper">
                <Button
                  large
                  fill
                  
                  onClick={() => f7router.navigate('/start-meeting', { props: { doctorUID: uid__c } })}
                >
                  <Icon icon="start-meeting" /> START MEETING <Icon material="chevron_right" />
                </Button>
              </div>
            </Block>
                                                    </>
                                                    )}
                                                    </PageContent>

                                                  {/* Replace your existing PageContent section with this */}

      <div className="page-flex-provider">
        <div className="page-width-wrapper" style={{ bottom: '65px' }}>
          <Fab position="right-bottom" slot="fixed" onClick={() => setShareSheetOpen(true)}>
            <Icon md="material:campaign" />
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
          {/* <Block className="page-flex-provider">
            <div className="page-width-wrapper">
              <Button large fill className="create-campaign-btn">
                Create Campaign
              </Button>
            </div>
          </Block> */}
          {/* Campaign Card */}
          <Block className="page-flex-provider">
            <div className="campaign-card">
              {/* <div className="campaign-banner">
                <img src="your-image-url.png" alt="Campaign Banner" />
              </div> */}
              <div className="campaign-details">
                <h1 style={{ textAlign: 'center' }}>Campaign</h1>
                <h3>EyeCareWeCare</h3>
                <p>
                  <Icon icon="time" /> 07:00 am, 1 Jan 📍 ForPharma, India, 2024
                </p>
                <p>
                  Eyecarewecare has been created specifically for key stage 2 children and aims to partner teachers and
                  Eye Care Professionals together to improve knowledge of eye health in an innovative and fun way for
                  children.
                </p>
              </div>
            </div>
          </Block>
          {doctor && (
            <>
              {' '}
              <Block className="page-flex-provider">
                <div className="page-width-wrapper">
                  {/* <p>
                    Share with <strong>{doctor.title + doctor.fullname}</strong>
                  </p> */}
                </div>
              </Block>
              <hr />
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
export default DoctorsProfile;
