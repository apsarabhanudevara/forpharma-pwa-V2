import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  f7,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  NavTitle,
  Popover,
  Page,
  Toolbar,
} from 'framework7-react';
import Chart from 'react-apexcharts';
import RetailChemistDashboardCss from '../css/retail-chemist-dashboard.module.css';

const updateOptions = ['Weekly Updates', 'Monthly Updates', 'Quarterly Updates', 'Annual Updates'];

const chartDataSeries = [
  {
    name: 'Overall Visits This Week',
    data: [86, 95, 111, 108, 97, 115, 101],
  },
  {
    name: 'Productive Visits This Week',
    data: [54, 65, 67, 66, 71, 68, 73],
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
      columnWidth: '75%',
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
    labels: {
      show: false,
    },
  },
  fill: {
    colors: ['#F1555A', '#175E95', '#30B446', '#E7E744', '#8D44E7'],
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

const donutChartOptions = {
  chart: {
    type: 'donut',
    height: 800, // Set the desired height
    width: 800, // Set the desired width
  },
  legend: {
    horizontalAlign: 'left',
    offsetY: 0, // Controls the vertical offset
    offsetX: 10, // Align horizontally to the left
    position: 'bottom',
  },
  dataLabels: {
    enabled: false, // Disable percentage labels
  },
  labels: ['Abbott Laboratories', 'Cipla Pharmaceuticals', "Dr. Reddy's", 'GSK Laboratories', 'Zydus Cadila'],
  colors: ['#00B295', '#FC987E', '#E7E744', '#30B446', '#8D44E7'],
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};
const labelChartOption = {
  chart: {
    type: 'donut',
    height: 800, // Set the desired height
    width: 800, // Set the desired width
  },
  dataLabels: {
    enabled: false, // Disable percentage labels
  },
  labels: ['Acetaminophen', 'amlodipine', 'Dxtroamphetamine', 'HydroChlorothiazide', 'Levothyroxine'],
  colors: ['#00B295', '#FC987E', '#E7E744', '#30B446', '#8D44E7'],
  legend: {
    horizontalAlign: 'left',
    offsetY: 0, // Controls the vertical offset
    offsetX: 10, // Align horizontally to the left
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const RetailChemistDashboard = ({ f7router }) => {
  const { t } = useTranslation(['retailChemist']);
  const [updateOptionIndex, setUpdateOptionIndex] = useState(0);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [chartSeries, setChartSeries] = useState(chartDataSeries);
  const [donutSeries, setDonutSeries] = useState([30, 25, 20, 15, 10]); // Replace Gauge values with percentage values for the donut chart

  useEffect(() => {
    // Optional: You can modify SVG if needed here
  }, []);

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
    setDonutSeries([
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ]);
  };

  return (
    <Page className={RetailChemistDashboardCss.forpharmaPage}>
      <Navbar className={RetailChemistDashboardCss.pageNavBar} sliding={false}>
        <NavTitle className={RetailChemistDashboardCss.pageTitle}>
          <p>
            {t('_RETAIL_CHEMIST_')}
            <br />
            <small id={RetailChemistDashboardCss.titleSmall} style={{ fontSize: '12px' }}>
              Last updated: Oct 1, 2024, 3:26 PM (Hyderabad, India)
            </small>
          </p>
        </NavTitle>
      </Navbar>
      <Toolbar bottom className={RetailChemistDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="dashboard" size={22} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/rcpa-list">
          <Icon material="description_outlined" size={24} /> {t('_RCPA_')}
        </Link>
        <Link href="/rcpa-pharma">
          <Icon material="medication_outlined" size={24} /> {t('_PHARMA_')}
        </Link>
        <Link href="/rcpa-doctor">
          <Icon icon="doctors" size={24} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/rcpa-chemist">
          <Icon icon="chemists" size={24} />
          {t('_CHEMIST_')}
        </Link>
      </Toolbar>
      <div className={RetailChemistDashboardCss.bottomButtons}>
        <Button large fill iconMaterial="groups" href="/team-perf-overview">
          {t('_TEAM_SUMMARY_')}
        </Button>
      </div>
      <Block
        style={{ backgroundColor: 'white', padding: '5px', borderRadius: '8px', width: '93%', marginLeft: '12px' }}
      >
        <List
          inset
          strong
          id={RetailChemistDashboardCss.chartListBtn}
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: 0, height: '100%', width: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '18%',
                  width: '83px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginLeft: '56px',
                }}
              >
                {'Weekly Pharma Leaders'}
              </div>
              <Chart options={donutChartOptions} series={donutSeries} type="donut" width="380" height="280" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: 0, height: '100%', width: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '18%',
                  width: '83px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginLeft: '56px',
                }}
              >
                {'Weekly Pharma Leaders'}
              </div>
              <Chart options={labelChartOption} series={donutSeries} type="donut" width="380" height="280" />
            </div>
          </div>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Weekly Rep Appointments</p>
          <div style={{ marginTop: 0, marginBottom: 0 }}>
            <span>
              <Chart options={chartDataOptions} series={chartSeries} type="bar" height={140} />
            </span>
          </div>
        </div>
      </Block>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
        <Button large fill iconMaterial="groups" style={{ marginRight: '12px' }} href="/churn-recurring">
          {t('_CHRN_RECURRING_')}
        </Button>
        <Button large fill iconMaterial="share" href="/competitive-matrics">
          {t('_COMPETITIVE_MATRICS_')}
        </Button>
      </div>
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

export default RetailChemistDashboard;
