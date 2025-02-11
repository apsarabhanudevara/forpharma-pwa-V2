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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import drugMasterCss from '../css/drug-master.module.css';
import { db } from '../models/db';

const ActivityBlock = ({ orderId, date, totalQuantity, totalValue, status, orderSuggestionBy }) => {
  const getStatusIconAndColor = (status) => {
    switch (status) {
      case 'Pending':
        return { icon: 'shopping_cart_outlined', color: '#e66e32' };
      case 'Shipped':
        return { icon: 'shopping_cart', color: '#007bff' };
      case 'Delivered':
        return { icon: 'shopping_cart', color: '#28a745' };
      case 'Cancelled':
        return { icon: 'shopping_cart', color: '#dc3545' };
      default:
        return { icon: '', color: 'transparent' };
    }
  };

  const { icon, color } = getStatusIconAndColor(status);
  return (
    <Block strong className={drugMasterCss.targetAchieved}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: color,
          color: 'white',
          fontSize: '30px',
          width: '65px',
          height: '65px',
          marginLeft: '10px',
        }}
      >
        {/* Render the Material Icon with dynamic background color */}
        {icon && <Icon material={icon} size="24" color="white" />}
      </div>
      <div className={drugMasterCss.noPadding}>
        <span className={drugMasterCss.meetingsCount}>
          <span className={drugMasterCss.dateFont}>Order ID:</span> {orderId} |{' '}
          <span className={drugMasterCss.dateFont}>Date:</span> {date}
        </span>
        <br />
        <span className={drugMasterCss.meetingsCount}>
          <span className={drugMasterCss.dateFont}>Total Quantity:</span> {totalQuantity} |{' '}
          <span className={drugMasterCss.dateFont}>Total Value:</span> {totalValue}
        </span>
        <br />
        <span className={drugMasterCss.meetingsCount}>
          <span className={drugMasterCss.dateFont}> Status: </span>
          <span className={drugMasterCss.orderFont}>{status}</span>
        </span>
        <br />
        <span className={drugMasterCss.meetingsCount}>
          <span className={drugMasterCss.dateFont}>Suggested by:</span>{' '}
          <span className={drugMasterCss.nameFont}>{orderSuggestionBy}</span>
        </span>
      </div>
    </Block>
  );
};

const ChemistOrderHistory = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['dailyplanner']);
  const orders = useLiveQuery(() => db.orders.toArray());
  const chemists = useLiveQuery(() => db.chemists.toArray());

  const getChemistName = (chemistUid) => {
    const chemist = chemists?.find((c) => c.uid__c === chemistUid);
    return chemist ? chemist.name__c : 'Unknown Chemist';
  };

  return (
    <Page className={drugMasterCss.forpharmaPage}>
      <Navbar className={drugMasterCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={drugMasterCss.pageTitle}>
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
      <Toolbar bottom className={drugMasterCss.bottomToolBar} outline={false}>
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
      {orders &&
        orders.length > 0 &&
        orders
          .filter((order) => order.chemist_uid__c !== null && order.chemist_uid__c === uid__c)
          .map((order, index) => (
            <ActivityBlock
              key={index}
              orderId={order.id__c}
              date={
                order.order_date__c
                  ? new Date(order.order_date__c).toLocaleDateString()
                  : new Date().toLocaleDateString()
              }
              totalQuantity={order.quantity__c}
              totalValue={`Rs. ${order.quantity__c * 100}`}
              orderSuggestionBy={getChemistName(order.chemist_uid__c)}
              status={order.order_status__c || 'Pending'}
            />
          ))}
    </Page>
  );
};

export default ChemistOrderHistory;
