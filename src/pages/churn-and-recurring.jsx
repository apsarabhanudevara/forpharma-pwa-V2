import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Block,
  BlockTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Popup,
  Tabs,
  Tab,
  Toolbar,
  Progressbar,
} from 'framework7-react';

import Chart from 'react-apexcharts';
import ChurnRecurringCss from '../css/churn-recurring.module.css';
const updateOptions = ['Team 1', 'Team 2', 'Team 3'];
const teamsPerformance = [
  {
    name: 'T1',
    precentage: 40,
    progressColor: 'green',
  },
  {
    name: 'T2',
    precentage: 50,
    progressColor: 'orange',
  },
  {
    name: 'T3',
    precentage: 60,
  },
  {
    name: 'T4',
    precentage: 80,
  },
  {
    name: 'T5',
    precentage: 90,
  },
  {
    name: 'T6',
    precentage: 50,
  },
  {
    name: 'T4',
    precentage: 80,
  },
  {
    name: 'T5',
    precentage: 90,
  },
  {
    name: 'T6',
    precentage: 50,
  },
];
const keyInsights = [
  {
    statistics: 'Frequency Compliance',
    milestone: 30,
    grades: 850,
    capability: 950,
  },
  {
    statistics: 'Overall Calls',
    milestone: 50,
    grades: 750,
    capability: 850,
  },
  {
    statistics: 'Overall Chemist Calls',
    milestone: 80,
    grades: 550,
    capability: 650,
  },
  {
    statistics: 'Monthly Core RCPA',
    milestone: 50,
    grades: 650,
    capability: 550,
  },
  {
    statistics: 'RCPA Quaterly Audit',
    milestone: 90,
    grades: 150,
    capability: 450,
  },
];
const topPerformers = [
  {
    name: 'Chandhrashekhar Reddy',
    teams: 'Team One',
    grades: '850',
  },
  {
    name: 'Ashwin Deshpande',
    teams: 'Team Two',
    grades: '650',
  },
  {
    name: 'Gopinath S',
    teams: 'Team Ten',
    grades: '850',
  },
  {
    name: 'Somanth W',
    teams: 'Team Three',
    grades: '850',
  },
  {
    name: 'Rajashekar Reddy',
    teams: 'Team Four',
    grades: '750',
  },
];
const teamChartVals = {
  series: [
    {
      name: 'Teams',
      data: [30, 50, 80, 40, 35, 45],
    },
  ],
  options: {
    chart: {
      height: 250,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '40%',
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },

    xaxis: {
      categories: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6'],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    title: {
      text: 'July 2024 - September 2024',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  },
};

const ChurnAndRecurring = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  const [drugChartState, setDrugChartState] = useState(0.91);
  const [deviceChartState, setDeviceChartState] = useState(0.32);
  const [keyInsightsData, setKeyInsightsData] = useState(keyInsights);
  const [topPerformersData, setTopPerformersData] = useState(topPerformers);
  let drugChartValue = `${drugChartState * 100}%`;
  let deviceChartValue = `${deviceChartState * 100}%`;
  return (
    <Popup>
      <Page className={ChurnRecurringCss.forpharmaPage}>
        <Navbar className={ChurnRecurringCss.pageNavBar} sliding={false}>
          <NavLeft>
            <Link href="#"></Link>
          </NavLeft>
          <NavTitle className={ChurnRecurringCss.pageTitle}>
            <p>
              RCPA
              <br />
              <span id={ChurnRecurringCss.titleSmall}>Recurring and Churn</span>
            </p>
          </NavTitle>
          <NavRight>
            <Link popupClose>
              <Icon material="close" color="white" />
            </Link>
          </NavRight>
        </Navbar>
        <Block id={ChurnRecurringCss.doctorDashboardPageContent}>
          <div className="page-width-wrapper">
            {/* <Block className={ChurnRecurringCss.teamPerfInsights} strong>
              <p className={ChurnRecurringCss.teamPerfProgress}>
                {teamsPerformanceData.map((teamPerf, index) => {
                  return (
                    <span>
                      <Progressbar key={index} className={ChurnRecurringCss.customProgressbar} progress={teamPerf.precentage} />
                    </span>
                  );
                })}
              </p>
              <p className={ChurnRecurringCss.teamPerfMonth}>July 2024 - September 2024</p>
            </Block> */}
            <BlockTitle className={ChurnRecurringCss.teamPerfInsightsHeading}>
              <span>Overall Recurring</span>
            </BlockTitle>
            <section className={ChurnRecurringCss.segmentedRankAndGrades}>
              <Block strong className={ChurnRecurringCss.segmentedBlock}>
                <p>{t('_SEGMENTED_RANK_')}</p>
                <section className={ChurnRecurringCss.segmentedRank}>
                  <section className={ChurnRecurringCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="Monthly"
                      valueFontSize={34}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={25}
                    />
                    <p>
                      Monthly <br />
                      <small>Recurring Revenue</small>
                    </p>
                  </section>
                  <section className={ChurnRecurringCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="Quarterly"
                      valueFontSize={34}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={25}
                    />
                    <p>
                      Quarterly <br />
                      <small>Recurring Revenue</small>
                    </p>
                  </section>
                  <section className={ChurnRecurringCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="Yealy"
                      valueFontSize={34}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={25}
                    />
                    <p>
                      Yealy <br />
                      <small>Recurring Revenue</small>
                    </p>
                  </section>
                </section>
              </Block>
            </section>

            <BlockTitle className={ChurnRecurringCss.teamPerfInsightsHeading}>
              <span>Recurring Revenuew by Chemist</span>
            </BlockTitle>
            <Block style={{ padding: 0, margin: 0 }}>
              {/* <p style={{ color: 'white', textAlign: 'center' }}>Team Performance Overview</p> */}
              <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
                <CardHeader style={{ padding: 0, minHeight: '36px' }}>
                  <Toolbar tabbar className={ChurnRecurringCss.cardHeaderToolBar}>
                    <Link tabLink="#tab-1" tabLinkActive>
                      Monthly(MRR)
                    </Link>
                    <Link tabLink="#tab-2">Quarterly(QRR)</Link>
                    <Link tabLink="#tab-3">Yearly(YRR)</Link>
                  </Toolbar>
                </CardHeader>
                <CardContent padding={false} style={{ marginBottom: '35px' }}>
                  <Tabs>
                    <Tab id="tab-1" tabActive>
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={ChurnRecurringCss.myStatisticsRow}>
                          <strong>Revenue</strong>
                          <strong>Location</strong>
                          <strong>Chemist</strong>
                        </section>
                        {keyInsightsData?.map((keyInsight, index) => {
                          return (
                            <section className={ChurnRecurringCss.myStatisticsRow} key={index}>
                              <span>{keyInsight.statistics}</span>
                              {/* <span>{keyInsight.milestone}</span> */}
                              <span>{keyInsight.grades}</span>
                              <span>{keyInsight.capability}</span>
                            </section>
                          );
                        })}
                      </Block>
                    </Tab>
                    <Tab id="tab-2">
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <p>Tab 2 content</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis
                          laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit
                          temporibus sequi iure ad laboriosam accusamus?
                        </p>
                      </Block>
                    </Tab>
                    <Tab id="tab-3">
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <p>Tab 3 content</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis
                          laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit
                          temporibus sequi iure ad laboriosam accusamus?
                        </p>
                      </Block>
                    </Tab>
                  </Tabs>
                </CardContent>
              </Card>
            </Block>

            <BlockTitle className={ChurnRecurringCss.teamPerfInsightsHeading}>
              <span>Churn by Chemist</span>
            </BlockTitle>
            <Block style={{ padding: 0, margin: 0 }}>
              <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
                <CardHeader style={{ padding: 0, minHeight: '36px' }}>
                  <Toolbar tabbar className={ChurnRecurringCss.cardHeaderToolBar}>
                    <Link tabLink="#tab-4" tabLinkActive>
                      Monthly(MC)
                    </Link>
                    <Link tabLink="#tab-5">Quarterly(QC)</Link>
                    <Link tabLink="#tab-6">Yearly(YC)</Link>
                  </Toolbar>
                </CardHeader>
                <CardContent padding={false}>
                  <Tabs>
                    <Tab id="tab-4" tabActive>
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={ChurnRecurringCss.topPerformerRow}>
                          <strong>Revenue</strong>
                          <strong>Location</strong>
                          <strong>Chemist</strong>
                        </section>
                        {topPerformersData?.map((topPerformer, index) => {
                          return (
                            <section className={ChurnRecurringCss.topPerformerRow} key={index}>
                              <span>{topPerformer.name}</span>
                              <span>{topPerformer.teams}</span>
                              <span>{topPerformer.grades}</span>
                            </section>
                          );
                        })}
                      </Block>
                    </Tab>
                    <Tab id="tab-5">
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <p>Tab 2 content</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis
                          laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit
                          temporibus sequi iure ad laboriosam accusamus?
                        </p>
                      </Block>
                    </Tab>
                    <Tab id="tab-6">
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <p>Tab 3 content</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis
                          laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit
                          temporibus sequi iure ad laboriosam accusamus?
                        </p>
                      </Block>
                    </Tab>
                  </Tabs>
                </CardContent>
              </Card>
            </Block>
          </div>
        </Block>
      </Page>
    </Popup>
  );
};

export default ChurnAndRecurring;
