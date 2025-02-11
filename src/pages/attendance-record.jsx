import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Link, Navbar, NavLeft, NavRight, NavTitle, Page, Toolbar, Block, useStore } from 'framework7-react';
import AttendanceCss from '../css/attendance.module.css';

// Reusable component for displaying attendance record
const AttendanceBlock = ({ date, checkinTime, checkoutTime, location }) => {
  // Function to determine the icon based on checkin/checkout times and location
  const getAttendanceIcon = (location) => {
    if (!location) {
      return { icon: 'event_busy', color: 'rgb(211, 98, 98)' }; // No check-in/checkout and no location
    } else {
      return { icon: 'event_available', color: '#00A086' }; // Valid check-in/checkout and location
    }
  };

  // Destructure to get the icon and color
  const { icon, color } = getAttendanceIcon(location);

  return (
    <Block strong className={AttendanceCss.targetAchieved}>
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
        {/* Render the appropriate Material Icon */}
        <Icon material={icon} size="24" color="white" />
      </div>
      <div className={AttendanceCss.noPadding}>
        <span className={AttendanceCss.meetingsCount}>
          <span className={AttendanceCss.dateFont}>Date: {date}</span>
        </span>
        <br />
        <span className={AttendanceCss.meetingsCount}>
          Time Check-in: {checkinTime} | Check-out: {checkoutTime}
        </span>
        <br />
        <span className={AttendanceCss.meetingsCount}>Location: {location || 'N/A'}</span>
      </div>
    </Block>
  );
};

const AttendanceRecord = ({ f7router }) => {
  const isUserCheckedin = useStore('getUserCheckedinState');
  const { t } = useTranslation(['dailyActivity']);

  const attendanceData = [
    {
      date: 'Wednesday, February 5, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '10:40 AM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    {
      date: 'Tuesday, February 4, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '9:40 AM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    {
      date: 'Monday, February 3, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '9:40 AM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    {
      date: 'Friday, January 31, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '9:40 AM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    { date: 'Thursday, January 30, 2025', checkinTime: '00:00 AM', checkoutTime: '00:00 PM', location: '' },
    {
      date: 'Wednesday, January 29, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '1:00 PM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    { date: 'Tuesday, January 28, 2025', checkinTime: '00:00 AM', checkoutTime: '00:00 PM', location: '' },
    {
      date: 'Monday, January 27, 2025',
      checkinTime: '9:00 AM',
      checkoutTime: '2:30 PM',
      location: 'Nanakramguda, Hyderabad, Telengana 500032',
    },
    { date: 'Friday, January 24, 2025', checkinTime: '00:00 AM', checkoutTime: '00:00 PM', location: '' },
    { date: 'Thursday, January 23, 2025', checkinTime: '00:00 AM', checkoutTime: '00:00 PM', location: '' },
  ];

  return (
    <Page className={AttendanceCss.forpharmaPage}>
      <Navbar className={AttendanceCss.pageNavBar} sliding={false}>
        <NavLeft>
          {/* Uncomment if you want a back button */}
          {/* <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link> */}
        </NavLeft>
        <NavTitle className={AttendanceCss.pageTitle}>
          <p>{t('_ATTENDANCE_RECORD_')}</p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <Toolbar bottom className={AttendanceCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="/rep-checkin">
          <Icon material="person_add_alt" size={32} />
          {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
        </Link>
        {/* <Link href="/daily-activity">
          <Icon material="av_timer" size={32} />
          {t('_DAILY_ACTIVITY_')}
        </Link> */}
        <Link href="/rep-dashboard">
          <Icon material="av_timer" size={32} /> 
          {/* {t('_DAILY_PLANNER_', { ns: 'dashboard' })} */}
          Start Your Day
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="restore" size={32} color="blue" />
          {t('_ATTENDANCE_')}
        </Link>
        <Link href="/calendar">
          <Icon material="calendar_month" size={32} />
          {/* {t('_CALENDAR_')} */}
          Leaves
        </Link>
      </Toolbar>

      {attendanceData.map((record, index) => (
        <AttendanceBlock
          key={index}
          date={record.date}
          checkinTime={record.checkinTime}
          checkoutTime={record.checkoutTime}
          location={record.location}
        />
      ))}
    </Page>
  );
};

export default AttendanceRecord;
