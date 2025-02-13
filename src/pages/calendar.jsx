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
import LoginCss from '../css/login.module.css';

const Calendar = ({ f7router }) => {
  const { t } = useTranslation(['dailyActivity']);
  const isUserCheckedin = useStore('getUserCheckedinState');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const leaveTypes = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Unpaid Leave'];

  // Mock data for leave summary - replace with actual data from your backend
  const leaveSummary = {
    available: 15,
    balance: 10,
    total: 25,
  };

  const handleSubmit = () => {
    f7.toast
      .create({
        text: 'Leave Submitted successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast custom-toast-success',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
        closeButton: true,
        closeButtonColor: 'green',
        closeButtonText: 'Close',
        closeButtonTextColor: 'white',
      })
      .open();
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

      <div className={CalendarCss.leaveSummary}>
        <div className={CalendarCss.summaryCard}>
          <div className={CalendarCss.summaryLabel}>Available</div>
          <div className={CalendarCss.summaryValue}>{leaveSummary.available}</div>
        </div>
        <div className={CalendarCss.summaryCard}>
          <div className={CalendarCss.summaryLabel}>Balance</div>
          <div className={CalendarCss.summaryValue}>{leaveSummary.balance}</div>
        </div>
        <div className={CalendarCss.summaryCard}>
          <div className={CalendarCss.summaryLabel}>Total</div>
          <div className={CalendarCss.summaryValue}>{leaveSummary.total}</div>
        </div>
      </div>

      <Block className={CalendarCss.leaveDescription}>
        <p style={{ padding: '0 10px' }}></p>
      </Block>

      <List id={LoginCss.loginList}>
        <ListInput
          outline
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
        outline
          label="From Date"
          type="date"
          placeholder="Select start date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <ListInput
        outline
          label="To Date"
          type="date"
          placeholder="Select end date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <ListInput
        outline
          label="Contact Details"
          type="text"
          placeholder="Enter contact details during leave"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
        />

        <ListInput
        outline
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
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="/rep-checkin">
          <Icon material="person_add_alt" size={32} />
          {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
        </Link>
        <Link href="/daily-activity">
          <Icon material="av_timer" size={32} /> {t('_DAILY_ACTIVITY_')}
        </Link>
        <Link href="/attendance-record">
          <Icon material="restore" size={32} /> {t('_ATTENDANCE_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="calendar_month" size={32} color="blue" /> {t('_CALENDAR_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default Calendar;
