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

import PageCss from '../css/core-sales-target.module.css';

const updateOptions = ['Weekly Updates', 'Monthly Updates', 'Quarterly Updates', 'Annual Updates'];

const CoreSalesDashboard = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  const [updateOptionIndex, setUpdateOptionIndex] = useState(0);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [drugChartState, setDrugChartState] = useState(0.91);
  const [deviceChartState, setDeviceChartState] = useState(0.32);
  let drugChartValue = `${drugChartState * 100}%`;
  let deviceChartValue = `${deviceChartState * 100}%`;
  return (
    <Page className={PageCss.forpharmaPage}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            Core Sales Target
            <br />
            <small id={PageCss.titleSmall}>Last updated: Oct 1, 2024, 3:26 PM (Hyderabad, India)</small>
          </p>
        </NavTitle>
      </Navbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/forpharma" tabLinkActive>
          <Icon icon="dashboard" size={32} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="doctors">
          <Icon icon="doctors" size={32} color="white" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="chemists">
          <Icon material="medication_outlined" size={42} />
          Sales Rep
        </Link>
        <Link href="chemists">
          <Icon material="trending_up_outlined" size={42} />
          Sales Rollup
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
              className="core-update-options-list-item"
              title={updateOptions[updateOptionIndex]}
              link="#"
              onClick={() => setIsUpdateDropdownOpen(!isUpdateDropdownOpen)}
            />
          </List>
          <Block style={{ padding: 0, margin: 0 }}>
            <p style={{ color: 'white', textAlign: 'center' }}>Sales Performance Indicators</p>
            <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
              <CardContent padding={false}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <p style={{ textAlign: 'center' }}>Drug Sales Target: 983000</p>
                  <Gauge
                    type="semicircle"
                    value={drugChartState}
                    valueText={drugChartValue}
                    valueTextColor="#000"
                    borderColor="#00B295"
                    borderBgColor="#CCCCCC"
                    borderWidth={25}
                  />
                  <p style={{ fontSize: 10, margin: 18, textAlign: 'center' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#00B295',
                        marginRight: '4px',
                        display: 'inline-block',
                      }}
                    ></span>
                    Our Segment
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#CCC',
                        marginRight: '4px',
                        marginLeft: '8px',
                        display: 'inline-block',
                      }}
                    ></span>
                    Competitor's Segment
                  </p>
                </div>
              </CardContent>
            </Card>
          </Block>
          <Block style={{ padding: 0, marginTop: '16px' }}>
            <Card raised style={{ marginTop: 0, marginBottom: 0 }}>
              <CardContent padding={false}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <p style={{ textAlign: 'center' }}>Drug Sales Target: 983000</p>
                  <Gauge
                    type="semicircle"
                    value={deviceChartState}
                    valueText={deviceChartValue}
                    valueTextColor="#000"
                    borderColor="#2186D4"
                    borderBgColor="#CCCCCC"
                    borderWidth={25}
                  />
                  <p style={{ fontSize: 10, margin: 18, textAlign: 'center' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#2186D4',
                        marginRight: '4px',
                        display: 'inline-block',
                      }}
                    ></span>
                    Achieved Targets
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#CCC',
                        marginRight: '4px',
                        marginLeft: '8px',
                        display: 'inline-block',
                      }}
                    ></span>
                    Total Targets
                  </p>
                </div>
              </CardContent>
            </Card>
          </Block>
          <Block style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
            <div className={PageCss.bottomButtons}>
              <Button large fill iconMaterial="groups" href="/team-perf-overview">
                {t('_TEAM_SUMMARY_')}
              </Button>
            </div>
          </Block>
        </div>
      </Block>
      <Popover
        className={'popover-menu'}
        opened={isUpdateDropdownOpen}
        targetEl={'.core-update-options-list-item'}
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
  );
};

export default CoreSalesDashboard;
