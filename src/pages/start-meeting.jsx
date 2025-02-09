import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';
import {
  Icon,
  Link,
  Navbar,
  ListItem,
  NavLeft,
  NavRight,
  NavTitle,
  List,
  Page,
  Toolbar,
  Block,
  f7,
  Fab,
  Button,
  Tabs,
  Progressbar,
  Tab,
  Card,
  CardContent,
  Stepper,
  AccordionContent,
} from 'framework7-react';

import PageCss from '../css/start-meeting.module.css';
import { db } from '../models/db';
import BioSplit from '../assets/images/biosplit.png'; // adjust the path if necessary
import CyproNect from '../assets/images/cypronect.png'; // adjust the path if necessary

const openConfirmDoctorsSync = () => {
  f7.dialog.confirm("Sync Doctor's data now?", () => {
    f7.dialog.preloader("Doctor's sync in progress...");
    f7.serviceWorker.container.controller.postMessage({ type: 'SYNC_DOCTORS_NOW' });
    f7.serviceWorker.container.onmessage = (e) => {
      if (e.data && e.data.type === 'DOCTORS_SYNC_COMPLETE') {
        f7.dialog.close();
      }
    };
  });
};
const visitedNotes = [
  {
    id: 1,
    title: 'Note file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'description',
    color: '#999999',
  },
  {
    id: 2,
    title: 'Picture file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'image',
    color: '#FEC00E',
  },
  {
    id: 3,
    title: 'Video file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'video_file',
    color: '#185D93',
  },
  {
    id: 4,
    title: 'Audio file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'audio_file',
    color: '#2286D4',
  },
  {
    id: 5,
    title: 'Document file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'assignment',
    color: '#F1555A',
  },
];
const _NAME_SPACE_IDENTIFIER_ = 'coresalesvisits';
const StartMeeting = (props) => {
  const { f7router, doctorUID } = props;
  const drugsAutoCompleteRef = useRef(null);
  const notificationWithButton = useRef(null);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [isCreateOrderBtnDisabled, setIsCreateOrderBtnDisabled] = useState(false);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selDrugQuantity, setSelDrugQuantity] = useState([]);
  const drugs = useLiveQuery(async () => await db.drugs.toArray());
  const { t } = useTranslation(['dailyplanner']);

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
    const $ = f7.$;
    drugsAutoCompleteRef.current = f7.autocomplete.create({
      openerEl: '.drugPopupOpener',
      openIn: 'popup',
      multiple: true,
      searchbarPlaceholder: 'Start typing Drug name',
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select Drugs',
      popupCloseLinkText: 'Go Back',
      limit: 20,
      source(query, render) {
        const autocomplete = this;
        const results = [];
        if (query.length === 0) {
          results.length = 0;
          render(results);
          return;
        }
        if (drugs && drugs.length > 0 && query.length > 0) {
          for (let d = 0; d < drugs.length; d += 1) {
            if (drugs[d].name__c.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(drugs[d]);
          }
          // Render items by passing array with result items
          render(results);
        }
      },
      on: {
        change(val) {
          if (val) {
            setSelectedDrugs((selectedDrugs) => [...new Set([...selectedDrugs, ...val])]);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [drugs, selectedDrugs]);

  useEffect(() => {}, [selectedDrugs]);

  const onPageBeforeRemove = () => {
    if (drugsAutoCompleteRef.current) {
      drugsAutoCompleteRef.current.destroy();
    }
    if (notificationWithButton.current) notificationWithButton.current.destroy();
  };

  const [activeTab, setActiveTab] = useState('fresh-tasks'); // Set default active tab

  // Step 2: Handle tab change
  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const VisitNotes = () => {
    const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
    const [progress, setProgress] = useState(30);
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleAccordion = (index) => {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    };
    return (
      <div className="formContainer">
        <form id="dcrForm" className={PageCss.dcrForm}>
          <h2 className={PageCss.formTitle}>DCR Survey</h2>
          <div className={PageCss.formGroup}>
            <label htmlFor="tourPlan">Types of Tour Plan</label>
            <select id="tourPlan" className={PageCss.formControl}>
              <option value="">Select</option>
              <option value="Field Work">Field Work</option>
              <option value="Office Work">Office Work</option>
            </select>
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="doctorName">Doctor's Name</label>
            <select id="doctorName" className={PageCss.formControl}>
              <option value="">Select Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
            </select>
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="visitDate">Select Visited Date</label>
            <input type="date" id="visitDate" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="visitTime">Enter Visit Time</label>
            <input type="time" id="visitTime" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="sample">Select Sample</label>
            <select id="sample" className={PageCss.formControl}>
              <option value="">Select Sample</option>
              <option value="Sample A">Sample A</option>
              <option value="Sample B">Sample B</option>
            </select>
            <input type="number" placeholder="Enter Quantity for Samples" min="0" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="promotions">Select Promotional Inputs</label>
            <select id="promotions" className={PageCss.formControl}>
              <option value="">Select Promotions</option>
              <option value="Promotion A">Promotion A</option>
              <option value="Promotion B">Promotion B</option>
            </select>
            <input
              type="number"
              placeholder="Enter Quantity Promotional Inputs"
              min="0"
              className={PageCss.formControl}
            />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="productsDiscussed">Products Discussed</label>
            <input type="text" id="productsDiscussed" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="pob">Enter POB</label>
            <input type="number" id="pob" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="nextVisitDate">Select Next Visit Date</label>
            <input type="date" id="nextVisitDate" className={PageCss.formControl} />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" className={PageCss.formControl}></textarea>
          </div>

          <div className={PageCss.buttonGroup}>
            <button type="button" id="saveBtn" className={`${PageCss.button} ${PageCss.save}`} onClick={handleSave}>
              Save
            </button>
            <button type="reset" className={`${PageCss.button} ${PageCss.cancel}`}>
              Cancel
            </button>
          </div>

          <div id="toastMessage" class="toast"></div>
        </form>
      </div>
    );
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsProgressBarVisible(true);
    setIsCreateOrderBtnDisabled(true);
    let formData = f7.form.convertToData('#capture-order');
    for (const [key, value] of Object.entries(formData)) {
      const orderBody = {
        doctor_uid__c: doctorUID,
        drug_uid__c: key,
        quantity__c: value,
      };
      if (value != 0) {
        await db.orders_offline.add(orderBody);
      }
    }
    f7.form.removeFormData('#capture-order');
    e.target.reset();
    setIsProgressBarVisible(false);
    setSelectedDrugs([]);
    setIsCreateOrderBtnDisabled(false);
    if (f7.serviceWorker.container.controller && f7.online) {
      f7.serviceWorker.container.controller.postMessage({
        type: 'FORPHARMA_SYNC_OFFLINE_DATA',
      });
    }
    if (!notificationWithButton.current) {
      notificationWithButton.current = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Info!',
        subtitle: 'Order placed successfully',
        closeButton: true,
      });
    }
    notificationWithButton.current.open();
  };

  return (
    <Page className={PageCss.forpharmaPage} pageContent={false} onPageBeforeRemove={onPageBeforeRemove}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={32} />
          </Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_MEETING_IN_PROGRESS_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={32} />
          </Link>
          {activeTab === 'completed' && ( // Conditionally render additional icon for completed tab
            <Link>
              <Icon material="filter_alt" color="white" size={32} />
            </Link>
          )}
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={PageCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive onClick={() => onTabChange('fresh-tasks')}>
          eDetailing
        </Link>
        <Link tabLink="#completed" onClick={() => onTabChange('completed')}>
          DCR Survey
        </Link>
        <Link tabLink="#no-show" onClick={() => onTabChange('no-show')}>
          Place Order
        </Link>
      </Toolbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="doctors" size={22} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <div className={PageCss.progressContainer}>
            <div>
              <span>Syncing Data</span>
            </div>
            <div>
              <Icon material="cached_outlined" size={21} color="blue" />
            </div>
            <div>
              <Progressbar className={PageCss.customProgressbar} progress={20} id="demo-inline-progressbar" />
            </div>
          </div>

          <Card>
            <CardContent>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/CFB3cGG5fxs"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                />
              </div>
              <p>ForPharma Visual Aid</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/J5QsCfiakd8"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                />
              </div>
              <p>ForPharma Visual Aid</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/wt_renA2mrw"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                />
              </div>
              <p>ForPharma Visual Aid</p>
            </CardContent>
          </Card>

          <Fab position="right-bottom" slot="fixed" style={{ bottom: '90px' }} href="/document">
            <Icon material="edit_note" />
          </Fab>
        </Tab>

        <Tab id="completed" className="page-content">
          <VisitNotes />
          <Fab position="right-bottom" slot="fixed" style={{ bottom: '90px' }} href="/document">
            <Icon material="edit_note" />
          </Fab>
        </Tab>
        <Tab id="no-show" className="page-content">
          <div
            className={PageCss.progressContainer}
            style={{ visibility: isProgressBarVisible ? 'visible' : 'hidden' }}
          >
            <span style={{ width: '140px' }}>Syncing Data</span>
            <Icon
              material="cached_outlined"
              size={21}
              color="blue"
              style={{ marginRight: '10px', maginLeft: '10px' }}
            />
            <Progressbar
              className={PageCss.customProgressbar}
              id="demo-inline-progressbar"
              infinite={isProgressBarVisible}
            />
          </div>
          <List mediaList form formStoreData id="capture-order" onSubmit={handleSubmitForm}>
            <ul>
              {selectedDrugs.length == 0 ? (
                <li>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '48px',
                    }}
                  >
                    <Button
                      large
                      fill
                      className="drugPopupOpener"
                      style={{ maxWidth: '300px' }}
                      iconMaterial="vaccines"
                    >
                      &nbsp; Select Drugs
                    </Button>
                  </div>
                </li>
              ) : (
                selectedDrugs.map((drug, index) => {
                  return (
                    <ListItem
                      key={index}
                      mediaItem
                      title={drug.name__c}
                      subtitle={drug.composition__c}
                      text={drug.manufacturer__c}
                      style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
                    >
                      <img
                        slot="media"
                        style={{ height: '100%', width: '100%', maxHeight: '64px', maxWidth: '64px' }}
                        src={drug.image__c}
                      />
                      <Button
                        slot="after"
                        iconMaterial="close"
                        color="blue"
                        style={{ width: '24px', height: '24px' }}
                        onClick={() =>
                          setSelectedDrugs((selectedDrugs) => selectedDrugs.filter((d) => d.uid__c !== drug.uid__c))
                        }
                      />
                      <Stepper id={drug.uid__c} name={drug.uid__c} style={{ marginTop: '6px' }}></Stepper>
                    </ListItem>
                  );
                })
              )}
            </ul>
            <Block id={PageCss.startMeetingBtn}>
              <Button
                large
                fill
                href="/start-meeting"
                style={{ marginRight: '12px', flex: 1 }}
                onClick={() => openCheckinDialog()}
                iconMaterial="motion_photos_off"
              >
                End Meeting
              </Button>
              <Button
                large
                fill
                iconMaterial="add_shopping_cart"
                disabled={selectedDrugs.length == 0 || isCreateOrderBtnDisabled}
                type="submit"
                style={{
                  backgroundColor: selectedDrugs.length == 0 || isCreateOrderBtnDisabled ? '#000' : '#14ae5c',
                  flex: 1,
                }}
              >
                Create Order
              </Button>
            </Block>
          </List>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default StartMeeting;
