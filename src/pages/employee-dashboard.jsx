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
  ListButton,
  ListInput,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Tabs,
  Tab,
  Toolbar,
  Progressbar,
} from 'framework7-react';

import EmployeeDashboardCss from '../css/employee-dashboard.module.css';
import ReactApexChart from 'react-apexcharts';

const DrugMasterDashboard = ({ f7router }) => {
  const { t } = useTranslation(['employeemaster']);
  const [barChartOptions, setBarChartOptions] = useState({});
  const [barChartSeries, setBarChartSeries] = useState([]);
  const [donutChartOptions, setDonutChartOptions] = useState({});
  const [donutChartSeries, setDonutChartSeries] = useState([]);

  useEffect(() => {
    // Bar Chart Options
    setBarChartOptions({
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          endingShape: 'rounded',
          distributed: true, // Enable distributed colors for individual columns
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
        // categories: ['Q1', 'Q2', 'Q3'], // Add categories for each data point
      },
      yaxis: {
        title: {},
        max: 100,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + '%';
          },
        },
      },
      colors: ['#15639f', '#00A086', 'rgb(231, 231, 68)'], // Define different colors for each column
      legend: {
        position: 'bottom',
        show: false, // Hide legend as it is not needed for distributed colors
      },
      annotations: {
        yaxis: [
          {
            y: 100,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
            },
          },
        ],
      },
    });

    setBarChartSeries([
      {
        name: 'Employee Performance',
        data: [45, 60, 20], // Data for each quarter
      },
    ]);

    // Donut Chart Options
    setDonutChartOptions({
      chart: {
        type: 'donut',
      },
      labels: ['Hyderabad', ' Secunderabad', 'Warangal', 'Khammam', 'Karimnagar'],
      colors: ['#e2ec1e', '#00A086', '#2b93de', '#1e1eec', 'rgb(197, 228, 104)'],
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
      dataLabels: {
        enabled: false,
      },
      annotations: {
        position: 'front',
        yaxis: [
          {
            y: 0, // Center position for y-axis
            borderColor: 'transparent',
            label: {
              borderColor: 'transparent',
              style: {
                color: '#000', // Text color
                background: 'transparent', // Background color
                fontSize: '16px',
                fontWeight: 'bold',
              },
              text: 'Weekly Prescription Doctors', // Your message
            },
          },
        ],
      },
    });

    setDonutChartSeries([44, 55, 35, 25, 30]); // Example data
  }, []);

  return (
    <Page className={EmployeeDashboardCss.forpharmaPage}>
      <Navbar className={EmployeeDashboardCss.pageNavBar} sliding={false}>
        <NavTitle className={EmployeeDashboardCss.pageTitle}>
          <p>
            <span>{t('_EMPLOYEE_MASTER_')}</span>
            <br />
            <span className={EmployeeDashboardCss.updatedAt}>
              Last Updated: Aug 22, 2024, 10:30AM (Hyderabad, India)
            </span>
          </p>
        </NavTitle>
      </Navbar>
      <Block>
        <p id={EmployeeDashboardCss.weeklyDoctMesg}>Total Employee Performance</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the chart horizontally
            alignItems: 'center', // Center the chart vertically if necessary
          }}
        >
          <div
            style={{
              backgroundColor: 'white', // Apply background only to the chart wrapper
              padding: '17px', // Add necessary padding for spacing
              borderRadius: '8px',
              width: '330px', // Set the width as per your requirement
            }}
          >
            <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={210} width={330} />
          </div>
        </div>
      </Block>

      <Block>
        <p id={EmployeeDashboardCss.weeklyDoctMesg}>Weekly Zonel Employee Leaders</p> {/* This line is unchanged */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the chart horizontally
            alignItems: 'center', // Center the chart vertically if necessary
          }}
        >
          <div
            style={{
              backgroundColor: 'white', // Apply background only to the chart wrapper
              padding: '17px', // Add necessary padding for spacing
              borderRadius: '8px',
              width: '330px', // Set the width similar to the first chart
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '30%',
                width: '83px',
                textAlign: 'center',
                fontWeight: 'bold',
                marginLeft: '122px',
                fontSize: '12px',
              }}
            >
              {'Top 5 Zonel chapions of the week'}
            </div>
            <ReactApexChart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={200}
              width={330} // Adjust width to match the first chart
            />
          </div>
        </div>
        <div className={EmployeeDashboardCss.bottomButtons}>
          <Button large fill iconMaterial="radar">
            {t('_METTING_TARGET_PROGRESS_')}
          </Button>
        </div>
      </Block>

      <Toolbar bottom className={EmployeeDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="dashboard" size={32} color="blue" />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/employee-directory">
          <Icon material="groups_outlined" size={32} />
          {t('_EMPLOYEE_DIRECTORY_')}
        </Link>
        <Link href="/employee-location">
          <Icon material="person_pin_circle_outlined" size={32} />
          {t('_EMPLOYEE_BY_LOCATION_')}
        </Link>
        <Link href="/employee-department">
          <Icon material="person_pin_outlined" size={32} />
          {t('_EMPLOYEE_BY_DEPARTMENT_')}
        </Link>
      </Toolbar>
    </Page>
  );
};
export default DrugMasterDashboard;
