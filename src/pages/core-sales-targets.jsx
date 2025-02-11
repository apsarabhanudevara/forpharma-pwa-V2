import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  Button,
  Card,
  CardContent,
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
  Tabs,
  Toolbar,
} from 'framework7-react';

import CoreSalesTargetsCss from '../css/core-sales-targets.module.css';
import Chart from 'react-apexcharts';

const _NAME_SPACE_IDENTIFIER_ = 'coresalestargets';

const LINKS = [
  { href: '/forpharma', icon: 'home', label: (t) => t('_HOME_') },
  { tabLink: '#dashboard', icon: 'dashboard', label: (t) => t('_DASHBOARD_'), defaultActive: true },
  { tabLink: '#doctor', icon: 'doctors', label: (t) => t('_DOCTOR_') },
  { tabLink: '#sales-rep', material: 'medical_srvices', label: (t) => t('_SALES_REP_') },
  { tabLink: '#sales-rollup', icon: 'core-sale-black', label: (t) => t('_SALES_ROLLUP_') },
];
const chartsData = [
  { dataSet: [91], colors: ['#00B295', '#CCCCCC'], target: '98300' },
  { dataSet: [32], colors: ['#2286D4', '#CCCCCC'], target: '98300' },
];
const updateFrequencies = ['Weekly Updates', 'Monthly Updates', 'Quarterly Updates', 'Yearly Updates'];
const legends = [
  { label: 'Total Targets', colorIndex: 0 },
  { label: 'Achieved Targets', colorIndex: 1 },
];

const CreateProgressChart = ({ dataSet, target, colors }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const chartData = {
    series: dataSet,
    colors: colors,
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#CCCCCC',
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          formatter: (val) => `${val}%`,
          title: {
            formatter: () => 'Achived Targets',
          },
        },
      },
      grid: {
        padding: {
          top: -1,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
        colors: colors,
      },
      labels: [],
    },
  };
  return (
    <Card className={CoreSalesTargetsCss.chartCard}>
      <div>
        <span>{t('_DRUG_SALES_CHART_TITLE_TEXT_')}</span>
        <span>{target}</span>
      </div>
      <CardContent>
        <Chart
          className={CoreSalesTargetsCss.chartLablePostion}
          options={chartData.options}
          series={chartData.series}
          type="radialBar"
        />
        <div className={CoreSalesTargetsCss.chartLabelsDiv}>
          <span>{'0%'}</span>
          <span>{'100%'}</span>
        </div>
        <div className={CoreSalesTargetsCss.chartLegendsContainer}>
          {legends.map((item) => (
            <div key={item.label}>
              <Icon material="stop" size={22} style={{ color: colors[item.colorIndex] }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
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
    <Accordion className={CoreSalesTargetsCss.chartViewSelection}>
      <AccordionToggle className={CoreSalesTargetsCss.chartViewSelectionTitle}>
        <div className={CoreSalesTargetsCss.chartViewControlsValue} onClick={() => toggleAccordion()}>
          <span> {selectedItem}</span>
          <Icon f7={accordionOpened ? 'chevron_up' : 'chevron_down'} size={22} slot="after" />
        </div>
      </AccordionToggle>
      {accordionOpened && (
        <AccordionItem className={CoreSalesTargetsCss.chartViewSelectionOptions}>
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
                className={selectedItem === item ? CoreSalesTargetsCss.selectedItem : ''}
              />
            ))}
          </List>
        </AccordionItem>
      )}
    </Accordion>
  );
};

const DashboardViewTargets = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const handleItemSelect = (item) => {
    console.log(item);
  };
  return (
    <div className={CoreSalesTargetsCss.dashboardMainContianer}>
      <DashboardChartsFrequency handleItemSelect={handleItemSelect} />
      <div className={CoreSalesTargetsCss.containerAlign}>
        <span>{t('_SALES_PERFORMANCE_CHART_TITLE_TEXT_')}</span>
      </div>
      {chartsData.map((chart, index) => (
        <CreateProgressChart key={index} dataSet={chart.dataSet} colors={chart.colors} target={chart.target} />
      ))}
      <Button className={CoreSalesTargetsCss.teamSummaryButton} large fill href="/team-perf-overview">
        <Icon material="groups" /> {t('_TEAM_SUMMARY_BUTTON_TEXT_')}
      </Button>
    </div>
  );
};

const MainPagesNavigationComponent = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  return (
    <Toolbar bottom className={CoreSalesTargetsCss.bottomToolBar}>
      {LINKS.map((link, index) => (
        <Link
          key={index}
          tabLink={link.tabLink}
          tabLinkActive={activeTab === link.tabLink}
          onClick={() => onTabChange(link.tabLink)}
          href={link.href}
        >
          {link.hasOwnProperty('material') ? (
            <Icon material={link.material} size={32} />
          ) : (
            <Icon icon={link.icon} size={32} />
          )}
          {link.label(t)}
        </Link>
      ))}
    </Toolbar>
  );
};
const TabComponentWithDefault = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={CoreSalesTargetsCss.tabContent}>
      <div className={CoreSalesTargetsCss.syncNProgressContianer}>
        <div className={CoreSalesTargetsCss.syncContianer}>
          <span>{t('_SYNC_LABEL_TEXT_')}</span> <Icon material="sync" color="#2286D4" />
        </div>
        <Progressbar progress={progress} className={CoreSalesTargetsCss.progressBarCustom} />
      </div>
      <div className={CoreSalesTargetsCss.preloaderContianer}>
        <Preloader color="#56A3DF" />
        <span>{t('_PRE_LOADER_MESSAGE_')}</span>
      </div>
    </div>
  );
};

const PageTitle = ({ title, titleTag }) => {
  return (
    <Navbar className={CoreSalesTargetsCss.pageHeader}>
      <NavTitle className={CoreSalesTargetsCss.pageTitleInfo}>
        <strong>{title}</strong>
        <br />
        <span className={CoreSalesTargetsCss.pageTitleTag}>{titleTag}</span>
      </NavTitle>
    </Navbar>
  );
};

const CoreSalesTargets = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const defaultActiveTab = LINKS.find((link) => link.defaultActive)?.tabLink || LINKS[0].tabLink;
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case '#dashboard':
        return <DashboardViewTargets />;
      case '#doctor':
      case '#sales-rep':
      case '#sales-rollup':
        return <TabComponentWithDefault />;
    }
  };
  return (
    <Page className={CoreSalesTargetsCss.coreSalesTargetsPage} pageContent={false}>
      <PageTitle title={t('_PAGE_TITLE_TEXT_')} titleTag={t('_PAGE_TITLE_CAPTION_TEXT_')} />
      <MainPagesNavigationComponent activeTab={activeTab} onTabChange={handleTabChange} />
      <Tabs animated>
        <Tab id={activeTab} className={`page-content ${CoreSalesTargetsCss.mainContainerTabContent}`} tabActive>
          {renderTabContent()}
        </Tab>
      </Tabs>
    </Page>
  );
};
export default CoreSalesTargets;
