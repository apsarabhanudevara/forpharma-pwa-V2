import {
  Badge,
  Button,
  Block,
  BlockTitle,
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Sheet,
  Toggle,
  Toolbar,
} from 'framework7-react';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import EmployeeProfileCss from '../css/employee-profile.module.css';
import { db } from '../models/db';

const DoctorsProfile = (props) => {
  const { f7router, uid__c } = props;
  const { t } = useTranslation(['employeemaster']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const doctor = useLiveQuery(async () => await db.doctors.get({ uid__c }));
  return (
    <Page className={EmployeeProfileCss.forpharmaPage}>
      <Navbar className={EmployeeProfileCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={EmployeeProfileCss.pageTitle}>
          <p>
            <span>{t('_EMPLOYEE_MASTER_')}</span>
            <br />
            {t('_EMPLOYEE_DETAILS_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} style={{ visibility: 'hidden' }} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={EmployeeProfileCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/employee-dashboard">
          <Icon icon="dashboard" size={32} />
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
      <PageContent id={EmployeeProfileCss.doctorProfilePageContent}>
        {doctor && (
          <>
            <Block id={EmployeeProfileCss.docProfileHeader}>
              <div id={EmployeeProfileCss.docAvatar}>
                <img src={RepAvatar} alt="Avatar" />
              </div>
              <p>
                <strong>{doctor.fullname}</strong> <br /> Sales Representative | Employee ID: DK001
              </p>
            </Block>

            <Block id={EmployeeProfileCss.infoGridBlock}>
              <div className="page-width-wrapper">
                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="school" color="blue" />
                  </div>
                  <div>
                    <strong>Education</strong>
                    <br />
                    {doctor.qualification}
                  </div>
                </div>
                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="location_city" color="blue" />
                  </div>
                  <div>
                    <strong>Contact</strong>
                    <br />
                    Plot No B-63, Jublli hills Hyderabad,
                    <br />
                    +91 7897897895, info@gmail.com
                  </div>
                </div>

                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="person" color="blue" />
                  </div>
                  <div>
                    <strong>Reporting Manager</strong>
                    <br />
                    Sridhar Reddy Peddy, Sales Maneger
                  </div>
                </div>

                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="location_on" color="blue" />
                  </div>
                  <div>
                    <strong>Region/Territory</strong>
                    <br />
                    Team 3
                    <br />
                    Hyderabad, Telengana
                  </div>
                </div>

                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="local_hospital" color="blue" />
                  </div>
                  <div>
                    <strong>Sales Target</strong>
                    <br />
                    200
                  </div>
                </div>
                <div className={EmployeeProfileCss.infoDataGrid}>
                  <div className={EmployeeProfileCss.infoDataIcon}>
                    <Icon material="grade" color="blue" />
                  </div>
                  <div>
                    <strong>Training Records</strong>
                    <br />
                    1. Saled Concepts
                    <br />
                    2. Saled Calls and Demo
                  </div>
                </div>
              </div>
            </Block>
          </>
        )}
      </PageContent>
    </Page>
  );
};
export default DoctorsProfile;
