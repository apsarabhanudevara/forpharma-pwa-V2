import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Toolbar,
  Link,
  Icon,
  f7,
  useStore,
  List,
  ListInput,
  Button,
  Block,
} from 'framework7-react';
import CalendarCss from '../css/calendar.module.css';

const Calendar = ({ f7router }) => {
  const { t } = useTranslation(['dailyActivity']);
  const isUserCheckedin = useStore('getUserCheckedinState');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Personal Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Unpaid Leave',
  ];

  const handleSubmit = () => {
    if (!leaveType || !fromDate || !toDate || !reason || !contactDetails) {
      f7.dialog.alert('Leave Submitted Successfully!', () => {});
      return;
    }

    // Here you would typically make an API call to submit the leave application
    f7.dialog.alert('Leave application submitted successfully!', () => {
      // Reset form after successful submission
      setLeaveType('');
      setFromDate('');
      setToDate('');
      setReason('');
      setContactDetails('');
    });
  };

  return (
    <Page className={CalendarCss.forpharmaPage}>
      <Navbar className={CalendarCss.pageNavBar} sliding={false}>
        <NavLeft>
          {/* <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link> */}
        </NavLeft>
        <NavTitle className={CalendarCss.pageTitle}>
          <p>{t('Apply for Leave')}</p>
        </NavTitle>
      </Navbar>

      <Block className={CalendarCss.leaveDescription}>
        <p style={{ padding: '0 10px' }}>
          Leave is earned by the employee and granted by the employer to take time off work. The employee is free to
          avail of this leave in accordance with the company policy.
        </p>
      </Block>

      <List noHairlinesMd>
        <ListInput
          label="Leave Type"
          type="select"
          placeholder="Select leave type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          {leaveTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </ListInput>

        <ListInput
          label="From Date"
          type="date"
          placeholder="Select start date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <ListInput
          label="To Date"
          type="date"
          placeholder="Select end date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <ListInput
          label="Contact Details"
          type="text"
          placeholder="Enter contact details during leave"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
        />

        <ListInput
          label="Reason"
          type="textarea"
          placeholder="Enter reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </List>

      <Block className={CalendarCss.buttonContainer}>
        <Button fill large onClick={handleSubmit} className={CalendarCss.submitButton}>
          Submit
        </Button>
        <Button large onClick={() => f7router.back()} className={CalendarCss.cancelButton}>
          Cancel
        </Button>
      </Block>

      <Toolbar bottom className={CalendarCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/rep-checkin">
          <Icon material="person_add_alt" size={22} />
          {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
        </Link>
        <Link href="/daily-activity">
          <Icon material="av_timer" size={22} /> {t('_DAILY_ACTIVITY_')}
        </Link>
        <Link href="/attendance-record">
          <Icon material="restore" size={22} /> {t('_ATTENDANCE_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="calendar_month" size={22} color="blue" /> {t('_CALENDAR_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default Calendar;
