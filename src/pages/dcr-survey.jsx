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
import { Plus, Trash2 } from 'lucide-react';

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
const DCRSurvey = (props) => {
  const { f7router, doctorUID } = props;
  const drugsAutoCompleteRef = useRef(null);
  const notificationWithButton = useRef(null);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [isCreateOrderBtnDisabled, setIsCreateOrderBtnDisabled] = useState(false);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selDrugQuantity, setSelDrugQuantity] = useState([]);
  const drugs = useLiveQuery(async () => await db.drugs.toArray());
  const { t } = useTranslation(['dailyplanner']);

  const [formRows, setFormRows] = useState([
    { id: '1', type: 'sample', selection: '', quantity: '', isOriginal: true },
    { id: '2', type: 'promotion', selection: '', quantity: '', isOriginal: true },
  ]);

  const [formData, setFormData] = useState({
    tourPlan: '',
    doctorName: '',
    visitDate: '',
    visitTime: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addRow = (type, afterId) => {
    const newRow = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      selection: '',
      quantity: '',
      isOriginal: false,
    };

    const index = formRows.findIndex((row) => row.id === afterId);
    const newRows = [...formRows];
    newRows.splice(index + 1, 0, newRow);
    setFormRows(newRows);
  };

  const deleteRow = (id) => {
    setFormRows(formRows.filter((row) => row.id !== id));
  };

  const updateRow = (id, field, value) => {
    setFormRows(formRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleSaveOrder = () => {
    f7.toast
      .create({
        text: 'Order Saved successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
  };

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
    setFormRows([
      { id: '1', type: 'sample', selection: '', quantity: '', isOriginal: true },
      { id: '2', type: 'promotion', selection: '', quantity: '', isOriginal: true },
    ]);
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

  const [activeTab, setActiveTab] = useState('completed'); // Set default active tab

  // Step 2: Handle tab change
  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const VisitNotes = () => {
    // const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
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
          {/* <h2 className={PageCss.formTitle}>DCR Survey</h2> */}
          <div className={PageCss.formGroup}>
            <label htmlFor="tourPlan">Types of Tour Plan</label>
            <select
              id="tourPlan"
              className={PageCss.formControl}
              value={formData.tourPlan}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Field Work">Field Work</option>
              <option value="Office Work">Office Work</option>
            </select>
          </div>
          <div className={PageCss.formGroup}>
            <label htmlFor="tourPlan">Doctor's Name</label>
            <select
              id="doctorName"
              className={PageCss.formControl}
              value={formData.doctorName}
              onChange={handleInputChange}
            >
              <option value="">Select Doctor</option>
              <option value="Field Work">Dr. Rajesh Sharma </option>
              <option value="Office Work">Dr. Priya Mehta </option>
              <option value="Office Work">Dr. Anil Verma </option>
            </select>
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="visitDate">Select Visited Date</label>
            <input
              type="date"
              id="visitDate"
              className={PageCss.formControl}
              value={formData.visitDate}
              onChange={handleInputChange}
              style={{ border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="visitTime">Enter Visit Time</label>
            <input
              type="time"
              id="visitTime"
              className={PageCss.formControl}
              value={formData.visitTime}
              onChange={handleInputChange}
              style={{ border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <List>
            {formRows.map((row) => (
              <ListItem key={row.id}>
                <Block>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-1.5">
                        {row.type === 'sample' ? 'Select Sample' : 'Select Promotional'}
                      </div>
                      <select
                        value={row.selection}
                        onChange={(e) => updateRow(row.id, 'selection', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                        style={{ border: '1px solid #ddd', borderRadius: '6px' }}
                      >
                        {/* <option value="">Select {row.type === 'sample' ? 'Sample' : 'Promotion'}</option> */}
                        {row.type === 'sample' ? (
                          <>
                            <option value=""></option>
                            <option value="Aspirin">Aspirin</option>
                            <option value="Ibuprofen">Ibuprofen</option>
                          </>
                        ) : (
                          <>
                            <option value=""></option>
                            <option value="Paracetamol">Shaker</option>
                            <option value="Amoxicillin">Pen</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      {row.type === 'promotion' && <br />}
                      <div className="text-sm font-medium text-gray-600 mb-1.5">Enter Quantity</div>
                      <input
                        type="number"
                        value={row.quantity !== undefined ? row.quantity : ''}
                        style={{ border: '1px solid #ddd', borderRadius: '6px' }}
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/^0+/, ''); // Prevents leading zeros
                          if (newValue === '' || /^\d+$/.test(newValue)) {
                            updateRow(row.id, 'quantity', newValue);
                          }
                        }}
                        onFocus={(e) => {
                          setTimeout(() => e.target.setSelectionRange(e.target.value.length, e.target.value.length), 0);
                        }} // Ensures cursor stays at the end
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      {row.isOriginal ? (
                        <Button
                          fill
                          small
                          color="blue"
                          onClick={() => addRow(row.type, row.id)}
                          className="w-10 h-10 flex items-center justify-center"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      ) : (
                        <Button
                          fill
                          small
                          color="red"
                          onClick={() => deleteRow(row.id)}
                          className="w-10 h-10 flex items-center justify-center"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Block>
              </ListItem>
            ))}
          </List>

          <div className={PageCss.formGroup}>
            <label htmlFor="productsDiscussed">Products Discussed</label>
            <input
              type="text"
              id="productsDiscussed"
              className={PageCss.formControl}
              style={{ border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <div className={PageCss.formGroup}>
            <label htmlFor="nextVisitDate">Select Next Visit Date</label>
            <input
              type="date"
              id="nextVisitDate"
              className={PageCss.formControl}
              style={{ border: '1px solid #ddd', borderRadius: '6px' }}
            />
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
    // if (!notificationWithButton.current) {
    //   notificationWithButton.current = f7.notification.create({
    //     icon: '<i class="icon icon-f7"></i>',
    //     title: 'Info!',
    //     subtitle: 'Order placed successfully',
    //     closeButton: true,
    //   });
    // }
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
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <span>DCR Survey</span>
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
      {/* <Toolbar top tabbar className={PageCss.topToolBar}> */}
      {/* <Link tabLink="#fresh-tasks" tabLinkActive onClick={() => onTabChange('fresh-tasks')}>
          eDetailing
        </Link> */}
      {/* <Link tabLink="#completed" tabLinkActive onClick={() => onTabChange('completed')}>
          DCR Survey
        </Link> */}
      {/* <Link tabLink="#no-show" onClick={() => onTabChange('no-show')}>
          Place Order
        </Link> */}
      {/* </Toolbar> */}
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        {/* <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link> */}
        <Link tabLink="#completed" tabLinkActive onClick={() => onTabChange('completed')}>
          <Icon material="touch_app" size={32} color="blue" />
          DCR Survey
          {/* {t('_DOCTORS_')} */}
        </Link>
        {/* <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link> */}
      </Toolbar>
      <Tabs animated>
        <Tab id="completed" className="page-content" tabActive>
          <VisitNotes />
        </Tab>
      </Tabs>
    </Page>
  );
};

export default DCRSurvey;
