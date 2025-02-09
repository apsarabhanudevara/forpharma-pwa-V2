import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Link, Navbar, NavLeft, NavRight, NavTitle, Page, Toolbar, Block } from 'framework7-react';

import DailyActivityCss from '../css/daily-activity.module.css';

const ActivityBlock = ({ date, checkInTime, checkOutTime, doctorName, location, status }) => {
  const getStatusIconAndColor = (status) => {
    switch (status) {
      case 'Follow Up':
        return { icon: 'where_to_vote', color: '#2186d4' };
      case 'No Show':
        return { icon: 'fmd_bad', color: '#f23022' };
      case 'Order Placed':
        return { icon: 'add_location', color: '#00A086' };
      case 'Visits Due':
        return { icon: 'where_to_vote', color: 'lightsalmon' };
      default:
        return { icon: '', color: 'transparent' };
    }
  };
  const { icon, color } = getStatusIconAndColor(status);
  return (
    <Block strong className={DailyActivityCss.targetAchieved}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: color,
          color: 'white',
          fontSize: '30px',
          width: '65px',
          height: '65px',
          marginLeft: '10px',
        }}
      >
        {/* Render the Material Icon with dynamic background color */}
        {icon && <Icon material={icon} size="24" color="white" />}
      </div>
      <div className={DailyActivityCss.noPadding}>
        <span className={DailyActivityCss.meetingsCount}>
          <span className={DailyActivityCss.dateFont}>Date: {date}</span>
        </span>
        <br />
        <span className={DailyActivityCss.meetingsCount}>
          Time Check-in: {checkInTime} | Check-out: {checkOutTime}
        </span>
        <br />
        <span className={DailyActivityCss.meetingsCount}>
          Doctor/Chemist: Name: <span className={DailyActivityCss.nameFont}>{doctorName}</span>
        </span>
        <br />
        <span className={DailyActivityCss.meetingsCount}>Location: {location}</span>
        <br />
        <span className={DailyActivityCss.meetingsCount}>
          Status: <span className={DailyActivityCss.orderFont}>{status}</span>
        </span>
      </div>
    </Block>
  );
};

const DailyActivity = ({ f7router }) => {
  const { t } = useTranslation(['dailyActivity']);
  const isUserCheckedin = true; // Mocking the checked-in state for now

  const activities = [
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Mor Chemist & Druggists',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Order Placed',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Follow Up',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Visits Due',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'No Show',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Order Placed',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Follow Up',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Visits Due',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'No Show',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'Order Placed',
    },
    {
      date: 'Friday, July 26, 2024',
      checkInTime: '9:00 AM',
      checkOutTime: '9:40 AM',
      doctorName: 'Dr. Sridhar Reddy Peddi',
      location: 'Nanakarmguda, Hyderabad, Telengana 500032',
      status: 'No Show',
    },
  ];

  return (
    <Page className={DailyActivityCss.forpharmaPage}>
      <Navbar className={DailyActivityCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
        </NavLeft>
        <NavTitle className={DailyActivityCss.pageTitle}>
          <p>{t('_DAILY_ACTIVITY_SUMMERY_')}</p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <Toolbar bottom className={DailyActivityCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-checkin">
          <Icon material="person_add_alt" size={22} />
          {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="av_timer" size={22} color="blue" />
          {t('_DAILY_ACTIVITY_')}
        </Link>
        <Link href="/attendance-record">
          <Icon material="restore" size={22} />
          {t('_ATTENDANCE_')}
        </Link>
        <Link href="/calendar">
          <Icon material="calendar_month" size={22} />
          {t('_CALENDAR_')}
        </Link>
      </Toolbar>

      {activities.map((activity, index) => (
        <ActivityBlock
          key={index}
          date={activity.date}
          checkInTime={activity.checkInTime}
          checkOutTime={activity.checkOutTime}
          doctorName={activity.doctorName}
          location={activity.location}
          status={activity.status}
        />
      ))}
    </Page>
  );
};

export default DailyActivity;
