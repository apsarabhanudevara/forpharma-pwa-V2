import {
  f7,
  Badge,
  Button,
  Block,
  Gauge,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Progressbar,
  Tab,
  Tabs,
  Toolbar,
  useStore,
} from 'framework7-react';
import React, { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import RepDashboardCss from '../css/rep-checkin.module.css';
import { Loader } from '@googlemaps/js-api-loader';

const RepCheckinPage = ({ f7router }) => {
  const isUserCheckedin = useStore('getUserCheckedinState');
  const { t } = useTranslation(['repchekin']);
  //Load Google map on page load
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDRdBuWlbM-DuLlcnLG3JQlz53pHZPlcSI',
      version: 'weekly',
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary('maps');

      const map = new Map(document.getElementById(RepDashboardCss.repRatings), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }, []);
  // Checkin Dialog
  const checkinDialogTitle = isUserCheckedin ? 'Confirm Check-Out' : 'Confirm Check-In';
  const [dialogLocationUpper, setDialogLocationUpper] = useState('');
  const [dialogLocationLower, setDialogLocationLower] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAkxPZQwiL-t1a07TKqJijC3EX8hy9c2RA`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const upper =
                  addressComponents.find((component) => component.types.includes('locality'))?.long_name || '';
                const lower =
                  addressComponents.find((component) => component.types.includes('administrative_area_level_1'))
                    ?.long_name || '';
                const pincode =
                  addressComponents.find((component) => component.types.includes('postal_code'))?.long_name || '';
                setDialogLocationUpper(upper);
                setDialogLocationLower(`${lower}, ${pincode}`);
              }
            });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    }
  }, []);
  const locationAndTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const openCheckinDialog = () => {
    var checkin_dialog = f7.dialog
      .create({
        title: `<div style="font-size: 16px; text-align: center; padding:18px; border-bottom: 1px solid #ccc;">${checkinDialogTitle}</div>`,
        cssClass: 'confirm-checkin-dialog',
        content: `<div style="display: flex; flex-direction: column; font-size: 12px; align-items: center; justify-content: space-around; width: 100%; height: 180px; padding: 16px; box-sizing: border-box; margin-bottom: 12px; text-align: center;border-bottom: 1px solid #ccc;"}}>
        <i class="icon checkin-pin"></i>
        <p>
        ${dialogLocationUpper}<br/>${dialogLocationLower}
        </p>
        <div style="color:#2186d4;font-size:11px"><i class="icon material-icons color-blue">access_time</i><br/>${locationAndTime}</div>       
        </div>`,
        buttons: [
          {
            text: 'CANCEL',
            onClick: () => checkin_dialog.close(),
          },
          {
            text: 'OK',
            onClick: () => {
              if (!isUserCheckedin) {
                f7.store.dispatch('checkinUser');
                return;
              }
              f7.store.dispatch('checkOutUser');
              // f7.store.dispatch('logoutUser');
              f7router.navigate('/dashboard');
            },
          },
        ],
      })
      .open();
  };
  return (
    <Page pageContent={false}>
      <Toolbar bottom className={RepDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="person_add_alt" size={22} color="blue" />
          {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
        </Link>
        <Link href="/daily-activity">
          <Icon material="av_timer" size={22} />
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
      <PageContent id={RepDashboardCss.dailyPlannerPageContent}>
        <Block id={RepDashboardCss.repRatingsHeader}>
          <p>{t('_REP_CHECKIN_ATTENDANCE_')}</p>
          <Link iconOnly>
            <Icon id={RepDashboardCss.repratingsBell} f7="bell" color="white">
              <Badge color="red">3</Badge>
            </Icon>
          </Link>
          <div id={RepDashboardCss.repAvatar}>
            <img src={RepAvatar} alt="Avatar" />
            <p>
              <strong>John Doe</strong> <br /> Sr. Medical Representative | Employee ID: 2422
            </p>
          </div>
        </Block>
        <Block id={RepDashboardCss.repRatings} strong></Block>
        <div id={RepDashboardCss.repRatingsCard}>
          <p>
            <Icon material="access_time" size={18} /> {t('_GENERAL_TIMINGS_')}: 9:00 AM to 6:00 PM
          </p>
          <Progressbar progress={70} id="checkin-progressbar" style={{ width: '90%' }} />
          <div className={RepDashboardCss.checkinCountdown}>
            <p>
              <Icon material="alarm" size={18} /> {t('_CHECK_OUT_STARTS_IN_')}
            </p>{' '}
            <span className={RepDashboardCss.countdownBg}>00</span>
            <span className={RepDashboardCss.countdownBg}>45</span>
            <span className={RepDashboardCss.countdownBg}>26</span>
          </div>
          <Button
            onClick={() => openCheckinDialog()}
            style={{
              backgroundColor: isUserCheckedin ? '#F1555A' : '#00b295',
              color: '#fff',
              width: '100%',
              fontSize: '20px',
            }}
          >
            {isUserCheckedin ? t('_CHECK_OUT_') : t('_CHECK_IN_')}
          </Button>
        </div>
      </PageContent>
    </Page>
  );
};
export default RepCheckinPage;
