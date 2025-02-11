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

const OrderHistory = (props) => {
  const { f7router } = props;
  const { t } = useTranslation(['chemiststockist']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const orders = useLiveQuery(() => db.orders.toArray());
  const activities = [
    {
      orderId: 'MCD002',
      date: '11/09/2024',
      totalQuantity: '600',
      totalValue: 'Rs. 15900',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Ananya Sharma',
    },
    {
      orderId: 'MCD003',
      date: '12/09/2024',
      totalQuantity: '800',
      totalValue: 'Rs. 21200',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Rahul Gupta',
    },
    {
      orderId: 'MCD004',
      date: '13/09/2024',
      totalQuantity: '500',
      totalValue: 'Rs. 12500',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Shalini Verma',
    },
    {
      orderId: 'MCD005',
      date: '14/09/2024',
      totalQuantity: '900',
      totalValue: 'Rs. 24750',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Vivek Agarwal',
    },
    {
      orderId: 'MCD006',
      date: '15/09/2024',
      totalQuantity: '700',
      totalValue: 'Rs. 18500',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Meena Kapoor',
    },
    {
      orderId: 'MCD007',
      date: '16/09/2024',
      totalQuantity: '550',
      totalValue: 'Rs. 13750',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Naveen Kumar',
    },
    {
      orderId: 'MCD008',
      date: '17/09/2024',
      totalQuantity: '650',
      totalValue: 'Rs. 16250',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Sneha Patel',
    },
    {
      orderId: 'MCD009',
      date: '18/09/2024',
      totalQuantity: '720',
      totalValue: 'Rs. 18720',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Anil Mehta',
    },
    {
      orderId: 'MCD010',
      date: '19/09/2024',
      totalQuantity: '850',
      totalValue: 'Rs. 22100',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Ramesh Rao',
    },
    {
      orderId: 'MCD011',
      date: '20/09/2024',
      totalQuantity: '780',
      totalValue: 'Rs. 20280',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Priya Nair',
    },
    {
      orderId: 'MCD012',
      date: '21/09/2024',
      totalQuantity: '620',
      totalValue: 'Rs. 15500',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Amit Deshmukh',
    },
    {
      orderId: 'MCD013',
      date: '22/09/2024',
      totalQuantity: '500',
      totalValue: 'Rs. 12750',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Kiran Joshi',
    },
    {
      orderId: 'MCD014',
      date: '23/09/2024',
      totalQuantity: '930',
      totalValue: 'Rs. 23730',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Sonia Chauhan',
    },
    {
      orderId: 'MCD015',
      date: '24/09/2024',
      totalQuantity: '640',
      totalValue: 'Rs. 16320',
      status: 'Pending',
      orderSuggestionBy: 'Dr. Ravi Sharma',
    },
    {
      orderId: 'MCD016',
      date: '25/09/2024',
      totalQuantity: '810',
      totalValue: 'Rs. 20850',
      status: 'Delivered',
      orderSuggestionBy: 'Dr. Manisha Gupta',
    },
  ];

  //   const drugs = useLiveQuery(async () => await db.drugs.get({ uid }));
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
            {t('_CHEMIST_STOCKIST_HEADER_')}
            <br />
            <span>{t('_ORDER_HISTORY_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
          <Link>
            <Icon material="filter_alt_outlined" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={drugMasterCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/chemist-stockist">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={24} color="blue" />
          {t('_CHEMIST_STOCKIST_')}
        </Link>
      </Toolbar>

      {activities.map((activity, index) => (
        <ActivityBlock
          key={index}
          orderId={activity.orderId}
          date={activity.date}
          totalQuantity={activity.totalQuantity}
          totalValue={activity.totalValue}
          orderSuggestionBy={activity.orderSuggestionBy}
          status={activity.status}
        />
      ))}
    </Page>
  );
};
export default OrderHistory;
