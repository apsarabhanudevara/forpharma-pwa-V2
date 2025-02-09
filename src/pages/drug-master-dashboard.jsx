import React, { useEffect, useState } from 'react';
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
  PageContent,
  Popover,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import DrugMasterDashboardCss from '../css/drugmaster-dashboard.module.css';
import Chart from 'react-apexcharts';

const updateOptions = ['Weekly Updates', 'Monthly Updates', 'Quarterly Updates', 'Annual Updates'];
const chartDataSeries = [
  {
    name: 'Our Segment',
    data: [86, 95, 111, 108, 97, 115, 101, 124, 104],
  },
  {
    name: "Competitor's Segment",
    data: [54, 65, 67, 66, 71, 68, 73, 70, 76],
  },
];

const chartDataOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    labels: {
      show: false,
    },
  },
  fill: {
    colors: ['#F1555A', '#175E95'],
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};

const DrugMasterDashboard = ({ f7router }) => {
  const { t } = useTranslation(['drugmaster']);
  const [updateOptionIndex, setUpdateOptionIndex] = useState(0);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [chartSeries, setChartSeries] = useState(chartDataSeries);
  const [donutChartState, setDonutChartState] = useState(0.65);
  useEffect(() => {
    let tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan2.textContent = 'Competitor';
    tspan2.setAttribute('x', '50%');
    tspan2.setAttribute('dy', '1.5em');
    let tspan3 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan3.textContent = 'Analysis';
    tspan3.setAttribute('x', '50%');
    tspan3.setAttribute('dy', '1.5em');
    let tspan4 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan4.textContent = '';
    tspan4.setAttribute('x', '50%');
    tspan4.setAttribute('dy', '1.5em');
    const t = document.getElementsByClassName('gauge-label-text')[0];
    t.setAttribute('y', '35%');
    t.appendChild(tspan2);
    t.appendChild(tspan3);
    t.appendChild(tspan4);
  }, []);
  // Colum chart data shuffle
  const updateCharts = () => {
    const max = 130;
    const min = 30;
    const newChartDataSeries = [];
    chartDataSeries.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newChartDataSeries.push({ data: data, name: s.name });
    });
    setChartSeries(newChartDataSeries);
    setDonutChartState(Math.round(Math.random() * 100) / 100);
  };
  return (
    <Page className={DrugMasterDashboardCss.forpharmaPage}>
      <Navbar className={DrugMasterDashboardCss.pageNavBar} sliding={false}>
        <NavTitle className={DrugMasterDashboardCss.pageTitle}>
          <p>
            Drug Master
            <br />
            <small id={DrugMasterDashboardCss.titleSmall} style={{ fontSize: '12px' }}>
              Last updated: Oct 1, 2024, 3:26 PM (Hyderabad, India)
            </small>
          </p>
        </NavTitle>
      </Navbar>
      <Toolbar bottom className={DrugMasterDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="dashboard" size={22} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/drug-master">
          <Icon material="local_pharmacy_outlined" size={22} /> {t('_DRUG_MASTER_')}
        </Link>
        <Link href="/compare-drugs">
          <Icon material="compare_arrows_outlined" size={22} /> {t('_COMPARE_DRUGS_')}
        </Link>
        <Link href="/drug-category">
          <Icon material="category_outlined" size={24} />
          {t('_DRUGS_BY_CATEGORY_')}
        </Link>
      </Toolbar>
      <Block id={DrugMasterDashboardCss.doctorDashboardPageContent}>
        <div className="page-width-wrapper">
          <List
            inset
            strong
            id={DrugMasterDashboardCss.chartListBtn}
            style={{
              '--f7-list-inset-border-radius': isUpdateDropdownOpen ? '4px 4px 0px 0px' : '4px',
            }}
          >
            <ListItem
              className="update-options-list-item"
              title={updateOptions[updateOptionIndex]}
              link="#"
              onClick={() => setIsUpdateDropdownOpen(!isUpdateDropdownOpen)}
            />
          </List>
          <Block style={{ padding: 0, margin: 0 }}>
            <p style={{ color: 'white', textAlign: 'center' }}>Weekly Leading Speciality Prescribers</p>
            <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
              <CardContent padding={false}>
                <Chart options={chartDataOptions} series={chartSeries} type="bar" height={175} />
              </CardContent>
            </Card>
          </Block>
          <Block style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
            <div id={DrugMasterDashboardCss.twoColumns} className="grid grid-cols-2 grid-gap">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>Pharma Market Share</p>
                <Card raised style={{ margin: 0, marginRight: '4px', height: '100%' }}>
                  <CardContent
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '8px',
                      paddingTop: '4px',
                    }}
                  >
                    <Gauge
                      type="circle"
                      value={donutChartState}
                      valueTextColor="#000"
                      borderColor="#00B295"
                      borderBgColor="#FC987E"
                      labelText="Weekly"
                      labelTextColor="#000000"
                      labelFontWeight={800}
                      labelFontSize={14}
                      borderWidth={30}
                    />
                    <p style={{ fontSize: 10, marginLeft: 18, marginBottom: 18 }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#00B295',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      35% Our Segment <br />{' '}
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#FC987E',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      65% Competitor's Segment
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <p style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>Pharma Distribution by Area</p>
                <Card raised style={{ margin: 0, marginRight: '4px', height: '100%' }}>
                  <CardContent
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '8px',
                      paddingTop: '4px',
                    }}
                  >
                    <Gauge
                      type="circle"
                      value={donutChartState}
                      valueTextColor="#000"
                      borderColor="#00B295"
                      borderBgColor="#FC987E"
                      labelText="Pharma Distribution"
                      labelTextColor="#000000"
                      labelFontWeight={800}
                      labelFontSize={14}
                      borderWidth={30}
                    />
                    <p style={{ fontSize: 10, marginLeft: 18, marginBottom: 18 }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#00B295',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      35% North <br />{' '}
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#FC987E',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      28% East
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: 'rgb(231, 231, 68)',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      22% West
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: 'rgb(48, 146, 48)',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      15% South
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={DrugMasterDashboardCss.bottomButtons}>
              <Button large fill iconMaterial="groups" style={{ marginRight: '12px' }} href="/team-perf-overview">
                {t('_TEAM_SUMMARY_')}
              </Button>
              <Button large fill iconMaterial="share" href="/connect-doctor-drugmaster">
                {t('_CONNECT_')}
              </Button>
            </div>
          </Block>
        </div>
      </Block>
      <Popover
        className={'popover-menu'}
        opened={isUpdateDropdownOpen}
        targetEl={'.update-options-list-item'}
        arrow={false}
        backdrop={false}
        closeByBackdropClick={false}
        onPopoverClosed={() => {
          setIsUpdateDropdownOpen(false);
          updateCharts();
        }}
        style={{
          marginRight: 'calc(var(--f7-list-inset-side-margin) + var(--f7-safe-area-outer-right))',
          width:
            'calc(100% - (var(--f7-list-inset-side-margin) + var(--f7-safe-area-outer-left) + var(--f7-list-inset-side-margin) + var(--f7-safe-area-outer-right))',
          maxWidth:
            'calc(600px - (var(--f7-list-inset-side-margin) + var(--f7-safe-area-outer-left) + var(--f7-list-inset-side-margin) + var(--f7-safe-area-outer-right))',
          borderRadius: 0,
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          left: '0px !important',
        }}
      >
        <List>
          {updateOptions.map((opt, index) => (
            <ListItem
              key={index}
              popoverClose
              title={updateOptions[index]}
              after={index === updateOptionIndex ? <Icon material="check" color="blue" /> : ''}
              onClick={() => {
                setUpdateOptionIndex(index);
                setIsUpdateDropdownOpen(false);
              }}
            />
          ))}
        </List>
      </Popover>
    </Page>
  );
};

export default DrugMasterDashboard;
