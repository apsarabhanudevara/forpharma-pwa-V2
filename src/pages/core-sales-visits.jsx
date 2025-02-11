import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AccordionContent,
  Actions,
  Block,
  Button,
  Card,
  CardContent,
  CardFooter,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Progressbar,
  Tab,
  Tabs,
  Toggle,
  Toolbar,
} from 'framework7-react';

import CoreSalesVisitsCss from '../css/core-sales-visits.module.css';
import Chart from 'react-apexcharts';

const _NAME_SPACE_IDENTIFIER_ = 'coresalesvisits';

const LINKS = [
  { href: '/forpharma', icon: 'home', label: (t) => t('_HOME_') },
  { tabLink: '#dashboard', icon: 'dashboard', label: (t) => t('_DASHBOARD_'), defaultActive: true },
  { tabLink: '#daily-visits', material: 'calendar_month', label: (t) => t('_DAILY_VISITS_') },
  { tabLink: '#media-tools', material: 'touch_app', label: (t) => t('_MEDIA_TOOLS_') },
  { tabLink: '#chat-tools', material: 'send', label: (t) => t('_CHAT_TOOLS_') },
  { tabLink: '#visit-notes', material: 'edit_note', label: (t) => t('_VISIT_NOTES_') },
];
const legendItems = [
  { label: 'Total Visits', colorIndex: 0 },
  { label: 'New Doctors Visited', colorIndex: 1 },
  { label: 'Follow-Up Visits', colorIndex: 2 },
  { label: 'Missed Visits', colorIndex: 3 },
];
const visitData = [
  { day: 'Monday', visits: 15 },
  { day: 'Tuesday', visits: 22 },
  { day: 'Wednesday', visits: 30 },
  { day: 'Thursday', visits: 18 },
  { day: 'Friday', visits: 25 },
  { day: 'Saturday', visits: 10 },
  { day: 'Sunday', visits: 27 },
];
const visitors = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '10:00 am',
    endTime: '10:30 am',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '11:00 am',
    endTime: '11:45 am',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '12:00 pm',
    endTime: '12:30 pm',
  },
  {
    id: 4,
    name: 'John Doe',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '10:00 am',
    endTime: '10:30 am',
  },
  {
    id: 5,
    name: 'Jane Smith',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '11:00 am',
    endTime: '11:45 am',
  },
  {
    id: 6,
    name: 'Michael Johnson',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '12:00 pm',
    endTime: '12:30 pm',
  },
  {
    id: 7,
    name: 'John Doe',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '10:00 am',
    endTime: '10:30 am',
  },
  {
    id: 8,
    name: 'Jane Smith',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '11:00 am',
    endTime: '11:45 am',
  },
  {
    id: 9,
    name: 'Michael Johnson',
    image: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
    date: '8th Oct 2024',
    startTime: '12:00 pm',
    endTime: '12:30 pm',
  },
];
const mediaItems = [
  {
    id: 1,
    title: 'ForPharma Visual Aid',
    thumbnail: '../assets/images/biosplit.png',
  },
  {
    id: 2,
    title: 'ForPharma Visual Aid',
    thumbnail: '../assets/images/cypronect.png',
  },
  {
    id: 3,
    title: 'ForPharma Visual Aid',
    thumbnail: '../assets/images/biosplit.png',
  },
];
const contacts = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Manager',
    phone: '+1 234 567 890',
    email: 'johndoe@example.com',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Team Lead',
    phone: '+1 987 654 321',
    email: 'janesmith@example.com',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Software Engineer',
    phone: '+1 123 456 789',
    email: 'mikejohnson@example.com',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Product Manager',
    phone: '+1 456 789 123',
    email: 'emilydavis@example.com',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png',
  },
];
const visitedNotes = [
  {
    id: 1,
    title: 'Note file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'description',
    color: '#999999',
  },
  {
    id: 2,
    title: 'Picture file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'image',
    color: '#FEC00E',
  },
  {
    id: 3,
    title: 'Video file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'video_file',
    color: '#185D93',
  },
  {
    id: 4,
    title: 'Audio file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'audio_file',
    color: '#2286D4',
  },
  {
    id: 5,
    title: 'Document file one',
    note: 'Content UX work is in progress',
    created: 'July 23rd 2024, 10:30 am',
    material: 'assignment',
    color: '#F1555A',
  },
];

const categories = ['Total Visits', 'New Doctors Visited', 'Follow-Up Visits', 'Missied Visits'];

const DoctorVisitsBasedOnDay = ({ day, visits }) => {
  return (
    <div className={CoreSalesVisitsCss.weekDayInfoItem}>
      <span>{day}</span>
      <div className={CoreSalesVisitsCss.weekDayVisitProgressContainer}>
        <Progressbar progress={visits} className={CoreSalesVisitsCss.weekDayProgress} />
        <span>{visits}</span>
      </div>
    </div>
  );
};

const CreateWeeklyDoctorVisitsOverviewChart = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  return (
    <Card className={CoreSalesVisitsCss.chartCard}>
      <div className={CoreSalesVisitsCss.weekDayInfoContainer}>
        <div className={`${CoreSalesVisitsCss.weekDayInfoHeader} ${CoreSalesVisitsCss.weekDayInfoItem}`}>
          <span>{t('_DAYS_OF_THE_WEEK_HEADING_TEXT_')}</span>
          <span>{t('_VISITS_HEADING_TEXT_')}</span>
        </div>
        {visitData.map((item, index) => (
          <DoctorVisitsBasedOnDay key={index} day={item.day} visits={item.visits} />
        ))}
      </div>
    </Card>
  );
};

const CreateTotalDoctorVisitsChart = ({ dataSet, colors }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const chartData = {
    series: [
      {
        data: dataSet,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
          show: true,
          formatter: (val) => `${val}`,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          formatter: (value, { series, seriesIndex, dataPointIndex, w }) => `${value}% visits`,
        },
        marker: {
          show: false,
        },
      },
    },
  };
  return (
    <>
      <Card className={CoreSalesVisitsCss.chartCard}>
        <div className={CoreSalesVisitsCss.visitsChart}>
          <Chart
            className={CoreSalesVisitsCss.chartLablePostion}
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
          <div className={CoreSalesVisitsCss.visitsChartLegends}>
            {legendItems.map((item) => (
              <div key={item.label}>
                <Icon material="stop" size={22} style={{ color: colors[item.colorIndex] }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className={CoreSalesVisitsCss.captionTextChart}>
        <span>{t('_TOTAL_DOCTORS_VISITS_CHART_CAPTION_TEXT_')}</span>
      </div>
    </>
  );
};
const DashBoardVisitsTabContent = ({ handleActionsTab }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  return (
    <div className={CoreSalesVisitsCss.dashboardMainContainer}>
      <span>{t('_TOTAL_DOCTORS_VISITS_LABEL_')}</span>
      <CreateTotalDoctorVisitsChart dataSet={[100, 52, 27, 8]} colors={['#06B295', '#2286D4', '#A7C957', '#F1555A']} />
      <div className={CoreSalesVisitsCss.containerAlign}>
        <span>{t('_WEEKLY_DOCTORS_VISITS_CHART_TITLE_')}</span>
      </div>
      <CreateWeeklyDoctorVisitsOverviewChart dataSet={[10, 20, 15, 18, 22, 8, 4]} />
      <div className={CoreSalesVisitsCss.teamSummaryNConnectContainer}>
        <Button className={CoreSalesVisitsCss.buttonCustom} large fill href="/team-perf-overview">
          <Icon material="groups" /> {t('_TEAM_SUMMARY_BUTTON_TEXT_')}
        </Button>
        <Button className={CoreSalesVisitsCss.buttonCustom} large fill onClick={() => handleActionsTab(true)}>
          <Icon material="share" /> {t('_CONNECT_BUTTON_TEXT_')}
        </Button>
      </div>
    </div>
  );
};

const PageTitle = ({
  title,
  titleTag,
  showBackNavigation = false,
  showSearchIcon = false,
  showFilterIcon = false,
  onClickback,
}) => {
  return (
    <Navbar className={CoreSalesVisitsCss.pageHeader}>
      <div className={CoreSalesVisitsCss.noIconPageHeader}>
        <NavTitle
          className={showBackNavigation ? CoreSalesVisitsCss.pageHeaderContainer : CoreSalesVisitsCss.pageTitleInfo}
        >
          {showBackNavigation && <Link iconOnly iconF7="chevron_left" color="white" onClick={onClickback} />}
          <div className={CoreSalesVisitsCss.pageTitleContainer}>
            <strong className={showBackNavigation ? CoreSalesVisitsCss.pageTitleWithIcons : ''}>{title}</strong>
            <br />
            <span
              className={
                showBackNavigation ? CoreSalesVisitsCss.pageTitleCaptionWithIcons : CoreSalesVisitsCss.pageTitleTag
              }
            >
              {titleTag}
            </span>
          </div>
          {(showSearchIcon || showFilterIcon) && (
            <div className={CoreSalesVisitsCss.pageTitleRightIcon}>
              {showSearchIcon && <Link iconOnly iconF7="search" color="white" />}
              {showFilterIcon && <Link iconOnly iconMaterial="filter_alt" color="white" />}
            </div>
          )}
        </NavTitle>
      </div>
    </Navbar>
  );
};

const MainPagesNavigationComponent = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  return (
    <Toolbar bottom className={CoreSalesVisitsCss.bottomToolBar}>
      {LINKS.map((link, index) => (
        <Link
          key={index}
          tabLink={link.tabLink}
          tabLinkActive={activeTab === link.tabLink}
          onClick={() => onTabChange(link.tabLink)}
          href={link.href}
        >
          {link.hasOwnProperty('material') ? (
            <Icon material={link.material} size={32} />
          ) : (
            <Icon icon={link.icon} size={32} />
          )}
          {link.label(t)}
        </Link>
      ))}
    </Toolbar>
  );
};

const DailyVisitsSchedule = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={CoreSalesVisitsCss.tabContent}>
      <div className={CoreSalesVisitsCss.syncNProgressContianer}>
        <div>
          <span className={CoreSalesVisitsCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
          <Icon className={CoreSalesVisitsCss.syncContianer} material="sync" color="#2286D4" />
        </div>
        <div className={CoreSalesVisitsCss.progressBarContainer}>
          <Progressbar progress={progress} className={CoreSalesVisitsCss.progressBarCustom} />
        </div>
      </div>
      <List>
        {visitors.map((visitor) => (
          <ListItem key={visitor.id} className={CoreSalesVisitsCss.cardItem}>
            <div className={CoreSalesVisitsCss.dailyVisitsCardContent}>
              <img src={visitor.image} className={CoreSalesVisitsCss.iconImage} />
              <div className={CoreSalesVisitsCss.divFlex}>
                <span>{visitor.name}</span>
                <span style={{ fontSize: '10px' }}>
                  {visitor.date}
                  {visitor.startTime} to {visitor.endTime}
                </span>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
const MediaTools = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={CoreSalesVisitsCss.tabContent}>
      <div className={CoreSalesVisitsCss.syncNProgressContianer}>
        <div>
          <span className={CoreSalesVisitsCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
          <Icon className={CoreSalesVisitsCss.syncContianer} material="sync" color="#2286D4" />
        </div>
        <div className={CoreSalesVisitsCss.progressBarContainer}>
          <Progressbar progress={progress} className={CoreSalesVisitsCss.progressBarCustom} />
        </div>
      </div>
      {mediaItems.map((media) => (
        <div key={media.id} className={CoreSalesVisitsCss.mediaToolCardItem}>
          <div>
            <img src={media.thumbnail} alt={media.title} width="100%" />
          </div>
          <div className={CoreSalesVisitsCss.mediaToolFooter}>{media.title}</div>
        </div>
      ))}
    </div>
  );
};
const ChatTools = ({ handleActionsTab }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  return (
    <div className={CoreSalesVisitsCss.tabContent}>
      <Toolbar top tabbar className={CoreSalesVisitsCss.topToolBar}>
        <Link tabLink="#share" tabLinkActive>
          Share
        </Link>
        <Link tabLink="#follow-up">Follow-Up</Link>
        <Link tabLink="#history">History</Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="share">
          <div>
            <div className={CoreSalesVisitsCss.syncNProgressContianer}>
              <div>
                <span className={CoreSalesVisitsCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
                <Icon className={CoreSalesVisitsCss.syncContianer} material="sync" color="#2286D4" />
              </div>
              <div className={CoreSalesVisitsCss.progressBarContainer}>
                <Progressbar progress={progress} className={CoreSalesVisitsCss.progressBarCustom} />
              </div>
            </div>
            <List>
              {contacts.map((contact) => (
                <ListItem key={contact.id} className={CoreSalesVisitsCss.cardItem}>
                  <div className={CoreSalesVisitsCss.dailyVisitsCardContent}>
                    <img src={contact.profileImage} className={CoreSalesVisitsCss.iconImage} />
                    <div className={CoreSalesVisitsCss.divFlex}>
                      <span>{contact.name}</span>
                      <span>{contact.role}</span>
                      <span style={{ fontSize: '10px' }}>
                        {contact.phone} , {contact.email}
                      </span>
                    </div>
                    <Button className={CoreSalesVisitsCss.shareButton} large onClick={() => handleActionsTab(true)}>
                      <Icon material="share" size="27" />
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Tab>
        <Tab id="follow-up"></Tab>
        <Tab id="history"></Tab>
      </Tabs>
    </div>
  );
};
const VisitNotes = () => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const [progress, setProgress] = useState(30);
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };
  return (
    <div className={CoreSalesVisitsCss.tabContentVisitNotes}>
      <div className={CoreSalesVisitsCss.syncNProgressContianer}>
        <div>
          <span className={CoreSalesVisitsCss.syncContianer}>{t('_SYNC_LABEL_TEXT_')}</span>{' '}
          <Icon className={CoreSalesVisitsCss.syncContianer} material="sync" color="#2286D4" />
        </div>
        <div className={CoreSalesVisitsCss.progressBarContainer}>
          <Progressbar progress={progress} className={CoreSalesVisitsCss.progressBarCustom} />
        </div>
      </div>
      <List accordionList>
        {visitedNotes.map((note) => (
          <ListItem
            className={CoreSalesVisitsCss.cardItemNotes}
            key={note.id}
            accordionItem
            noChevron
            title={
              <div className={CoreSalesVisitsCss.cardItemTitle}>
                <div className={CoreSalesVisitsCss.notesIconContainer} style={{ backgroundColor: note.color }}>
                  <Icon material={note.material} size={37} />
                </div>
                <div className={CoreSalesVisitsCss.divFlex}>
                  <span> {note.title}</span>
                  <span style={{ fontSize: '10px' }}>{note.created}</span>
                </div>
              </div>
            }
            after={<Icon material="keyboard_arrow_down" style={{ fontSize: '39px' }} color="blue" />}
          >
            <AccordionContent>
              <Block>
                <p>{note.note}</p>
              </Block>
            </AccordionContent>
          </ListItem>
        ))}
      </List>
      <Button className={CoreSalesVisitsCss.addNotesButton} large>
        <Icon material="edit_note" size="55px" />
      </Button>
    </div>
  );
};

const ConnectActionPopOverComponent = ({ show, handleActionsTab, shareInfo }) => {
  return (
    <Actions grid={true} opened={show} onActionsClosed={() => handleActionsTab(false)} style={{ paddingLeft: '8px' }}>
      <Block style={{ paddingLeft: '6px' }}>
        Share with <strong>{shareInfo.title + shareInfo.fullname}</strong>
      </Block>
      <hr />
      <Block>
        <p>Select content type</p>
        <div className={CoreSalesVisitsCss.shareButtonGroup}>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="share-icon-01" />
            <p>
              Template text <br /> messages
            </p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="share-icon-02" />
            <p>
              Drug details/ <br /> Visual Aids
            </p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="share-icon-03" />
            <p>Reports</p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="more-icon" />
            <p>More</p>
          </Link>
        </div>
        <div>
          Followup communication <Toggle color="green" />
        </div>
      </Block>
      <hr />
      <Block className={CoreSalesVisitsCss.shareContentBlock}>
        <p>Choose communication method</p>
        <div className={CoreSalesVisitsCss.shareButtonGroup}>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="whatsapp" />
            <p>WhatsApp</p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="fpmail" />
            <p>Email</p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="fpmessage" />
            <p>Messages</p>
          </Link>
          <Link className={CoreSalesVisitsCss.shareButtonGroupItem}>
            <Icon icon="more-icon" />
            <p>More</p>
          </Link>
        </div>
        <div>
          <Button
            large
            fill
            onClick={() => handleActionsTab(false)}
            style={{ marginLeft: '56px', marginRight: '56px' }}
          >
            <Icon material="share" style={{ marginRight: '16px' }} /> Share
          </Button>
        </div>
      </Block>
    </Actions>
  );
};

const CoreSalesVisits = ({ f7router }) => {
  const { t } = useTranslation([_NAME_SPACE_IDENTIFIER_]);
  const defaultActiveTab = LINKS.find((link) => link.defaultActive)?.tabLink || LINKS[0].tabLink;
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [showActionsTab, setShowActionsTab] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const handleActionsTab = (tabId) => {
    setShowActionsTab(tabId);
  };
  const onClickback = () => {
    console.log('called');
    f7router.back();
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case '#dashboard':
        return <DashBoardVisitsTabContent handleActionsTab={handleActionsTab} />;
      case '#daily-visits':
        return <DailyVisitsSchedule />;
      case '#media-tools':
        return <MediaTools />;
      case '#chat-tools':
        return <ChatTools handleActionsTab={handleActionsTab} />;
      case '#visit-notes':
        return <VisitNotes />;
    }
  };
  const renderPageTitle = () => {
    const commonProps = {
      title: t('_PAGE_TITLE_TEXT_'),
      onClickback: onClickback,
    };
    const tabConfig = {
      '#dashboard': { titleTag: t('_PAGE_TITLE_CAPTION_TEXT_') },
      '#daily-visits': {
        titleTag: t('_DAILY_VISIT_SCHEDULER_TAB_PAGE_TEXT_'),
        showBackNavigation: true,
        showSearchIcon: true,
      },
      '#media-tools': {
        titleTag: t('_INTERACTIVE_CONTENT_TAB_TITLE_TEXT_'),
        showBackNavigation: true,
        showSearchIcon: true,
      },
      '#chat-tools': {
        titleTag: t('_MESSAGING_TOOLS_TAB_TITLE_TEXT_'),
        showBackNavigation: true,
        showSearchIcon: true,
      },
      '#visit-notes': {
        titleTag: t('_VISIT_NOTES_TAB_TITLE_TEXT_'),
        showBackNavigation: true,
        showSearchIcon: true,
        showFilterIcon: true,
      },
    };
    const specificProps = tabConfig[activeTab] || {};
    return <PageTitle {...commonProps} {...specificProps} />;
  };

  return (
    <Page className={CoreSalesVisitsCss.coreSalesVisitsPage} pageContent={false}>
      {renderPageTitle()}
      <MainPagesNavigationComponent activeTab={activeTab} onTabChange={handleTabChange} />
      <Tab id={activeTab} className={`page-content`} tabActive>
        {renderTabContent()}
      </Tab>
      <ConnectActionPopOverComponent
        show={showActionsTab}
        handleActionsTab={handleActionsTab}
        shareInfo={{ title: ' Dr.', fullname: ' Sridhar' }}
      />
    </Page>
  );
};
export default CoreSalesVisits;
