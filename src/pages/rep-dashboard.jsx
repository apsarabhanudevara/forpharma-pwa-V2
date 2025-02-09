import {
  Badge,
  Button,
  Block,
  Gauge,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Tab,
  Tabs,
  Toolbar,
} from 'framework7-react';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import RepDashboardCss from '../css/rep-dashboard.module.css';

const RepDashboard = (props) => {
  const { t } = useTranslation(['dailyplanner']);
  return (
    <Page pageContent={false}>
      <Toolbar bottom className={RepDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="dashboard" size={22} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors">
          <Icon icon="doctors" size={22} color="white" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <PageContent id={RepDashboardCss.dailyPlannerPageContent}>
        <Block id={RepDashboardCss.repRatingsHeader}>
          <Link iconOnly>
            <Icon id={RepDashboardCss.repratingsBell} f7="bell" color="white">
              <Badge color="red">3</Badge>
            </Icon>
          </Link>
          <p>
            <span>{t('_MEDICAL_REPRESENTATVE_')}</span>
            <br />
            <strong>{t('_DAILY_PLANNER_')}</strong>
          </p>
        </Block>
        <Block id={RepDashboardCss.repRatings} strong>
          <div id={RepDashboardCss.repAvatar}>
            <img src={RepAvatar} alt="Avatar" />
            <p>
              <strong>John Doee</strong> <br /> Sr. Medical Representative
            </p>
          </div>
          <div id={RepDashboardCss.repCharts}>
            <div className={RepDashboardCss.targetProgress}>
              <Button large fill iconMaterial="radar" iconSize={36} href="/meeting-target">
                {t('_MEETING_TARGET_PROGRESS_')}
              </Button>
            </div>
            <div id={RepDashboardCss.repGaugeContainer}>
              <div className={RepDashboardCss.repGaugeCard}>
                <p>
                  Doctors <br /> <strong>Consulted</strong>
                </p>
                <Gauge
                  type="circle"
                  value={0.5}
                  valueText="50%"
                  valueFontSize={48}
                  valueTextColor="#333333"
                  borderColor="#a7c957"
                  borderBgColor="#fec10d"
                  borderWidth={15}
                />
              </div>
              <div className={RepDashboardCss.repGaugeCard}>
                <p>
                  Sales target <br /> <strong>Reached</strong>
                </p>
                <Gauge
                  type="circle"
                  value={0.72}
                  valueText="72%"
                  valueFontSize={48}
                  valueTextColor="#333333"
                  borderColor="#a7c957"
                  borderBgColor="#fec10d"
                  borderWidth={15}
                />
              </div>
              <div className={RepDashboardCss.repGaugeCard} style={{ marginRight: 0 }}>
                <p>
                  Proposed new <br /> <strong>Drugs</strong>
                </p>
                <Gauge
                  type="circle"
                  value={0.26}
                  valueText="26%"
                  valueFontSize={48}
                  valueTextColor="#333333"
                  borderColor="#a7c957"
                  borderBgColor="#fec10d"
                  borderWidth={15}
                />
              </div>
            </div>
            <div id={RepDashboardCss.ratingStars}>
              <span className={RepDashboardCss.filled}>★</span>
              <span className={RepDashboardCss.filled}>★</span>
              <span className={RepDashboardCss.filled}>★</span>
              <span className={RepDashboardCss.filled}>★</span>
              <span>★</span>
            </div>
            <div className={RepDashboardCss.bottomButtons}>
              <Button large fill iconMaterial="groups" style={{ marginRight: '12px' }} href="/team-perf-overview">
                {t('_TEAM_SUMMARY_')}
              </Button>
              <Button large fill iconMaterial="share">
                {t('_CONNECT_')}
              </Button>
            </div>
          </div>
        </Block>
      </PageContent>
    </Page>
  );
};
export default RepDashboard;
