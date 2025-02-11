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

const DoctorMaster = (props) => {
  const { t } = useTranslation(['meetingtarget']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Filter doctors based on search query
  const filteredDoctors = doctors?.filter((doctor) => {
    const fullName = `${doctor.title__c} ${doctor.full_name__c}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Page className={DoctorSpecialityCss.forpharmaPage}>
      <Navbar className={DoctorSpecialityCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link></Link>
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
                link={`/doctor-master/${doctor.uid__c}/`}
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
        <Link href="/doctor-master-dashboard">
          <Icon icon="dashboard" size={32} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="#" tabLinkActive panelClose="#doctor-info-panel">
          <Icon icon="doctors" size={32} color="blue" />
          {t('_DOCTOR_MASTER_')}
        </Link>
        <Link href="/doctor-speciality">
          <Icon f7="heart" size={32} />
          {t('_DOCTOR_BY_SPECIALITY_')}
        </Link>
        <Link href="/doctor-location">
          <Icon material="person_pin_circle_outline" size={32} />
          {t('_DOCTORS_BY_LOCATION_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default DoctorMaster;
