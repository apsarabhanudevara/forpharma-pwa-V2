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
  Icon,
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Popup,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import Chart from 'react-apexcharts';
import ChurnRecurringCss from '../css/churn-recurring.module.css';

const keyInsights = [
  {
    statistics: 'Frequency Compliance',
    milestone: 30,
    grades: 'Amoxicillin',
    capability: 950,
  },
  {
    statistics: 'Overall Calls',
    milestone: 50,
    grades: 'Apriso',
    capability: 850,
  },
  {
    statistics: 'Overall Chemist Calls',
    milestone: 80,
    grades: 'Apixaban',
    capability: 650,
  },
  {
    statistics: 'Monthly Core RCPA',
    milestone: 50,
    grades: 'Amoxicillin',
    capability: 550,
  },
  {
    statistics: 'RCPA Quaterly Audit',
    milestone: 90,
    grades: 'Androgel',
    capability: 450,
  },
  {
    statistics: 'Overall Chemist Calls',
    milestone: 80,
    grades: 'Amoxicillin',
    capability: 650,
  },
  {
    statistics: 'Monthly Core RCPA',
    milestone: 50,
    grades: 'Apixaban',
    capability: 550,
  },
  {
    statistics: 'RCPA Quaterly Audit',
    milestone: 90,
    grades: 'Androgel',
    capability: 450,
  },
  {
    statistics: 'Overall Chemist Calls',
    milestone: 80,
    grades: 'Amoxicillin',
    capability: 650,
  },
  {
    statistics: 'Monthly Core RCPA',
    milestone: 50,
    grades: 'Apixaban',
    capability: 550,
  },
  {
    statistics: 'RCPA Quaterly Audit',
    milestone: 90,
    grades: 'Androgel',
    capability: 450,
  },
];

const ApexChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Paracetamol',
        data: [49, 62, 69, 91, 148],
      },
      {
        name: 'Amaxixlin',
        data: [40, 52, 49, 71, 128],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        // text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    },
  });

  return <Chart options={state.options} series={state.series} type="line" height={280} width={360} />;
};

const CompetitiveMatrics = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  const [keyInsightsData, setKeyInsightsData] = useState(keyInsights);

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
              <span id={ChurnRecurringCss.titleSmall}>Competitive Matrics</span>
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
            <BlockTitle className={ChurnRecurringCss.teamPerfInsightsHeading}>
              <span>Market Share and Stock check</span>
            </BlockTitle>
            <section className={ChurnRecurringCss.segmentedRankAndGrades}>
              <Block strong className={ChurnRecurringCss.segmentedBlock}>
                {/* <p>{t('_SEGMENTED_RANK_')}</p> */}
                <section className={ChurnRecurringCss.segmentedRank}>
                  {/* Replace Gauge with ApexChart */}
                  <ApexChart />
                </section>
              </Block>
            </section>

            <BlockTitle className={ChurnRecurringCss.teamPerfInsightsHeading}>
              <span>Competitor Stock Shortages in Key Segments</span>
            </BlockTitle>
            <Block style={{ padding: 0, margin: 0 }}>
              <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
                <CardHeader style={{ padding: 0, minHeight: '36px' }}>
                  <Toolbar tabbar className={ChurnRecurringCss.cardHeaderToolBar}>
                    <Link tabLink="#tab-1" tabLinkActive>
                      By Chemist
                    </Link>
                    <Link tabLink="#tab-2">By Location</Link>
                    <Link tabLink="#tab-3">By Drug</Link>
                  </Toolbar>
                </CardHeader>
                <CardContent padding={false} style={{ marginBottom: '35px' }}>
                  <Tabs>
                    <Tab id="tab-1" tabActive>
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <section className={ChurnRecurringCss.myStatisticsRow}>
                          <strong>Chemist</strong>
                          <strong>Drug Name</strong>
                          <strong>Quantity</strong>
                        </section>
                        {keyInsightsData?.map((keyInsight, index) => {
                          return (
                            <section className={ChurnRecurringCss.myStatisticsRow} key={index}>
                              <span>{keyInsight.statistics}</span>
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
                      </Block>
                    </Tab>
                    <Tab id="tab-3">
                      <Block style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <p>Tab 3 content</p>
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

export default CompetitiveMatrics;
