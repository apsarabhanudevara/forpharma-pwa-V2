import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  Button,
  Card,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  NavTitle,
  Page,
  Preloader,
  Progressbar,
  Tab,
  Block,
  Tabs,
  Toolbar,
} from 'framework7-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';

import OrderCapturePageCss from '../css/order-capture.module.css';
import Chart from 'react-apexcharts';

const _NAME_SPACE_IDENTIFIER_ = 'ordercapture';
const LINKS = [
  { href: '/forpharma', icon: 'home', label: (t) => t('_HOME_') },
  { tabLink: '#dashboard', icon: 'dashboard', label: (t) => t('_DASHBOARD_'), defaultActive: true },
  { tabLink: '#orders', material: 'add_shopping_cart', label: (t) => t('_ORDERS_') },
  { tabLink: '#status', material: 'task_alt', label: (t) => t('_STATUS_') },
  { tabLink: '#instructions', material: 'menu_book', label: (t) => t('_INSTRUCTIONS') },
];
const legendItems = [
  { label: 'Approved', colorIndex: 0 },
  { label: 'Dispatched', colorIndex: 1 },
  { label: 'Pending', colorIndex: 2 },
  { label: 'Delivered', colorIndex: 3 },
];
const updateFrequencies = ['Weekly Updates', 'Monthly Updates', 'Quarterly Updates', 'Yearly Updates'];
const chart_labels = ['Approved', 'Dispatched', 'Pending', 'Delivered'];

const CreateTrendsChart = ({ dataSet, colors }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const chartData = {
    series: dataSet,
    options: {
      chart: {
        type: 'donut',
      },
      colors: colors,
      responsive: [
        {
          breakpoint: '100%',
          options: {
            chart: {
              width: '100%',
              height: '70%',
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: chart_labels,
      tooltip: {
        enabled: true,
        formatter: (value, { series, seriesIndex }) => {
          return `Value: ${value}<br>Series: ${seriesIndex + 1}`;
        },
      },
    },
  };
  return (
    <Card className={OrderCapturePageCss.chartCard}>
      <Chart options={chartData.options} series={chartData.series} type="donut" />
      <div className={OrderCapturePageCss.chartTitle}>{t('_CHART_TITLE_TEXT_')}</div>
      <div className={OrderCapturePageCss.chartLegendsContainer}>
        {legendItems.map((item) => (
          <div key={item.label}>
            <Icon material="stop" size={22} style={{ color: colors[item.colorIndex] }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const DashboardChartsFrequency = ({ handleItemSelect }) => {
  const [accordionOpened, setAccordionOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(updateFrequencies[1]);

  const toggleAccordion = () => {
    setAccordionOpened((prev) => !prev);
  };

  return (
    <Accordion className={OrderCapturePageCss.chartViewSelection}>
      <AccordionToggle className={OrderCapturePageCss.chartViewSelectionTitle}>
        <div className={OrderCapturePageCss.chartViewControlsValue} onClick={() => toggleAccordion()}>
          <span> {selectedItem}</span>
          <Icon f7={accordionOpened ? 'chevron_up' : 'chevron_down'} size={22} slot="after" />
        </div>
      </AccordionToggle>
      {accordionOpened && (
        <AccordionItem className={OrderCapturePageCss.chartViewSelectionOptions}>
          <List>
            {updateFrequencies.map((item) => (
              <ListItem
                key={item}
                title={item}
                onClick={() => {
                  setSelectedItem(item);
                  handleItemSelect(item);
                  toggleAccordion();
                }}
                style={{ color: '#4A454F' }}
                className={selectedItem === item ? OrderCapturePageCss.selectedItem : ''}
              />
            ))}
          </List>
        </AccordionItem>
      )}
    </Accordion>
  );
};
const DashboardOrderCapture = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const handleItemSelect = (item) => {
    console.log(item);
  };
  return (
    <div className={OrderCapturePageCss.dashboardMainContianer}>
      <DashboardChartsFrequency handleItemSelect={handleItemSelect} />
      <div className={OrderCapturePageCss.sideHeading}>
        <span>{t('_ORDER_TRENDS_TITLE_TEXT_')}</span>
      </div>
      <CreateTrendsChart dataSet={[45, 27, 12, 15]} colors={['#00B295', '#2286D4', '#FEC10D', '#999999']} />
      <div className={OrderCapturePageCss.dashboardViewControls}>
        <Button className={OrderCapturePageCss.buttonOrderCaptureDashboard} large fill href="/team-perf-overview">
          <Icon material="groups" /> {t('_TEAM_SUMMARY_BUTTON_TEXT_')}
        </Button>
        <Button href="/create-order" className={OrderCapturePageCss.buttonOrderCaptureDashboard} large fill>
          <Icon material="add_shopping_cart" /> {t('_CREATE_ORDER_BUTTON_TEXT_')}
        </Button>
      </div>
    </div>
  );
};
const PageTitle = ({ title, titleTag }) => {
  return (
    <Navbar className={OrderCapturePageCss.pageHeader}>
      <NavTitle className={OrderCapturePageCss.pageTitleInfo}>
        <strong>{title}</strong>
        <br />
        <span className={OrderCapturePageCss.pageTitleTag}>{titleTag}</span>
      </NavTitle>
    </Navbar>
  );
};

const TabComponentWithDefault = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={OrderCapturePageCss.tabContent}>
      <div className={OrderCapturePageCss.syncNProgressContianer}>
        <div className={OrderCapturePageCss.syncContianer}>
          <span>{t('_SYNC_LABEL_TEXT_')}</span> <Icon material="sync" color="#2286D4" />
        </div>
        <Progressbar progress={progress} className={OrderCapturePageCss.progressBarCustom} />
      </div>
      <div className={OrderCapturePageCss.preloaderContianer}>
        <Preloader color="#56A3DF" />
        <span>{'Redirecting to Inventory Management'}</span>
      </div>
    </div>
  );
};

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
    <Block strong className={OrderCapturePageCss.targetAchieved}>
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
      <div className={OrderCapturePageCss.noPadding}>
        <span className={OrderCapturePageCss.meetingsCount}>
          <span className={OrderCapturePageCss.dateFont}>Order ID:</span> {orderId} |{' '}
          <span className={OrderCapturePageCss.dateFont}>Date:</span> {date}
        </span>
        <br />
        <span className={OrderCapturePageCss.meetingsCount}>
          <span className={OrderCapturePageCss.dateFont}>Total Quantity:</span> {totalQuantity} |{' '}
          <span className={OrderCapturePageCss.dateFont}>Total Value:</span> {totalValue}
        </span>
        <br />
        <span className={OrderCapturePageCss.meetingsCount}>
          <span className={OrderCapturePageCss.dateFont}> Status: </span>
          <span className={OrderCapturePageCss.orderFont}>{status}</span>
        </span>
        <br />
        <span className={OrderCapturePageCss.meetingsCount}>
          <span className={OrderCapturePageCss.dateFont}>Suggested by:</span>{' '}
          <span className={OrderCapturePageCss.nameFont}>{orderSuggestionBy}</span>
        </span>
      </div>
    </Block>
  );
};

const AllOrderCapture = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const orders = useLiveQuery(() => db.orders.toArray());
  const chemists = useLiveQuery(() => db.chemists.toArray());
  const doctors = useLiveQuery(() => db.doctors.toArray());

  const getOrderSuggestionBy = (chemistUid, doctorUid) => {
    if (chemistUid) {
      const chemist = chemists?.find((c) => c.uid__c === chemistUid);
      return chemist ? chemist.name__c : 'Unknown Chemist';
    } else if (doctorUid) {
      const doctor = doctors?.find((d) => d.uid__c === doctorUid);
      return doctor ? doctor.full_name__c : 'Unknown Doctor';
    }
    return 'Unknown Chemist / Unknown Doctor'; // Default if neither UID is available
  };

  return (
    <div className={OrderCapturePageCss.tabContent}>
      {orders &&
        orders.length > 0 &&
        orders.map((order, index) => {
          const orderSuggestionBy = getOrderSuggestionBy(order.chemist_uid__c, order.doctor_uid__c);
          return (
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
              orderSuggestionBy={orderSuggestionBy} // Pass the relevant name
              status={order.order_status__c || 'Pending'}
            />
          );
        })}
    </div>
  );
};

const MainPagesNavigationComponent = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  return (
    <Toolbar bottom className={OrderCapturePageCss.bottomToolBar}>
      {LINKS.map((link, index) => (
        <Link
          key={index}
          tabLink={link.tabLink}
          tabLinkActive={activeTab === link.tabLink}
          onClick={() => onTabChange(link.tabLink)}
          href={link.href}
        >
          {link.hasOwnProperty('material') ? (
            <Icon material={link.material} size={22} />
          ) : (
            <Icon icon={link.icon} size={22} />
          )}
          {link.label(t)}
        </Link>
      ))}
    </Toolbar>
  );
};

const OrderCapture = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const defaultActiveTab = LINKS.find((link) => link.defaultActive)?.tabLink || LINKS[0].tabLink;
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case '#dashboard':
        return <DashboardOrderCapture />;
      case '#orders':
        return <AllOrderCapture />;
      case '#status':
      case '#instructions':
        return <TabComponentWithDefault />;
    }
  };
  return (
    <Page className={OrderCapturePageCss.orderCapture} pageContent={false}>
      <PageTitle title={t('_PAGE_TITLE_TEXT_')} titleTag={t('_PAGE_TITLE_CAPTION_TEXT_')} />
      <MainPagesNavigationComponent activeTab={activeTab} onTabChange={handleTabChange} />
      <Tabs animated>
        <Tab id={activeTab} className={`page-content ${OrderCapturePageCss.mainContainerTabContent}`} tabActive>
          {renderTabContent()}
        </Tab>
      </Tabs>
    </Page>
  );
};
export default OrderCapture;
