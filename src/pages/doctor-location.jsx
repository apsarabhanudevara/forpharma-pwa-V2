import React, { useState, useEffect, useRef } from 'react';
import { Icon, Link, List, ListItem, Navbar, NavLeft, NavRight, NavTitle, Page, Toolbar } from 'framework7-react';
import DoctorSpecialityCss from '../css/doctor-speciality.module.css';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Trans, useTranslation } from 'react-i18next';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const DoctorLocation = ({ f7router }) => {
  const { t } = useTranslation(['meetingtarget']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const doctors = useLiveQuery(() => db.doctors.toArray(), []) || [];

  const dropdownRef = useRef(null);
  const searchIconRef = useRef(null);
  const searchBarRef = useRef(null); // New ref for search bar

  // Get unique city and state names from doctors list
  const cityStateList = [
    ...new Set(
      doctors.flatMap((doctor) => [doctor.city__c, doctor.state__c].filter((val) => val)) // Ensure no null/undefined values
    ),
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== '') {
      setIsDropdownOpen(true); // Open the dropdown only when there is input
    } else {
      setIsDropdownOpen(false); // Close the dropdown if the input is empty
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // Set the selected city or state
    setSearchQuery(location); // Update search query with the selected location
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchBarVisible &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target) // Ensure search icon is not clicked
      ) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
        setSearchBarVisible(false); // Close search bar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, [searchBarVisible]);

  // Filter doctors based on the selected city or state
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.city__c === selectedLocation || doctor.state__c === selectedLocation
  );

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
            <span>Doctor Master</span>
            <br />
            Doctors by Location
          </p>
        </NavTitle>
        <NavRight>
          {/* Wrap the icon in a native element like div or span */}
          <div ref={searchIconRef}>
            <Link onClick={() => setSearchBarVisible(!searchBarVisible)}>
              <Icon material="search" size={24} color="white" />
            </Link>
          </div>
        </NavRight>
      </Navbar>

      {/* Search bar - Only show if the search icon is clicked */}
      {searchBarVisible && (
        <div className={DoctorSpecialityCss.searchBarContainer} ref={searchBarRef}>
          <Icon material="search" size={24} className={DoctorSpecialityCss.searchIcon} />
          <input
            type="text"
            className={DoctorSpecialityCss.searchInput}
            placeholder="Search by city or state"
            value={searchQuery}
            onClick={() => searchQuery && setIsDropdownOpen(true)}
            onChange={handleSearchChange}
          />
          <Icon material="mic" size={24} className={DoctorSpecialityCss.micIcon} />
        </div>
      )}

      {/* Dropdown for city and state names - Only shows when searchQuery is not empty */}
      {isDropdownOpen && cityStateList.length > 0 && (
        <div className={DoctorSpecialityCss.dropdownContainer} ref={dropdownRef}>
          <List className={DoctorSpecialityCss.dropdownList}>
            {cityStateList
              .filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((location, index) => (
                <ListItem key={index} title={location} onClick={() => handleLocationSelect(location)} />
              ))}
          </List>
        </div>
      )}

      {/* List of filtered doctors */}
      {selectedLocation && filteredDoctors.length > 0 && (
        <List mediaList>
          <ul>
            {filteredDoctors.map((doctor, index) => (
              <ListItem
                key={index}
                mediaItem
                chevronCenter
                link={`/doctor-master/${doctor.uid__c}/`}
                title={`${doctor.title__c} ${doctor.full_name__c}`}
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
      )}

      {/* Bottom toolbar - always visible */}
      <Toolbar bottom className={DoctorSpecialityCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/doctor-master-dashboard">
          <Icon icon="dashboard" size={22} /> {t('_DASHBOARD_')}
        </Link>
        <Link href="/doctor-master" panelClose="#doctor-info-panel">
          <Icon icon="doctors" size={22} /> {t('_DOCTOR_MASTER_')}
        </Link>
        <Link href="/doctor-speciality">
          <Icon f7="heart" size={22} /> {t('_DOCTOR_BY_SPECIALITY_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="person_pin_circle_outline" size={22} color="blue" /> {t('_DOCTORS_BY_LOCATION_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default DoctorLocation;
