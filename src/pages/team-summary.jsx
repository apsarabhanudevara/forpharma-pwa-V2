import {
  Navbar,
  NavTitle,
  NavRight,
  Page,
  Link,
  Icon,
  List,
  ListInput,
  Block,
  Progressbar,
  BlockTitle,
  Tabs,
  Tab,
  Toolbar,
  Gauge,
} from 'framework7-react';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import TeamSummaryCss from '../css/team-summary.module.css';
import Chart from 'react-apexcharts';

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
const TeamSummary = ({ f7router }) => {
  const { t } = useTranslation(['teamsummary']);
  const [teamChart, setTeamChart] = useState(teamChartVals);
  const [team, setTeam] = useState('Team3');
  const [teamsPerformanceData, setTeamsPerformanceData] = useState(teamsPerformance);
  const [keyInsightsData, setKeyInsightsData] = useState(keyInsights);
  const [topPerformersData, setTopPerformersData] = useState(topPerformers);
  const handleTeamChange = () => {
    // TODO:  implement team change logic
  };
  return (
    <Page className={TeamSummaryCss.forpharmaPage}>
      <Navbar className={TeamSummaryCss.pageNavBar} sliding={false}>
        <NavTitle className={TeamSummaryCss.pageTitle}>
          <p>
            <span className={TeamSummaryCss.teamPerformanceHeading}>{t('_TEAM_PERFORMANCE_OVERVIEW_')}</span>
            <br />
            <span className={TeamSummaryCss.teamPerformanceDateRange}>July 2024 - September 2024</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link onClick={() => f7router.back()}>
            <Icon material="close" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <List>
        <ListInput
          label="Teams"
          type="select"
          placeholder="Please select a team"
          defaultValue="Team 1"
          dropdown
          onChange={handleTeamChange}
        >
          <option value="Team1">Team 1</option>
          <option value="Team2">Team 2</option>
          <option value="Team3">Team 3</option>
        </ListInput>
      </List>
      <BlockTitle className={TeamSummaryCss.teamPerfInsightsHeading}>
        <span>{t('_TEAM_PERFORMANCE_INSIGHTS_')}</span>
      </BlockTitle>
      {/* <Block className={TeamSummaryCss.teamPerfInsights} strong>
        <p className={TeamSummaryCss.teamPerfProgress}>
          {teamsPerformanceData.map((teamPerf, index) => {
            return (
              <span>
                <Progressbar key={index} className={TeamSummaryCss.customProgressbar} progress={teamPerf.precentage} />
              </span>
            );
          })}
        </p>
        <p className={TeamSummaryCss.teamPerfMonth}>July 2024 - September 2024</p>
      </Block> */}
      <Chart
        options={teamChart.options}
        series={teamChart.series}
        type="bar"
        height={250}
        className={TeamSummaryCss.teamPerfInsightsChart}
      />
      <BlockTitle className={TeamSummaryCss.teamPerfInsightsHeading}>
        <span>{t('_KEY_INSIGHTS_')}</span>
      </BlockTitle>
      <Block strong className={TeamSummaryCss.keyInsights}>
        {/* Switch Between Tabs  */}
        <Toolbar bottom tabbar>
          <Link tabLink="#my-statistics" tabLinkActive>
            <strong>{t('_MY_STATISTICS_')}</strong>
          </Link>
          <Link tabLink="#monthly-stars">
            <strong>{t('_MONTYLY_STARS_')}</strong>
          </Link>
          <Link tabLink="#quaterly-stars">
            <strong>{t('_QUATERLY_STARS_')}</strong>
          </Link>
        </Toolbar>
        <Tabs>
          <Tab id="my-statistics" tabActive>
            <section className={TeamSummaryCss.myStatisticsRow}>
              <strong>{t('_STATISTICS_')}</strong>
              <strong>{t('_MILESTONES_')}</strong>
              <strong>{t('_GRADES_')}</strong>
              <strong>{t('_CAPABILITY_')}</strong>
            </section>
            {keyInsightsData?.map((keyInsight, index) => {
              return (
                <section className={TeamSummaryCss.myStatisticsRow} key={index}>
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
          </Tab>
          <Tab id="monthly-stars">In Progress</Tab>
          <Tab id="quaterly-stars">In Progress</Tab>
        </Tabs>
      </Block>
      <section className={TeamSummaryCss.segmentedRankAndGrades}>
        <Block strong className={TeamSummaryCss.segmentedBlock}>
          <p>{t('_SEGMENTED_RANK_')}</p>
          <section className={TeamSummaryCss.segmentedRank}>
            <section className={TeamSummaryCss.guageChart}>
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
              <p>{t('_REGIONS_')}</p>
            </section>
            <section className={TeamSummaryCss.guageChart}>
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
              <p>{t('_DIVISIONS_')}</p>
            </section>
            <section className={TeamSummaryCss.guageChart}>
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
              <p>{t('_ZONES_')}</p>
            </section>
          </section>
        </Block>
        <Block strong className={TeamSummaryCss.gradesAndCapability}>
          <section className={TeamSummaryCss.grades}>
            <span>Sep 2024</span>
            <section className={TeamSummaryCss.gradeBlock}>
              <span>{t('_GRADES_')}</span>
              <strong>1560</strong>
            </section>
            <section className={TeamSummaryCss.gradeBlock}>
              <span>{t('_CAPABILITY_')}</span>
              <strong>1821</strong>
            </section>
          </section>
          <section className={TeamSummaryCss.grades}>
            <span>Team Three</span>
            <section className={TeamSummaryCss.gradeBlock}>
              <span>{t('_GRADES_')}</span>
              <strong>1560</strong>
            </section>
            <section className={TeamSummaryCss.gradeBlock}>
              <span>{t('_CAPABILITY_')}</span>
              <strong>1821</strong>
            </section>
          </section>
        </Block>
      </section>
      <Block strong className={TeamSummaryCss.topPerformerContainer}>
        <Toolbar bottom tabbar>
          <Link tabLink="#zones" tabLinkActive>
            <strong>{t('_ZONES_')}</strong>
          </Link>
          <Link tabLink="#divisions">
            <strong>{t('_DIVISIONS_')}</strong>
          </Link>
          <Link tabLink="#regions">
            <strong>{t('_REGIONS_')}</strong>
          </Link>
        </Toolbar>
        <Tabs>
          <Tab id="zones" tabActive>
            <section className={TeamSummaryCss.topPerformerRow}>
              <strong>{t('_TOP5_ZONAL_REPS_')}</strong>
              <strong>{t('_TEAMS_')}</strong>
              <strong>{t('_GRADES_')}</strong>
            </section>
            {topPerformersData?.map((topPerformer, index) => {
              return (
                <section className={TeamSummaryCss.topPerformerRow} key={index}>
                  <span>{topPerformer.name}</span>
                  <span>{topPerformer.teams}</span>
                  <span>{topPerformer.grades}</span>
                </section>
              );
            })}
          </Tab>
          <Tab id="divisions">In Progress</Tab>
          <Tab id="regions">In Progress</Tab>
        </Tabs>
      </Block>
    </Page>
  );
};
export default TeamSummary;
