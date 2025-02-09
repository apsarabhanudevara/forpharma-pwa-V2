import React, { useState, useEffect, useRef } from 'react';
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
import RepAvatar from '../assets/images/rep-placeholder.jpg';

import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import DoctorSpecialityCss from '../css/doctor-speciality.module.css';

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

const DoctorSpeciality = ({ f7router }) => {
  const { t } = useTranslation(['meetingtarget']);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const doctors = useLiveQuery(() => db.doctors.toArray());

  const dropdownRef = useRef(null);

  const handleDoctorChange = (designation) => {
    const isSelected = selectedDoctors.includes(designation);

    if (isSelected) {
      const updatedDoctors = selectedDoctors.filter((s) => s !== designation);
      setSelectedDoctors(updatedDoctors);
    } else {
      const updatedDoctors = [...selectedDoctors, designation];
      setSelectedDoctors(updatedDoctors);
    }

    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsSearchActive(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Filter doctors based on designation__c instead of full_name__c and remove duplicates
  const filteredDoctors = doctors
    ?.filter((doctor) => doctor.designation__c.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((unique, current) => {
      const isDuplicate = unique.some((item) => item.designation__c === current.designation__c);
      if (!isDuplicate) {
        unique.push(current);
      }
      return unique;
    }, []);

  return (
    <Page className={DoctorSpecialityCss.forpharmaPage}>
      <Navbar className={DoctorSpecialityCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={DoctorSpecialityCss.pageTitle}>
          <p>
            <span>{t('_DOCTOR_MASTER_')}</span>
            <br />
            {t('_DOCTOR_BY_SPECIALITY_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link onClick={() => setIsSearchActive(true)}>
            <Icon material="search" size={24} color="white" />
          </Link>
        </NavRight>
      </Navbar>

      {isSearchActive && (
        <>
          <div className={DoctorSpecialityCss.searchBarContainer}>
            <Icon material="search" size={24} className={DoctorSpecialityCss.searchIcon} />
            <input
              type="text"
              className={DoctorSpecialityCss.searchInput}
              placeholder="Search by designation"
              value={searchQuery}
              onClick={() => setIsDropdownOpen(true)}
              onChange={handleSearchChange}
            />
            <Icon material="mic" size={24} className={DoctorSpecialityCss.micIcon} />
          </div>

          {isDropdownOpen && filteredDoctors?.length > 0 && (
            <div className={DoctorSpecialityCss.dropdownContainer} ref={dropdownRef}>
              <List className={DoctorSpecialityCss.dropdownList}>
                {filteredDoctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    title={doctor.designation__c}
                    checkbox
                    checked={selectedDoctors.includes(doctor.designation__c)}
                    onClick={() => handleDoctorChange(doctor.designation__c)}
                  />
                ))}
              </List>
            </div>
          )}
        </>
      )}

      {selectedDoctors.length > 0 && (
        <List mediaList>
          <ul>
            {doctors
              .filter((doctor) => selectedDoctors.includes(doctor.designation__c))
              .map((doctor, index) => (
                <ListItem
                  key={index}
                  mediaItem
                  chevronCenter
                  link={`/doctor-master/${doctor.uid__c}/`}
                  title={doctor.title__c + ' ' + doctor.full_name__c}
                  subtitle={doctor.designation__c}
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
      )}

      <Toolbar bottom className={DoctorSpecialityCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} />
          {t('_HOME_')}
        </Link>
        <Link href="/doctor-master-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctor-master" panelClose="#doctor-info-panel">
          <Icon icon="doctors" size={22} />
          {t('_DOCTOR_MASTER_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon f7="heart" size={22} color="blue" />
          {t('_DOCTOR_BY_SPECIALITY_')}
        </Link>
        <Link href="/doctor-location">
          <Icon material="person_pin_circle_outline" size={22} />
          {t('_DOCTORS_BY_LOCATION_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default DoctorSpeciality;
