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

import PageCss from '../css/team-perf-overview.module.css';

const updateOptions = ['Team 1', 'Team 2', 'Team 3'];

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

const TeamPerformanceOverview = ({ f7router }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {},
        },
      },
      colors: ['#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: ['#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6'],
            fontSize: '12px',
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartData({
      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        colors: ['#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6', '#1a72b6'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          },
        },
        dataLabels: {
          enabled: true,
          position: 'top', // Simulate the position 'top' behavior
          formatter: function (val, opts) {
            const name = opts.w.config.xaxis.categories[opts.dataPointIndex];
            return Array.isArray(name) ? name.join(' ') : name; // Display the category name
          },
          offsetY: -20, // Moves the label above the bar
          style: {
            fontSize: '12px',
            colors: ['#000'],
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [['T1'], ['T2'], ['T3'], 'T4', ['T5'], ['T6'], ['T7'], ['T8']],
          labels: {
            show: false, // Hide the labels at the bottom
          },
        },
        yaxis: {
          show: false, // Optional: Show y-axis labels
        },
      },
    });
  }, []);

  const { t } = useTranslation(['dailyplanner']);
  const [updateOptionIndex, setUpdateOptionIndex] = useState(0);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [drugChartState, setDrugChartState] = useState(0.91);
  const [deviceChartState, setDeviceChartState] = useState(0.32);
  const [teamChart, setTeamChart] = useState(teamChartVals);
  const [team, setTeam] = useState('Team3');
  const [keyInsightsData, setKeyInsightsData] = useState(keyInsights);
  const [topPerformersData, setTopPerformersData] = useState(topPerformers);
  let drugChartValue = `${drugChartState * 100}%`;
  let deviceChartValue = `${deviceChartState * 100}%`;
  return (
    <Popup>
      <Page className={PageCss.forpharmaPage}>
        <Navbar className={PageCss.pageNavBar} sliding={false}>
          <NavLeft>
            <Link href="#"></Link>
          </NavLeft>
          <NavTitle className={PageCss.pageTitle}>
            <p>
              Team Performance Overview
              <br />
              <small id={PageCss.titleSmall}>September 2024 - Octoer 2024</small>
            </p>
          </NavTitle>
          <NavRight>
            <Link popupClose>
              <Icon material="close" color="white" />
            </Link>
          </NavRight>
        </Navbar>
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
                className="team-overview-list-item"
                title={updateOptions[updateOptionIndex]}
                link="#"
                onClick={() => setIsUpdateDropdownOpen(!isUpdateDropdownOpen)}
              />
            </List>
            {/* <Block className={PageCss.teamPerfInsights} strong>
              <p className={PageCss.teamPerfProgress}>
                {teamsPerformanceData.map((teamPerf, index) => {
                  return (
                    <span>
                      <Progressbar key={index} className={PageCss.customProgressbar} progress={teamPerf.precentage} />
                    </span>
                  );
                })}
              </p>
              <p className={PageCss.teamPerfMonth}>July 2024 - September 2024</p>
            </Block> */}
            <BlockTitle className={PageCss.teamPerfInsightsHeading}>
              <span>Team Performance Insights</span>
            </BlockTitle>
            <Block
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                margin: '0 4%',
                borderRadius: '8px',
                padding: '8px',
                width: '90%', // Ensures it adjusts dynamically
                maxWidth: '400px', // Limits width on larger screens
              }}
            >
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height="auto"
                width="100%" // Makes it responsive
              />
            </Block>
            {/* <BlockTitle className={PageCss.teamPerfInsightsHeading}>
              <span>Key Insights</span>
            </BlockTitle> */}
            <Block style={{ padding: 0, margin: 0 }}>
              {/* <p style={{ color: 'white', textAlign: 'center' }}>Team Performance Overview</p> */}
              <Card raised style={{ marginTop: 10, marginBottom: 0 }}>
                <CardHeader style={{ padding: 0, minHeight: '43px' }}>
                  <Toolbar tabbar className={PageCss.cardHeaderToolBar}>
                    <Link tabLink="#tab-1" tabLinkActive>
                      My Statistics
                    </Link>
                    {/* <Link tabLink="#tab-2">Monthly Stars</Link>
                    <Link tabLink="#tab-3">Quarterly Stars</Link> */}
                  </Toolbar>
                </CardHeader>
                <CardContent padding={false}>
                  <Tabs>
                    <Tab id="tab-1" tabActive>
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={PageCss.myStatisticsRow}>
                          <strong>{t('_STATISTICS_')}</strong>
                          <strong>{t('_MILESTONES_')}</strong>
                          <strong>{t('_GRADES_')}</strong>
                          <strong>{t('_CAPABILITY_')}</strong>
                        </section>
                        {keyInsightsData?.map((keyInsight, index) => {
                          return (
                            <section className={PageCss.myStatisticsRow} key={index}>
                              <span>{keyInsight.statistics}</span>
                              {/* <span>{keyInsight.milestone}</span> */}
                              <span>
                                <Progressbar progress={keyInsight.milestone} />
                              </span>
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

            <section className={PageCss.segmentedRankAndGrades}>
              <Block strong className={PageCss.segmentedBlock}>
                <p>{t('_SEGMENTED_RANK_')}</p>
                <section className={PageCss.segmentedRank}>
                  <section className={PageCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="8/28"
                      valueFontSize={48}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={15}
                    />
                    <p className={PageCss.regionsText}>{t('_REGIONS_')}</p>
                  </section>
                  <section className={PageCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="22/120"
                      valueFontSize={48}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={15}
                    />
                    <p className={PageCss.regionsText}>{t('_DIVISIONS_')}</p>
                  </section>
                  <section className={PageCss.guageChart}>
                    <Gauge
                      type="circle"
                      value={0.5}
                      valueText="75/280"
                      valueFontSize={48}
                      valueTextColor="#333333"
                      borderColor="#a7c957"
                      borderBgColor="#fec10d"
                      borderWidth={15}
                    />
                    <p className={PageCss.regionsText}>{t('_ZONES_')}</p>
                  </section>
                </section>
              </Block>
              <Block strong className={PageCss.gradesAndCapability}>
                <section className={PageCss.grades}>
                  <span>Sep 2024</span>
                  <section className={PageCss.gradeBlock}>
                    <span>{t('_GRADES_')}</span>
                    <strong>1560</strong>
                  </section>
                  <section className={PageCss.gradeBlock}>
                    <span>{t('_CAPABILITY_')}</span>
                    <strong>1821</strong>
                  </section>
                </section>
                <section className={PageCss.grades}>
                  <span>Team Three</span>
                  <section className={PageCss.gradeBlock}>
                    <span>{t('_GRADES_')}</span>
                    <strong>1560</strong>
                  </section>
                  <section className={PageCss.gradeBlock}>
                    <span>{t('_CAPABILITY_')}</span>
                    <strong>1821</strong>
                  </section>
                </section>
              </Block>
            </section>
            <Block style={{ padding: 0, margin: 0 }}>
              <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
                <CardHeader style={{ padding: 0, minHeight: '36px' }}>
                  <Toolbar tabbar className={PageCss.cardHeaderToolBar}>
                    <Link tabLink="#tab-4" tabLinkActive>
                      Zones
                    </Link>
                    <Link tabLink="#tab-5">Divisions</Link>
                    <Link tabLink="#tab-6">Regions</Link>
                  </Toolbar>
                </CardHeader>
                <CardContent padding={false}>
                  <Tabs>
                    <Tab id="tab-4" tabActive>
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={PageCss.topPerformerRow}>
                          <strong>{t('_TOP5_ZONAL_REPS_')}</strong>
                          <strong>{t('_TEAMS_')}</strong>
                          <strong>{t('_GRADES_')}</strong>
                        </section>
                        {topPerformersData?.map((topPerformer, index) => {
                          return (
                            <section className={PageCss.topPerformerRow} key={index}>
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
                        <section className={PageCss.topPerformerRow}>
                          <strong>Top Division Reps</strong>
                          <strong>{t('_TEAMS_')}</strong>
                          <strong>{t('_GRADES_')}</strong>
                        </section>
                        {topPerformersData?.map((topPerformer, index) => {
                          return (
                            <section className={PageCss.topPerformerRow} key={index}>
                              <span>{topPerformer.name}</span>
                              <span>{topPerformer.teams}</span>
                              <span>{topPerformer.grades}</span>
                            </section>
                          );
                        })}
                      </Block>
                    </Tab>
                    <Tab id="tab-6">
                    <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={PageCss.topPerformerRow}>
                          <strong>Top Region Reps</strong>
                          <strong>{t('_TEAMS_')}</strong>
                          <strong>{t('_GRADES_')}</strong>
                        </section>
                        {topPerformersData?.map((topPerformer, index) => {
                          return (
                            <section className={PageCss.topPerformerRow} key={index}>
                              <span>{topPerformer.name}</span>
                              <span>{topPerformer.teams}</span>
                              <span>{topPerformer.grades}</span>
                            </section>
                          );
                        })}
                      </Block>
                    </Tab>
                  </Tabs>
                </CardContent>
              </Card>
            </Block>
          </div>
        </Block>
        <Popover
          className={'popover-menu'}
          opened={isUpdateDropdownOpen}
          targetEl={'.team-overview-list-item'}
          arrow={false}
          backdrop={false}
          closeByBackdropClick={false}
          onPopoverClosed={() => {
            setIsUpdateDropdownOpen(false);
            setDeviceChartState(Math.round(Math.random() * 100) / 100);
            setDrugChartState(Math.round(Math.random() * 100) / 100);
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
    </Popup>
  );
};

export default TeamPerformanceOverview;
