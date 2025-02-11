import React, { useEffect } from 'react';
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

import MeetingTargetCss from '../css/meeting-target.module.css';

const MeetingTarget = ({ f7router }) => {
  const { t } = useTranslation(['meetingtarget']);
  return (
    <Page className={MeetingTargetCss.forpharmaPage}>
      <Navbar className={MeetingTargetCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={MeetingTargetCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_MEETING_PROGRESS_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom className={MeetingTargetCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="doctors">
          <Icon icon="doctors" size={32} />
          {t('_DOCTORS_')}
        </Link>
        <Link href="chemists">
          <Icon icon="chemists" size={32} color="blue" />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Block id={MeetingTargetCss.medicalrepData}>
        <p>
          <strong>John Doe</strong>
          <br />
          SR.Medical Representative
        </p>
      </Block>
      <List strongIos outlineIos className={MeetingTargetCss.calender}>
        <ListInput
          outline
          type="datepicker"
          placeholder="Select date or range"
          readonly
          calendarParams={{ openIn: 'customModal', header: true, footer: true, rangePicker: true }}
        >
          <Icon material="calendar_month" slot="inner-end" color="blue" />
        </ListInput>
      </List>
      <Block>
        <div className={MeetingTargetCss.progressContainer} style={{padding:'10px'}}>
          <Progressbar className={MeetingTargetCss.customProgressbar} progress={80} id="demo-inline-progressbar" />
          <div className={MeetingTargetCss.progressLabel}>{80}%</div>
        </div>
      </Block>
      <Block strong className={MeetingTargetCss.targetAchieved}>
        <span className={MeetingTargetCss.targetText}>{t('_TARGET_')}</span>
        <span className={MeetingTargetCss.meetingsCount}>100 {t('_MEETINGS_')}</span>
      </Block>
      <Block strong className={MeetingTargetCss.targetAchieved}>
        <span className={MeetingTargetCss.targetText}>{t('_ACHIEVED_')}</span>
        <span className={MeetingTargetCss.meetingsCount}>80 {t('_MEETINGS_')}</span>
      </Block>
      <Block strong className={MeetingTargetCss.reasonBlock}>
        <span className={MeetingTargetCss.targetText}>{t('_REASON_FOR_NOT_MEETING_TARGET_')}</span>
        <p>{t('_UNABLE_TO_MEET_TARGET_')}</p>
      </Block>
      <Block className={MeetingTargetCss.noShows}>
        <p>{t('_NO_SHOWS_')}</p>
      </Block>
    </Page>
  );
};

export default MeetingTarget;
