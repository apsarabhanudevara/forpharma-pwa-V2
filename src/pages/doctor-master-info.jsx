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
import DoctorMasterInfoCss from '../css/doctor-master-info.module.css';
import { db } from '../models/db';

const DoctorMasterInfo = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['dailyplanner']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const [sheetSuccess, setSheetSuccess] = useState(false);
  const [currentSheet, setCurrentSheet] = useState('DCR');
  const [hidden, setHidden] = useState(false);
  const doctor = useLiveQuery(async () => await db.doctors.get({ uid__c }));

  const handleSave = () => {
    f7.toast
      .create({
        text: 'DCR Survey Saved successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    setView('list');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Page pageContent={false}>
      <Navbar className={DoctorMasterInfoCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
            <span style={{ color: 'white' }}>{doctor ? `${doctor.full_name__c} Info` : 'Doctor Info'}</span>
          </Link>
        </NavLeft>
        {/* <NavTitle className={DoctorMasterInfoCss.pageTitle}>
          <p>
            <span>Doctor Info</span>
          </p>
        </NavTitle> */}
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} style={{ visibility: 'hidden' }} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={DoctorMasterInfoCss.bottomToolBar} outline={false}>
        {/* <div
          onClick={() => {
            setShareSheetOpen(true);
            setSheetSuccess(false);
            setCurrentSheet('DCR');
          }}
          className={DoctorMasterInfoCss.footerIcon}
        >
          <Icon material="post_add" />
          DCR Survey
        </div> */}
        {/* <Link href="/doctor-master-dashboard">
          <Icon material="display_settings" />E Detailing
        </Link> */}
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={22} color="blue" />
          Doctor Info
        </Link>
        {/* <Link href="/doctor-speciality">
          <Icon material="history" />
          Reschedule
        </Link> */}
        {/* <div
          onClick={() => {
            setShareSheetOpen(true);
            setSheetSuccess(false);
            setCurrentSheet('Campaign');
          }}
          className={DoctorMasterInfoCss.footerIcon}
        >
          <Icon material="campaign" />
          Campaign
        </div> */}
      </Toolbar>
      <PageContent id={DoctorMasterInfoCss.doctorProfilePageContent}>
        {doctor && (
          <>
            <Block id={DoctorMasterInfoCss.docProfileHeader} className={hidden ? DoctorMasterInfoCss.hidden : ''}>
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
                <div
                  className={DoctorMasterInfoCss.infoDataGrid}
                  style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}
                >
                  <button
                    id="checkInBtn"
                    className={DoctorMasterInfoCss.checkInButton}
                    onClick={handleSave} // ✅ Using the toast function
                  >
                    <i className="icon f7-icons">checkmark_circle</i> Check-in
                  </button>
                </div>

                <div className={DoctorMasterInfoCss.infoDataGrid}>
                  <div>
                    <p className={DoctorMasterInfoCss.headingTables}>
                      Last 3 MR Visits <span>View All</span>
                    </p>
                    <table className={DoctorMasterInfoCss.tableData}>
                      <tr>
                        <td>Date</td>
                        <td>MR </td>
                        <td>Comments</td>
                      </tr>
                      <tr>
                        <td>18 Jan 24 3:30PM</td>
                        <td>Aryan</td>
                        <td>Reschedule to 25th Jan</td>
                      </tr>
                      <tr>
                        <td>10 Jan 24 3:30PM</td>
                        <td>Aryan</td>
                        <td>Reorderd existing drugs</td>
                      </tr>
                      <tr>
                        <td>4 Jan 24 10:30AM</td>
                        <td>Aryan</td>
                        <td>Explained New Drugs</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className={DoctorMasterInfoCss.infoDataGrid}>
                  <div>
                    <p className={DoctorMasterInfoCss.headingTables}>
                      Last 3 Orders Placed<span>View All</span>
                    </p>
                    <table className={DoctorMasterInfoCss.tableData}>
                      <tr>
                        <td>Date</td>
                        <td>Name</td>
                        <td>Price MRP/RP </td>
                        <td>Comments</td>
                      </tr>
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
                    </table>
                  </div>
                </div>
              </div>
            </Block>
            {/* <Block id={DoctorMasterInfoCss.startMeetingBtn}>
              <div className="page-width-wrapper">
                <Button large fill>
                  <Icon icon="start-meeting" /> START MEETING <Icon material="chevron_right" />
                </Button>
              </div>
            </Block> */}
          </>
        )}
      </PageContent>
      {/* <div className="page-flex-provider">
        <div className="page-width-wrapper">
          <Fab position="right-bottom" slot="fixed" onClick={() => setShareSheetOpen(true)}>
            <Icon md="material:share" />
          </Fab>
        </div>
      </div> */}
      <Sheet
        opened={shareSheetOpen}
        className="demo-sheet-swipe-to-close"
        style={{ height: 'auto', maxHeight: '90%' }}
        swipeToClose
        push
        backdrop
        onSheetClosed={() => {
          setShareSheetOpen(false);
          setSheetSuccess(false);
        }}
      >
        <div className="swipe-handler"></div>

        <PageContent>
          {/* <BlockTitle large>Share with Dr.Sridhar Peddi Reddi</BlockTitle> */}
          {doctor && (
            <>
              {currentSheet == 'DCR' && (
                <form id={DoctorMasterInfoCss.dcrForm} className={sheetSuccess ? DoctorMasterInfoCss.sheetSuccess : ''}>
                  <h2>DCR Survey</h2>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="tourPlan">Types of Tour Plan</label>
                    <select id="tourPlan">
                      <option value="">Select</option>
                      <option value="Field Work">Field Work</option>
                      <option value="Office Work">Office Work</option>
                    </select>
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="doctorName">Doctor's Name</label>
                    <select id="doctorName">
                      <option value="">Select Doctor</option>
                      <option value="Dr. Smith">Dr. Smith</option>
                      <option value="Dr. Johnson">Dr. Johnson</option>
                    </select>
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Select Visited Date</label>
                    <input type="date" id="visitDate" />
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitTime">Enter Visit Time</label>
                    <input type="time" id="visitTime" />
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="sample">Select Sample</label>
                    <select id="sample">
                      <option value="">Select Sample</option>
                      <option value="Sample A">Sample A</option>
                      <option value="Sample B">Sample B</option>
                    </select>
                    <input type="number" placeholder="Enter Quantity for Samples" min="0" />
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="sample">Select Promotional Inputs</label>
                    <select id="sample">
                      <option value="">Select Promotions</option>
                      <option value="Sample A">Promotios A</option>
                      <option value="Sample B">Promotion B</option>
                    </select>
                    <input type="number" placeholder="Enter Quantity Promotional Inputs" min="0" />
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Products Discussed</label>
                    <input type="text" />
                  </div>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Enter POB</label>
                    <input type="number" />
                  </div>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Select Next Visit Date</label>
                    <input type="date" />
                  </div>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Comments</label>
                    <textarea></textarea>
                  </div>
                  <div className={DoctorMasterInfoCss.buttonGroup}>
                    <button type="button" className={DoctorMasterInfoCss.save} onClick={() => setSheetSuccess(true)}>
                      Save
                    </button>
                    <button
                      type="reset"
                      className={DoctorMasterInfoCss.cancel}
                      onClick={() => {
                        setShareSheetOpen(false);
                        setSheetSuccess(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                  <div id="successMessage" className={DoctorMasterInfoCss.successMessage}>
                    DCR saved successfully!
                  </div>
                </form>
              )}
              {currentSheet == 'Campaign' && (
                <form id={DoctorMasterInfoCss.dcrForm} className={sheetSuccess ? DoctorMasterInfoCss.sheetSuccess : ''}>
                  <h2>Campaigns</h2>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="tourPlan">Select Campaign</label>
                    <select id="tourPlan">
                      <option value="">Select</option>
                      <option value="Field Work">Heart Awareness Campaign</option>
                      <option value="Office Work">Exercise Awareness Campaign</option>
                    </select>
                  </div>

                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Select Start Date</label>
                    <input type="date" id="visitDate" />
                  </div>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Select End Date</label>
                    <input type="date" id="visitDate" />
                  </div>
                  <div className={DoctorMasterInfoCss.formGroup}>
                    <label for="visitDate">Comments</label>
                    <textarea></textarea>
                  </div>
                  <div className={DoctorMasterInfoCss.buttonGroup}>
                    <button type="button" className={DoctorMasterInfoCss.save} onClick={() => setSheetSuccess(true)}>
                      Save
                    </button>
                    <button
                      type="reset"
                      className={DoctorMasterInfoCss.cancel}
                      onClick={() => {
                        setShareSheetOpen(false);
                        setSheetSuccess(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                  <div id="successMessage" className={DoctorMasterInfoCss.successMessage}>
                    Campaign saved successfully!
                  </div>
                </form>
              )}
            </>
          )}
        </PageContent>
      </Sheet>
    </Page>
  );
};
export default DoctorMasterInfo;
