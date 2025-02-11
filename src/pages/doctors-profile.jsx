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
  const [meetingStatus, setMeetingStatus] = useState(false);

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

  const openCheckinDialog = () => {
    var checkin_dialog = f7.dialog
      .create({
        content: `
              <div style="text-align: center; margin-top: 0;">
                <h2 style="margin: 0; padding-top: 10px;"><strong>Fantastic!</strong></h2>
                <p style="margin: 0;">You've finished the</p>
                <p style="margin: 0;">Doctor meeting successfully</p>
                <hr style="margin: 15px 0;" />
                <div>
                  <label style="display: block; margin: 10px 0; text-align: center;">
                    <div style="font-size: 36px;">😊</div>
                    <input type="radio" name="options" value="option1" style="margin-top: 5px;" />
                    <span style="margin-left: 5px;">Exceptional</span>
                  </label>
                  <label style="display: block; margin: 10px 0; text-align: center;">
                    <div style="font-size: 36px;">😮</div>
                    <input type="radio" name="options" value="option2" style="margin-top: 5px;" />
                    <span style="margin-left: 5px;">Impressive</span>
                  </label>
                  <label style="display: block; margin: 10px 0; text-align: center;">
                    <div style="font-size: 36px;">😐</div>
                    <input type="radio" name="options" value="option3" style="margin-top: 5px;" />
                    <span style="margin-left: 5px;">Satisfactory</span>
                  </label>
                  <label style="display: block; margin: 10px 0; text-align: center;">
                    <div style="font-size: 36px;">😕</div>
                    <input type="radio" name="options" value="option4" style="margin-top: 5px;" />
                    <span style="margin-left: 5px;">Adequate</span>
                  </label>
                  <label style="display: block; margin: 10px 0; text-align: center;">
                    <div style="font-size: 36px;">😟</div>
                    <input type="radio" name="options" value="option5" style="margin-top: 5px;" />
                    <span style="margin-left: 5px;">Unsatisfactory</span>
                  </label>
                </div>
              </div>
                <hr style="margin: 15px 0;" />
            `,
        buttons: [
          {
            text: 'Ok',
            onClick: () => {
              f7.dialog.close(); // Close the dialog when 'Ok' is clicked
              f7router.navigate('/doctors'); // Use f7router to navigate to the /doctors route
            },
          },
          {
            text: 'Close',
            onClick: () => {
              f7.dialog.close(); // Close the dialog when 'Close' is clicked
            },
          },
        ],
        verticalButtons: false,
        cssClass: 'custom-dialog-class',
      })
      .open();
  };

  const handleMeetingToggle = () => {
    console.log('Meeting status: ', meetingStatus);
    setMeetingStatus(!meetingStatus);
    if (!meetingStatus) {
      console.log('Meeting status: ', meetingStatus);
      f7router.navigate('/start-meeting', { props: { doctorUID: uid__c } });
    } else {
      // Add any additional logic for ending the meeting if needed
      console.log('Meeting status: ', meetingStatus);
      openCheckinDialog();
    }
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
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="#">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors" tabLinkActive>
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>

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
                <div className={DoctorMasterInfoCss.infoDataGrid}>
                  <div className={DoctorMasterInfoCss.specializationsHeader}>
                    {/* <div className={DoctorMasterInfoCss.infoDataIcon}>
                    <Icon material="medical_services" color="blue" />
                  </div> */}
                    <div>
                      <p style={{ fontWeight: 'bold', paddingBottom: '2px' }}>Specializations:</p>
                    </div>
                    <div className={DoctorMasterInfoCss.specializationsGrid}>
                      <div>Preventive Medicine</div>
                      <div>Planning Advice</div>
                      <div>Weight Loss</div>
                      <div>Bites and Stings</div>
                      <div>Hypertension</div>
                      <div>Pain</div>
                      <div>Diagnosing</div>
                      <div>Viral Fever</div>
                      <div>Injuries</div>
                      <div>Gastritis</div>
                      <div>Allergies</div>
                      <div>Genital Herpes</div>
                      <div>Malaria</div>
                      <div>Polyuria</div>
                    </div>
                  </div>
                </div>

                <Block id={DoctorsProfileCss.topButtons}>
                  <div className={DoctorsProfileCss.topButtonsInner}>
                    <Button
                      small
                      fill
                      style={{
                        background: 'green',
                        color: 'white',
                        padding: '28px',
                        justifyContent: 'center',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                      onClick={handleSave}
                    >
                      <i className="icon f7-icons" style={{ marginTop: '5px', fontSize: '20px' }}>
                        checkmark_circle
                      </i>
                      Check-in
                    </Button>
                    <Button
                      small
                      fill
                      style={{
                        background: '#b21919',
                        color: 'white',
                        padding: '28px',
                        justifyContent: 'center',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                      onClick={handleMeetingToggle}
                    >
                      <i className="icon f7-icons" style={{ marginTop: '5px', fontSize: '20px' }}>
                        videocam_fill
                      </i>
                      {meetingStatus ? 'End Meeting' : 'Start Meeting'}
                    </Button>
                  </div>
                </Block>

                {/* Check-in Button (Placed Right After Doctor Info for Better UX) */}
                <Block id={DoctorsProfileCss.topButtons}>
                  <div className={DoctorsProfileCss.topButtonsInner}>
                    <Button
                      small
                      outline
                      style={{
                        background: '#00639C',
                        color: 'white',
                        padding: '28px',
                        marginTop: '60px',
                        marginBottom: '30px',
                        justifyContent: 'center',
                        gap: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                      }}
                      onClick={showNoShowDialog}
                      tooltip="Update Status"
                    >
                      <i className="icon f7-icons" style={{ marginTop: '5px', fontSize: '20px' }}>
                        clock
                      </i>
                      Update Status
                    </Button>
                    {/* <Button
                      small
                      outline
                      style={{
                        background: '#00639C',
                        color: 'white',
                        padding: '28px',
                        marginTop: '60px',
                        marginBottom: '30px',
                        justifyContent: 'center',
                        gap: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                      }}
                      href="/transfer-doctor-meeting"
                      tooltip="Transfer Meeting"
                    >
                      <i className="icon f7-icons" style={{ marginTop: '5px', fontSize: '20px' }}>
                        arrow_right_arrow_left
                      </i>
                      Transfer Meeting
                    </Button> */}
                    <Button
                      small
                      outline
                      style={{
                        background: '#00639C',
                        color: 'white',
                        padding: '28px',
                        marginTop: '60px',
                        marginBottom: '30px',
                        justifyContent: 'center',
                        gap: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                      }}
                      href="/tagged-chemist"
                      tooltip="Tagged Chemist"
                    >
                      <i className="icon f7-icons" style={{ marginTop: '5px', fontSize: '20px' }}>
                        person_2
                      </i>
                      Tagged Chemist
                    </Button>
                  </div>
                </Block>

                <div className={DoctorMasterInfoCss.infoDataGrid}>
                  <div style={{ marginTop: '30px' }}>
                    <p className={DoctorMasterInfoCss.headingTables}>
                      Last 3 Visit History <span>View All</span>
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
            <Block id={DoctorsProfileCss.startMeetingBtn}></Block>
          </>
        )}
      </PageContent>

      <Fab position="right-bottom" slot="fixed" onClick={() => setShareSheetOpen(true)}>
        <Icon md="material:campaign" />
      </Fab>

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

        <PageContent style={{ padding: '15px' }}>
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
