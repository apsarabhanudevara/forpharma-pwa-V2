import React, { useEffect, useState, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  f7,
  Gauge,
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Progressbar,
  PageContent,
  Popover,
  Tabs,
  Tab,
  Toolbar,
  BlockTitle,
  Stepper,
} from 'framework7-react';

import RcpaListCss from '../css/rcpa-list.module.css';
import Chart from 'react-apexcharts';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
const SAMPLE_MANU = [
  { uid__c: '73652925551', name__c: 'Sun Pharma' },
  { uid__c: '73652925552', name__c: 'Cipla Ltd' },
  { uid__c: '73652925553', name__c: "Dr. Reddy's Laboratories" },
  { uid__c: '73652925554', name__c: 'Lupin Pharmaceuticals' },
  { uid__c: '73652925555', name__c: 'Glenmark Pharmaceuticals' },
  { uid__c: '73652925556', name__c: 'Aurobindo Pharma' },
  { uid__c: '73652925557', name__c: 'Torrent Pharmaceuticals' },
  { uid__c: '73652925558', name__c: 'Zydus Cadila' },
  { uid__c: '73652925559', name__c: 'Alkem Laboratories' },
  { uid__c: '73652925560', name__c: 'Biocon Ltd' },
  { uid__c: '73652925561', name__c: 'Piramal Enterprises' },
  { uid__c: '73652925562', name__c: 'Cadila Pharmaceuticals' },
  { uid__c: '73652925563', name__c: 'Wockhardt Ltd' },
  { uid__c: '73652925564', name__c: 'Intas Pharmaceuticals' },
  { uid__c: '73652925565', name__c: 'GSK Pharmaceuticals' },
  { uid__c: '73652925566', name__c: 'Serum Institute of India' },
  { uid__c: '73652925567', name__c: 'Mankind Pharma' },
  { uid__c: '73652925568', name__c: 'Gufic Biosciences' },
  { uid__c: '73652925569', name__c: 'Alembic Pharmaceuticals' },
  { uid__c: '73652925570', name__c: 'Sanofi India' },
];

const DEFAULT_CHEMIST = 'Balaji Medical & General Store';

const RcpaEntry = ({ f7router }) => {
  const [selectedChemist, setSelectedChemist] = useState(DEFAULT_CHEMIST);
  const { t } = useTranslation(['retailChemist']);
  // const { t } = useTranslation(['captureorder']);
  const chemists = useLiveQuery(async () => await db.chemists.toArray());
  const drugs = useLiveQuery(async () => await db.drugs.toArray());
  const [manufacturers, setManufacturers] = useState(SAMPLE_MANU);
  const [selectedStore, setSelectedStore] = useState('');
  const [azithromycinValue, setAzithromycinValue] = useState('');
  const [ownValue, setOwnValue] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [azithralValue, setAzithralValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [observationDate, setObservationDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const chemistsDropDownRef = useRef(null);
  const drugsDropDownRef = useRef(null);
  const drugsDropDownCompetitorRef = useRef(null);
  const manufacturerOwnDropDownRef = useRef(null);

  useEffect(() => {
    const $ = f7.$;
    if ($('#chemists-drop-down').length) {
      $('#chemists-drop-down').find('.item-title').text(DEFAULT_CHEMIST);
      $('#chemist-uid').val(DEFAULT_CHEMIST);
    }
  }, []);

  const handleSave = () => {
    props.f7.toast
      .create({
        text: 'Check-in Successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    // setView('list');
  };

  const onPageBeforeRemove = () => {
    if (chemistsDropDownRef.current) {
      chemistsDropDownRef.current.destroy();
    }
    if (drugsDropDownRef.current) {
      drugsDropDownRef.current.destroy();
    }
    if (manufacturerOwnDropDownRef.current) {
      manufacturerOwnDropDownRef.current.destroy();
    }
    if (drugsDropDownCompetitorRef.current) {
      drugsDropDownCompetitorRef.current.destroy();
    }
    f7.form.removeFormData('#capture-rcpa');
  };
  useEffect(() => {
    const $ = f7.$;
    chemistsDropDownRef.current = f7.autocomplete.create({
      openerEl: '#chemists-drop-down a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: 'Start typing Chemists name',
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select Chemists/Stockist',
      limit: 20,
      source(query, render) {
        console.log('Doctor Query: ', query);
        const results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        if (chemists && chemists.length > 0 && query.length > 0) {
          for (let d = 0; d < chemists.length; d += 1) {
            if (chemists[d].name__c.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(chemists[d]);
          }
          // Render items by passing array with result items
          render(results);
        }
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#chemists-drop-down').find('.item-title').text(val[0].name__c);
            $('#chemists-drop-down').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [chemists]);
  useEffect(() => {
    const $ = f7.$;
    drugsDropDownRef.current = f7.autocomplete.create({
      openerEl: '#drugs-drop-down a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: 'Start typing Drug name',
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select the Drug',
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
        console.log('drugs Results: ', drugs);
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#drugs-drop-down').find('.item-title').text(val[0].name__c);
            $('#drugs-drop-down').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [drugs]);
  useEffect(() => {
    const $ = f7.$;
    manufacturerOwnDropDownRef.current = f7.autocomplete.create({
      openerEl: '#manufacturer-own a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: 'Start typing Manufacturer name',
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select the Manufacturer',
      limit: 20,
      source(query, render) {
        const autocomplete = this;
        const results = [];
        if (query.length === 0) {
          results.length = 0;
          render(results);
          return;
        }
        if (manufacturers && manufacturers.length > 0 && query.length > 0) {
          for (let d = 0; d < manufacturers.length; d += 1) {
            if (manufacturers[d].name__c.toLowerCase().indexOf(query.toLowerCase()) >= 0)
              results.push(manufacturers[d]);
          }
          // Render items by passing array with result items
          render(results);
        }
        console.log('manufacturers Results: ', manufacturers);
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#manufacturer-own').find('.item-title').text(val[0].name__c);
            $('#manufacturer-own').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [manufacturers]);
  // Drug Competitor
  useEffect(() => {
    const $ = f7.$;
    drugsDropDownRef.current = f7.autocomplete.create({
      openerEl: '#drugs-drop-down-competitor a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: 'Start typing Drug name',
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select the Competitor Drug',
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
        console.log('drugs Results: ', drugs);
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#drugs-drop-down-competitor').find('.item-title').text(val[0].name__c);
            $('#drugs-drop-down-competitor').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [drugs]);

  useEffect(() => {
    const $ = f7.$;
    manufacturerOwnDropDownRef.current = f7.autocomplete.create({
      openerEl: '#manufacturer-competitor a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: 'Start typing Competitor Manufacturer name',
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'name__c',
      pageTitle: 'Select the Manufacturer',
      limit: 20,
      source(query, render) {
        const autocomplete = this;
        const results = [];
        if (query.length === 0) {
          results.length = 0;
          render(results);
          return;
        }
        if (manufacturers && manufacturers.length > 0 && query.length > 0) {
          for (let d = 0; d < manufacturers.length; d += 1) {
            if (manufacturers[d].name__c.toLowerCase().indexOf(query.toLowerCase()) >= 0)
              results.push(manufacturers[d]);
          }
          // Render items by passing array with result items
          render(results);
        }
        console.log('manufacturers Results: ', manufacturers);
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#manufacturer-competitor').find('.item-title').text(val[0].name__c);
            $('#manufacturer-competitor').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [manufacturers]);
  const handleStoreSelection = (e) => {
    const store = e.target.value;
    setSelectedStore(store);

    if (store) {
      setAzithromycinValue('Azithromycin (Own)');
      setOwnValue('289 (Own)');
      setAzithralValue('Azithral (Competitor)');
      setSecondInputValue('480 (Competitor)');
      setObservationDate('10/10/2024');
      setRemarks('Observation made during the audit');
      setSelectedManufacturer(manufacturers[0].id);
    } else {
      setAzithromycinValue('');
      setOwnValue('');
      setSelectedManufacturer('');
      setAzithralValue('');
      setSecondInputValue('');
      setObservationDate('');
      setRemarks('');
    }
  };

  const handleManufacturerSelection = (e) => {
    setSelectedManufacturer(e.target.value);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let formData = f7.form.convertToData('#capture-rcpa');
    console.log('RCPA formData >> ', formData);
    // const mappedRCPAData = {
    //   rcpaId: parseInt(Math.random(1000) * 1000),
    //   chemistStockistId: formData.chemist_uid,
    //   drugName: formData.drug_uid,
    //   quantity: formData.quantity,
    //   competitordrugName: formData.drug_uid_competitor,
    //   compititirQuantity: formData.quantity_competitor,
    //   observeDate: formData.observation_date_and_time,
    //   remarks: formData.remarks,
    // };
    // f7.store.dispatch('addRCPA', mappedRCPAData);
    await db.rcpas_offline.add(formData).then((id) => {
      let idArray = [];
      idArray.push(id);
      f7.form.removeFormData('#capture-rcpa');
      e.target.reset();
      if (f7.serviceWorker.container.controller && f7.online) {
        f7.serviceWorker.container.controller.postMessage({
          type: 'FORPHARMA_SYNC_RCPAS',
          xids: idArray,
        });
      }
    });
    f7router.navigate('/rcpa-list');
  };
  return (
    <Page className={RcpaListCss.forpharmaPage} onPageBeforeRemove={onPageBeforeRemove}>
      <Navbar className={RcpaListCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.navigate('/rcpa-list')}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={RcpaListCss.pageTitle}>
          <p>
            {t('_RCPA_')}
            <br />
            <span>{t('_RCPA_ENTRY_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={RcpaListCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/retailchemist-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="description_outlined" size={32} color="blue" /> {t('_RCPA_')}
        </Link>
        <Link href="/rcpa-pharma">
          <Icon material="medication_outlined" size={32} /> {t('_PHARMA_')}
        </Link>
        <Link href="/rcpa-doctor">
          <Icon icon="doctors" size={32} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/rcpa-chemist">
          <Icon icon="chemists" size={32} />
          {t('_CHEMIST_')}
        </Link>
      </Toolbar>
      <div className={RcpaListCss.progressContainer}>
        <div>
          <span>Syncing Data</span>
        </div>
        <div>
          <Icon material="cached_outlined" size={21} color="blue" />
        </div>
        <div>
          <Progressbar className={RcpaListCss.customProgressbar} progress={20} id="demo-inline-progressbar" />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          fontSize: '16px',
        }}
      >
        <span>Add RCPA Entry</span>
        <span>
          <Icon material="add_outlined"></Icon>
        </span>
      </div>
      <div>
        <small style={{ marginLeft: '10px' }}>Enter the RCPA quantity (1 unit equals 1 strip or bottle)</small>
      </div>
      <Block>
        <List form formStoreData id="capture-rcpa" onSubmit={handleSubmitForm}>
          <ul>
            <ListItem
              id="chemists-drop-down"
              link="#"
              title="Select Chemist/StockList"
              after=" "
              style={{
                margin: '16px',
                border: '1px solid #72777f',
                padding: '6px 0',
                borderRadius: '4px',
              }}
            >
              <input id="chemist-uid" type="hidden" name="chemist_uid__c" value="Balaji Medical & General Store" />
            </ListItem>
            <ListItem
              id="drugs-drop-down"
              link="#"
              title="Drug Name(Own)"
              after=" "
              style={{
                margin: '16px',
                border: '1px solid #72777f',
                padding: '6px 0',
                borderRadius: '4px',
              }}
            >
              <input type="hidden" id="drug-uid" name="drug_uid__c" />
            </ListItem>
            <li
              style={{
                display: 'flex',
                margin: '16px',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #72777f',
                padding: '2px 16px',
                borderRadius: '4px',
              }}
            >
              <p>Quantity(Own):</p> <Stepper name="quantity__c" />
            </li>
            <ListItem
              id="manufacturer-own"
              link="#"
              title="Manufacturer"
              after=" "
              style={{
                margin: '16px',
                border: '1px solid #72777f',
                padding: '6px 0',
                borderRadius: '4px',
              }}
            >
              <input type="hidden" id="manufacturer-own" name="manufacturer_own" />
            </ListItem>
            <ListItem
              id="drugs-drop-down-competitor"
              link="#"
              title="Drug Name(Competitor)"
              after=" "
              style={{
                margin: '16px',
                border: '1px solid #72777f',
                padding: '6px 0',
                borderRadius: '4px',
              }}
            >
              <input type="hidden" id="drug-uid-competitor" name="comp_drug_uid__c" />
            </ListItem>
            <li
              style={{
                display: 'flex',
                margin: '16px',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #72777f',
                padding: '2px 16px',
                borderRadius: '4px',
              }}
            >
              <p>Quantity(Competitor):</p> <Stepper name="comp_quantity__c" />
            </li>
            <ListItem
              id="manufacturer-competitor"
              link="#"
              title="Manufacturer"
              after=" "
              style={{
                margin: '16px',
                border: '1px solid #72777f',
                padding: '6px 0',
                borderRadius: '4px',
              }}
            >
              <input type="hidden" id="manufacturer-competitor" name="manufacturer_competitor" />
            </ListItem>
            <ListInput name="audit_date__c" label="Observation Date & Time" type="date" outline floatingLabel />
            <ListInput name="remarks__c" label="Remarks" type="text" outline floatingLabel />
            <li style={{ margin: '16px' }}>
              <Button type="submit" fill style={{ backgroundColor: '#2186d4' }} onClick={handleSave}>
                Save
              </Button>
            </li>
          </ul>
        </List>
      </Block>

      {/* <div className={RcpaListCss.buttonContainer}>
        <Button raised fill type="submit">
          Save
        </Button>
      </div> */}
    </Page>
  );
};

export default RcpaEntry;
