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
import Chart from 'react-apexcharts';

import PageCss from '../css/doctor-master-dashboard.module.css';

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

const DoctorMasterDashboard = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  const [updateOptionIndex, setUpdateOptionIndex] = useState(0);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [chartSeries, setChartSeries] = useState(chartDataSeries);
  const [donutChartState, setDonutChartState] = useState(0.65);
  useEffect(() => {
    let tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan2.textContent = 'Active';
    tspan2.setAttribute('x', '50%');
    tspan2.setAttribute('dy', '1.5em');
    let tspan3 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan3.textContent = 'Prescription';
    tspan3.setAttribute('x', '50%');
    tspan3.setAttribute('dy', '1.5em');
    let tspan4 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan4.textContent = 'Doctors';
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
    <Page className={PageCss.forpharmaPage}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            Doctor Master
            <br />
            <small id={PageCss.titleSmall}>Last updated: Oct 1, 2024, 3:26 PM (Hyderabad, India)</small>
          </p>
        </NavTitle>
      </Navbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/forpharma" tabLinkActive>
          <Icon icon="dashboard" size={22} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctor-master">
          <Icon icon="doctors" size={22} color="white" />
          Doctor Master
        </Link>
        <Link href="/doctor-speciality">
          <Icon f7="heart" size={22} />
          Doctors by Speciality
        </Link>
        <Link href="/doctor-location">
          <Icon material="person_pin_circle_outline" size={22} />
          Doctors by Location
        </Link>
      </Toolbar>
      <Block id={PageCss.doctorDashboardPageContent}>
        <div className="page-width-wrapper">
          <List
            inset
            strong
            id={PageCss.chartListBtn}
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
            <div id={PageCss.twoColumns} className="grid grid-cols-2 grid-gap">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>Weekly Prescription Doctors</p>
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
                      labelText={'Weekly'}
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
                      Our Segment <br />{' '}
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#FC987E',
                          marginRight: '4px',
                          display: 'inline-block',
                        }}
                      ></span>
                      Competitor's Segment
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <p style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>Weekly Top 5 doctors</p>
                <Card raised style={{ margin: 0, marginLeft: '4px', height: '100%' }}>
                  <CardContent padding={false}>
                    <List dividers id={PageCss.topDoctors}>
                      <ListItem link="#" noChevron>
                        Dr.Sridhar Reddy Peddi
                      </ListItem>
                      <ListItem link="#" noChevron>
                        Dr.Devi Shetty
                      </ListItem>
                      <ListItem link="#" noChevron>
                        Dr. Pratap C. Reddy
                      </ListItem>
                      <ListItem link="#" noChevron>
                        Dr.Jugal Kishore
                      </ListItem>
                      <ListItem link="#" noChevron>
                        Dr.Siddhartha Mukherjee
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={PageCss.bottomButtons}>
              <Button large fill iconMaterial="groups" style={{ marginRight: '12px' }} href="/team-perf-overview">
                {t('_TEAM_SUMMARY_')}
              </Button>
              <Button large fill iconMaterial="share" href="/connect-doctor">
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

export default DoctorMasterDashboard;
