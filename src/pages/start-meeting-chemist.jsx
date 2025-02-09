import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';
import {
  Icon,
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Toolbar,
  Block,
  f7,
  Button,
  Tabs,
  Progressbar,
  Tab,
  List,
  ListItem,
  Card,
  CardContent,
  AccordionContent,
  Stepper,
} from 'framework7-react';

import { db } from '../models/db';

import StartChemistMeetingCss from '../css/start-meeting-chemist.module.css';
// const mediaItems = [];
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

const MediaTools = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={StartChemistMeetingCss.tabContent}>
      <div className={StartChemistMeetingCss.syncNProgressContianer}>
        <div>
          <span className={StartChemistMeetingCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
          <Icon className={StartChemistMeetingCss.syncContianer} material="sync" color="#2286D4" />
        </div>
        <div className={StartChemistMeetingCss.progressBarContainer}>
          <Progressbar progress={progress} className={StartChemistMeetingCss.progressBarCustom} />
        </div>
      </div>
      <Card>
        <CardContent>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/GEMIa3LiLII"
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
      <Button className={StartChemistMeetingCss.addNotesButton} large href="/document">
        <Icon material="edit_note" size="45px" />
      </Button>
    </div>
  );
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
    <div className={StartChemistMeetingCss.tabContentVisitNotes}>
      <div className={StartChemistMeetingCss.syncNProgressContianer}>
        <div>
          <span className={StartChemistMeetingCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
          <Icon className={StartChemistMeetingCss.syncContianer} material="sync" color="#2286D4" />
        </div>
        <div className={StartChemistMeetingCss.progressBarContainer}>
          <Progressbar progress={progress} className={StartChemistMeetingCss.progressBarCustom} />
        </div>
      </div>
      <List accordionList>
        {visitedNotes.map((note) => (
          <ListItem
            className={StartChemistMeetingCss.cardItemNotes}
            key={note.id}
            accordionItem
            noChevron
            title={
              <div className={StartChemistMeetingCss.cardItemTitle}>
                <div className={StartChemistMeetingCss.notesIconContainer} style={{ backgroundColor: note.color }}>
                  <Icon material={note.material} size={37} />
                </div>
                <div className={StartChemistMeetingCss.divFlex}>
                  <span> {note.title}</span>
                  <span style={{ fontSize: '10px' }}>{note.created}</span>
                </div>
              </div>
            }
            after={<Icon material="keyboard_arrow_down" style={{ fontSize: '39px' }} color="blue" />}
          >
            <AccordionContent>
              <Block>
                <p>{note.note}</p>
              </Block>
            </AccordionContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const StartMeetingChemist = (props) => {
  const { f7router, chemistUID } = props;
  const drugsAutoCompleteRef = useRef(null);
  const notificationWithButton = useRef(null);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [isCreateOrderBtnDisabled, setIsCreateOrderBtnDisabled] = useState(false);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selDrugQuantity, setSelDrugQuantity] = useState([]);
  const drugs = useLiveQuery(async () => await db.drugs.toArray());
  const { t } = useTranslation(['dailyplanner']);

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

  const onPageBeforeRemove = () => {
    if (drugsAutoCompleteRef.current) {
      drugsAutoCompleteRef.current.destroy();
    }
    if (notificationWithButton.current) notificationWithButton.current.destroy();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsProgressBarVisible(true);
    setIsCreateOrderBtnDisabled(true);
    let formData = f7.form.convertToData('#capture-order');
    for (const [key, value] of Object.entries(formData)) {
      const orderBody = {
        chemist_uid__c: chemistUID,
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

  const [activeTab, setActiveTab] = useState('visual-aid');

  const onTabChange = (tab) => {
    setActiveTab(tab);
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
              f7router.navigate('/chemist'); // Use f7router to navigate to the /doctors route
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

  return (
    <Page className={StartChemistMeetingCss.forpharmaPage} pageContent={false} onPageBeforeRemove={onPageBeforeRemove}>
      <Navbar className={StartChemistMeetingCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={StartChemistMeetingCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_MEETING_IN_PROGRESS_')}
          </p>
        </NavTitle>
        <NavRight>
          {activeTab !== 'cart' && (
            <Link>
              <Icon material="search" color="white" size={36} />
            </Link>
          )}
          {activeTab === 'cart' && (
            <Link>
              <Icon material="add_shopping_cart" color="white" size={36} />
            </Link>
          )}
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={StartChemistMeetingCss.topToolBar}>
        <Link tabLink="#visual-aid" tabLinkActive onClick={() => onTabChange('visual-aid')}>
          Visual Aid
        </Link>
        <Link tabLink="#documentation" onClick={() => onTabChange('documentation')}>
          Documentation
        </Link>
        <Link tabLink="#cart" onClick={() => onTabChange('cart')}>
          Cart
        </Link>
        {/* <Link tabLink="#tracker" onClick={() => onTabChange('tracker')}>
          Tracker
        </Link> */}
      </Toolbar>
      <Toolbar bottom className={StartChemistMeetingCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors">
          <Icon icon="doctors" size={22} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="visual-aid" className={`page-content`} tabActive>
          <MediaTools />
        </Tab>
        <Tab id="documentation" className={`page-content`}>
          <VisitNotes />
        </Tab>
        <Tab id="cart" className="page-content">
          <div
            className={StartChemistMeetingCss.progressContainer}
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
              className={StartChemistMeetingCss.customProgressbar}
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
            <Block id={StartChemistMeetingCss.startMeetingBtn}>
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
        {/* <Tab id="tracker" className="page-content">
          <Block id={StartChemistMeetingCss.startMeetingBtn}>
            <div className="page-width-wrapper">
              <Button large fill onClick={() => openCheckinDialog()}>
                <Icon icon="start-meeting" /> END MEETING <Icon material="chevron_right" />
              </Button>
            </div>
          </Block>
        </Tab> */}
      </Tabs>
    </Page>
  );
};

export default StartMeetingChemist;
