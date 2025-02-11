import React, { useState, useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
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
import DoctorSpecialityCss from '../css/doctor-speciality.module.css';

import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';

const createinitials = (f) => {
  if (!f || typeof f !== 'string') {
    return ''; // Return empty string or handle the case as needed
  }
  const name = f.trim(); // Ensure there are no extra spaces
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const TransferDoctorMeeting = (props) => {
  const { f7router } = props;
  const { t } = useTranslation(['meetingtarget']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dialogRef = useRef(null);
  const doctors = useLiveQuery(() => db.doctors.toArray());
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true); // Keep dropdown open while typing
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup the listener
    };
  }, [isDropdownOpen]);
  // Transfer meeting dialog
  const showTransferMeetingDialog = () => {
    dialogRef.current = f7.dialog.create({
      title: `
        <div style="text-align: center;">
            Confirm Doctor Transfer
        </div>
        <div style="text-align: center;font-size: 12px">
            Confirm the meeting handover
        </div>
        <div style="text-align: center;font-size: 12px">
            Gachibowli, Hyderabad
        </div>
        <div style="text-align: center;font-size: 12px">
            July 23 2024, 3:15AM to 10:15AM
        </div>
        <hr style="margin-top: 10px; border: 1px solid #ccc;"/>
        <div style="font-size: 14px;">
            Current Employee:
        </div>
        <div style="display: flex; gap: 10px; font-size: 12px; margin: 10px 0">
            <div style="display: flex;align-items: center;justify-content: center;width: 30px;
                height: 30px;border-radius: 50%;background-color: #007bff;
                color: white;
                font-size: 14px;
                font-weight: bold;
                text-align: center">
                JD
            </div>
            <div style="display: flex;flex-direction: column;">
                <span>Jhon Doe</span>
                <span>Sr. Medical Representative</span>
            </div>
        </div>
        <div style="font-size: 14px;">
            Selected Employee:
        </div>
        <div style="display: flex; gap: 10px; font-size: 12px; margin: 10px 0">
            <div style="display: flex;align-items: center;justify-content: center;width: 30px;
                height: 30px;border-radius: 50%;background-color: #007bff;
                color: white;
                font-size: 14px;
                font-weight: bold;
                text-align: center">
                RK
            </div>
            <div style="display: flex;flex-direction: column;">
                <span>Ravi Kumar</span>
                <span>Sales Manager</span>
            </div>
        </div>
        <div style="font-size: 14px;">
            Meeting Doctor Details:
        </div>
        <div style="display: flex; gap: 10px; font-size: 12px; margin: 10px 0">
            <div style="display: flex;align-items: center;justify-content: center;width: 30px;
                height: 30px;border-radius: 50%;background-color: #007bff;
                color: white;
                font-size: 14px;
                font-weight: bold;
                text-align: center">
                SR
            </div>
            <div style="display: flex;flex-direction: column;">
                <span>Dr. Sridhar Reddy Peddi</span>
                <span>Cardiologist</span>
                <span>13 September, 2024 3:30PM to 3:50PM</span>
            </div>
        </div>
        <hr style="margin-top: 10px; border: 1px solid #ccc;"/>
  
        `,
      buttons: [
        {
          text: 'CANCEL',
          color: 'blue',
          onClick() {
            // dialogRef.current.close();
            f7router.navigate('/doctors');
          },
        },
        {
          text: 'OK',
          bold: true,
          onClick() {
            // dialogRef.current.close();
            f7router.navigate('/doctors');
          },
        },
      ],
    });

    dialogRef.current.open();

    // Adjust styles after opening the dialog
    setTimeout(() => {
      if (dialogRef.current) {
        dialogRef.current.$el.css({
          left: '37%',
          width: '93vw',
        });
      }
    }, 0);
  };
  // Filter doctors based on search query
  const filteredDoctors = doctors?.filter((doctor) => {
    const fullName = `${doctor.title__c} ${doctor.full_name__c}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Page className={DoctorSpecialityCss.forpharmaPage}>
      <Navbar className={DoctorSpecialityCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={DoctorSpecialityCss.pageTitle}>
          <p>{t('_DOCTOR_MASTER_')}</p>
        </NavTitle>
        <NavRight>
          <Link onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Icon material="search" size={24} color="white" />
          </Link>
        </NavRight>
      </Navbar>

      {isDropdownOpen && (
        <div className={DoctorSpecialityCss.searchBarContainer}>
          <input
            type="text"
            className={DoctorSpecialityCss.searchInput}
            placeholder="Search doctor"
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={() => setIsDropdownOpen(true)}
          />
        </div>
      )}

      <List mediaList>
        <ul>
          {filteredDoctors &&
            filteredDoctors.map((doctor, index) => (
              <ListItem
                key={index}
                mediaItem
                chevronCenter
                onClick={showTransferMeetingDialog}
                title={`${doctor.title__c} ${doctor.full_name__c}`}
                subtitle={doctor.designation__c}
                text={`${doctor.city__c}, ${doctor.state__c}`}
                style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
              >
                {(index + 1) % 3 === 0 ? (
                  <div
                    slot="media"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#134e7c',
                      color: 'white',
                      fontSize: '30px',
                      width: '65px',
                      height: '65px',
                    }}
                    width={65}
                  >
                    {createinitials(doctor.full_name__c)}
                  </div>
                ) : (
                  <img slot="media" style={{ borderRadius: '50%' }} width={65} src={RepAvatar} />
                )}
              </ListItem>
            ))}
        </ul>
      </List>

      <Toolbar bottom className={DoctorSpecialityCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} />
          {t('_HOME_')}
        </Link>
        <Link href="#">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctors" tabLinkActive>
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="/chemists">
          <Icon icon="chemists" size={32} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default TransferDoctorMeeting;
