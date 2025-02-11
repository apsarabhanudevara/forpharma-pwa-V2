import React, { useEffect, useState, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  AccordionContent,
  Block,
  BlockTitle,
  Button,
  f7,
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
  Stepper,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import PageCss from '../css/create-order.module.css';
import { db } from '../models/db';

const CreateOrder = ({ f7router }) => {
  {
    /** TODO: implement infinite scroll & Fuzzy Search */
  }
  const doctors = useLiveQuery(async () => await db.doctors.toArray());
  const drugs = useLiveQuery(async () => await db.drugs.toArray());
  const orders = useLiveQuery(async () => await db.orders.toArray());
  const orders_offline = useLiveQuery(async () => await db.orders_offline.toArray());
  const [normalizedOrders, setNormalizedOrders] = useState([]);
  const [normalizedOfflineOrders, setNormalizedOfflineOrders] = useState([]);
  const { t } = useTranslation(['captureorder']);
  const doctorsDropDownRef = useRef(null);
  const drugsDropDownRef = useRef(null);
  const notificationWithButton = useRef(null);
  const onPageBeforeRemove = () => {
    if (doctorsDropDownRef.current) {
      doctorsDropDownRef.current.destroy();
    }
    if (drugsDropDownRef.current) {
      drugsDropDownRef.current.destroy();
    }
    if (notificationWithButton.current) notificationWithButton.current.destroy();
    f7.form.removeFormData('#capture-order');
  };

  useEffect(() => {
    console.log('Create Order: ', doctors);
    const $ = f7.$;
    doctorsDropDownRef.current = f7.autocomplete.create({
      openerEl: '#doctors-drop-down a',
      openIn: 'popup',
      routableModals: true,
      searchbarPlaceholder: "Start typing Doctor's name",
      closeOnSelect: true,
      valueProperty: 'uid__c',
      textProperty: 'full_name__c',
      pageTitle: t('_SELECT_DOCTOR_'),
      limit: 20,
      source(query, render) {
        console.log('Doctor Query: ', query);
        const results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        if (doctors && doctors.length > 0 && query.length > 0) {
          for (let d = 0; d < doctors.length; d += 1) {
            if (doctors[d].full_name__c.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(doctors[d]);
          }
          console.log('Doctor Results: ', doctors);
          // Render items by passing array with result items
          render(results);
        }
      },
      on: {
        change(val) {
          console.log(val);
          if (val?.[0]) {
            $('#doctors-drop-down').find('.item-title').text(val[0].full_name__c);
            $('#doctors-drop-down').find('input').value(val[0].uid__c);
          }
        },
        close(val) {
          f7.popup.close();
        },
      },
    });
  }, [doctors]);

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
      pageTitle: t('_SELECT_DRUG_'),
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
        // console.log('drugs Results: ', drugs);
      },
      on: {
        change(val) {
          // console.log(val);
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
    if (orders && orders.length > 0) {
      Promise.all(
        orders.map(async (order, index) => {
          const getDoctor = await db.doctors.get({ uid__c: order.doctor_uid });
          const getDrug = await db.drugs.get({ uid__c: order.drug_uid });
          return { ...order, name: getDoctor.full_name__c, drug: getDrug.name__c };
        })
      ).then((newOrders) => setNormalizedOrders(newOrders));
    }
  }, [orders]);

  useEffect(() => {
    if (orders_offline && orders_offline.length > 0) {
      Promise.all(
        orders_offline.map(async (order, index) => {
          const getDoctor = await db.doctors.get({ uid__c: order.doctor_uid__c });
          const getDrug = await db.drugs.get({ uid__c: order.drug_uid__c });
          return { ...order, name: getDoctor.full_name__c, drug: getDrug.name__c };
        })
      ).then((newOrders) => setNormalizedOfflineOrders(newOrders));
    }
  }, [orders_offline]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let formData = f7.form.convertToData('#capture-order');
    console.log('formData >> ', formData);
    const orderBody = {
      doctor_uid__c: formData.doctor_uid__c,
      chemist_uid__c: null,
      drug_uid__c: formData.drug_uid__c,
      quantity__c: formData.quantity__c,
      order_date__c: formData.order_date__c,
      delivery_date__c: formData.delivery_date__c,
      order_status__c: formData.order_status__c,
      instructions__c: formData.instructions__c,
    };
    await db.orders_offline.add(orderBody).then((id) => {
      let idArray = [];
      idArray.push(id);
      f7.form.removeFormData('#capture-order');
      e.target.reset();

      if (f7.serviceWorker.container.controller && f7.online) {
        f7.serviceWorker.container.controller.postMessage({
          type: 'FORPHARMA_SYNC_OFFLINE_DATA',
          xids: idArray,
        });
      }
    });
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
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_CAPTURE_ORDER_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={PageCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Capture Order
        </Link>
        <Link tabLink="#completed">List Orders</Link>
        <Link tabLink="#no-show">Pending Sync</Link>
      </Toolbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#">
          <Icon icon="doctors" size={32} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <BlockTitle>Capture order from Doctor</BlockTitle>
          <List form formStoreData id="capture-order" onSubmit={handleSubmitForm}>
            <ul>
              <ListItem
                id="doctors-drop-down"
                link="#"
                title={t('_SELECT_DOCTOR_')}
                after=" "
                style={{
                  margin: '16px',
                  border: '1px solid #72777f',
                  padding: '6px 0',
                  borderRadius: '4px',
                }}
              >
                <input id="doctor-uid" type="hidden" name="doctor_uid__c" />
              </ListItem>
              {/* <ListInput
                label={t('_SELECT_DOCTOR_')}
                type="text"
                placeholder={t('_DOCTORS_NAME_')}
                inputId="doctors-drop-down"
                name="name"
                outline
                floatingLabel
                clearButton
              /> */}
              <ListItem
                id="drugs-drop-down"
                link="#"
                title={t('_SELECT_DRUG_')}
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
              {/* <ListInput
                label={t('_SELECT_DRUG_')}
                type="text"
                inputId="drugs-drop-down"
                placeholder={t('_DRUG_NAME_')}
                name="drug"
                outline
                floatingLabel
                clearButton
              /> */}
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
                <p>Quantity:</p> <Stepper name="quantity__c" />
              </li>
              <ListItem
                title={t('_ORDER_STATUS_')}
                smartSelect
                smartSelectParams={{ openIn: 'popover' }}
                style={{
                  margin: '16px',
                  border: '1px solid #72777f',
                  padding: '6px 0',
                  borderRadius: '4px',
                }}
              >
                <select name="order_status__c" defaultValue="pending">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </select>
              </ListItem>

              <ListInput name="order_date__c" label={t('_ORDER_CAPTURED_ON_')} type="date" outline floatingLabel />

              <ListInput name="delivery_date__c" label={t('_DELVERY_DUE_BY_')} type="date" outline floatingLabel />

              <ListInput
                name="instructions__c"
                label={t('_INSTRUCTIONS_')}
                type="textarea"
                outline
                floatingLabel
                clearButton
              />
              <li style={{ margin: '16px' }}>
                <Button type="submit" fill style={{ backgroundColor: '#2186d4' }}>
                  <Icon material="add" style={{ marginRight: '6px' }} />
                  Create Order
                </Button>
              </li>
            </ul>
          </List>
        </Tab>
        <Tab id="completed" className="page-content">
          <List insetMd accordionList>
            {normalizedOrders &&
              normalizedOrders.length > 0 &&
              normalizedOrders.map((order, index) => (
                <ListItem key={index} accordionItem title={order.drug__c} badge={order.quantity__c}>
                  <AccordionContent>
                    <Block strong>
                      <p>
                        <strong>Quantity: </strong> {order.quantity__c}
                      </p>
                      <p>
                        <strong>Doctor: </strong> <Link href={`/doctor/${order.doctor_uid__c}/`}>{order.name__c}</Link>
                      </p>
                      <p>
                        <strong>Order Date: </strong>
                        {order.order_date__c}
                      </p>
                      <p>
                        <strong>Delivery Date: </strong>
                        {order.delivery_date__c}
                      </p>
                      <p>
                        <strong>Instructions: </strong>
                        {order.instructions__c}
                      </p>
                    </Block>
                  </AccordionContent>
                </ListItem>
              ))}
          </List>
        </Tab>
        <Tab id="no-show" className="page-content">
          <List insetMd accordionList>
            {normalizedOfflineOrders && normalizedOfflineOrders.length > 0 ? (
              normalizedOfflineOrders.map((order, index) => (
                <ListItem key={index} accordionItem title={order.drug__c} badge={order.quantity__c}>
                  <AccordionContent>
                    <Block strong>
                      <p>
                        <strong>Quantity: </strong> {order.quantity__c}
                      </p>
                      <p>
                        <strong>Doctor: </strong> <Link href={`/doctor/${order.doctor_uid__c}/`}>{order.name__c}</Link>
                      </p>
                      <p>
                        <strong>Order Date: </strong>
                        {order.order_date__c}
                      </p>
                      <p>
                        <strong>Delivery Date: </strong>
                        {order.delivery_date__c}
                      </p>
                      <p>
                        <strong>Instructions: </strong>
                        {order.instructions__c}
                      </p>
                    </Block>
                  </AccordionContent>
                </ListItem>
              ))
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                YaY! No orders pending
              </div>
            )}
          </List>
        </Tab>
      </Tabs>
    </Page>
  );
};

export default CreateOrder;
