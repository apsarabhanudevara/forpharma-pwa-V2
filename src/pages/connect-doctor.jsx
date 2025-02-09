import React, { useState, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  Block,
  BlockTitle,
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Sheet,
  ListItem,
  Toggle,
  Toolbar,
} from 'framework7-react';
import DoctorSpecialityCss from '../css/doctor-speciality.module.css';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';

const ConnectDoctor = ({ f7router }) => {
  const { t } = useTranslation(['meetingtarget']);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const doctors = useLiveQuery(() => db.doctors.toArray());
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  const dropdownRef = useRef(null);

  const specialtiesList = [
    'Dr. Sridhar Reddy Peddy',
    'Dr. Sriansh',
    'Dr. Sridevi',
    'Dr. Pandit',
    'Dr. Kumar',
    'Dr. Tiwari',
  ];

  const handleSpecialtyChange = (specialty) => {
    const isSelected = selectedSpecialties.includes(specialty);

    if (isSelected) {
      const updatedSpecialties = selectedSpecialties.filter((s) => s !== specialty);
      setSelectedSpecialties(updatedSpecialties);
    } else {
      const updatedSpecialties = [...selectedSpecialties, specialty];
      setSelectedSpecialties(updatedSpecialties);
    }

    // Do not clear the search query, just close the dropdown
    setIsDropdownOpen(false);
    setShareSheetOpen(true);
  };

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

  // Filter the specialties based on the search query
  const filteredSpecialties = specialtiesList.filter((specialty) =>
    specialty.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span>Message Composition</span>
          </p>
          <br />
          {/* Horizontal Radio Buttons */}
          {/* <div className={DoctorSpecialityCss.radioGroup}>
            <label className={DoctorSpecialityCss.radioLabel}>
              <input type="radio" name="messageType" value="option1" defaultChecked />
              <span>Option 1</span>
            </label>
            <label className={DoctorSpecialityCss.radioLabel}>
              <input type="radio" name="messageType" value="option2" />
              <span>Option 2</span>
            </label>
            <label className={DoctorSpecialityCss.radioLabel}>
              <input type="radio" name="messageType" value="option3" />
              <span>Option 3</span>
            </label>
            <label className={DoctorSpecialityCss.radioLabel}>
              <input type="radio" name="messageType" value="option4" />
              <span>Option 4</span>
            </label>
          </div> */}
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" size={24} color="white" />
          </Link>
        </NavRight>
      </Navbar>

      <div className={DoctorSpecialityCss.searchBarContainer}>
        <Icon material="search" size={24} className={DoctorSpecialityCss.searchIcon} />
        <input
          type="text"
          className={DoctorSpecialityCss.searchInput}
          placeholder="Search specialty"
          value={searchQuery}
          onClick={() => setIsDropdownOpen(true)}
          onChange={handleSearchChange}
        />
        <Icon material="mic" size={24} className={DoctorSpecialityCss.micIcon} />
      </div>

      {/* Dropdown for filtered specialties */}
      {isDropdownOpen && filteredSpecialties.length > 0 && (
        <div className={DoctorSpecialityCss.dropdownContainer} ref={dropdownRef}>
          <List className={DoctorSpecialityCss.dropdownList}>
            {filteredSpecialties.map((specialty, index) => (
              <ListItem
                key={index}
                title={specialty}
                checkbox
                checked={selectedSpecialties.includes(specialty)}
                onClick={() => handleSpecialtyChange(specialty)}
              />
            ))}
          </List>
        </div>
      )}
      <Sheet
        opened={shareSheetOpen}
        className="demo-sheet-swipe-to-close"
        style={{ height: 'auto' }}
        swipeToClose
        push
        backdrop
        onSheetClosed={() => setShareSheetOpen(false)}
      >
        <div className="swipe-handler"></div>

        <PageContent>
          <Block className="page-flex-provider">
            <div className="page-width-wrapper">
              <p>
                Share with <strong>Dr. Sridhar Reddy Peddy</strong>
              </p>
            </div>
          </Block>
          <hr />
          <Block className="page-flex-provider">
            <div className="page-width-wrapper">
              <p>Select content type</p>
              <div id={DoctorSpecialityCss.shareModalTop}>
                <Link>
                  <Icon icon="share-icon-01" />
                  <p>
                    Template text <br /> messages
                  </p>
                </Link>
                <Link>
                  <Icon icon="share-icon-02" />
                  <p>
                    Drug details/ <br /> Visual Aids
                  </p>
                </Link>
                <Link>
                  <Icon icon="share-icon-03" />
                  <p>Reports</p>
                </Link>
                <Link>
                  <Icon icon="more-icon" />
                  <p>More</p>
                </Link>
              </div>
              <div id={DoctorSpecialityCss.shareModalTopToggle}>
                Followup communication <Toggle color="green" />
              </div>
            </div>
          </Block>
          <hr />
          <Block className="page-flex-provider">
            <div className="page-width-wrapper">
              <p>Choose communication method</p>
              <div id={DoctorSpecialityCss.shareModalBottom}>
                <Link>
                  <Icon icon="whatsapp" />
                  <p>WhatsApp</p>
                </Link>
                <Link>
                  <Icon icon="fpmail" />
                  <p>Email</p>
                </Link>
                <Link>
                  <Icon icon="fpmessage" />
                  <p>Messages</p>
                </Link>
                <Link>
                  <Icon icon="more-icon" />
                  <p>More</p>
                </Link>
              </div>
              <div id={DoctorSpecialityCss.shareContentBtn}>
                <Button large fill>
                  <Icon material="share" style={{ marginRight: '16px' }} /> Share
                </Button>
              </div>
            </div>
          </Block>
        </PageContent>
      </Sheet>

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
        <Link href="/doctor-location">
          <Icon material="person_pin_circle_outline" size={22} /> {t('_DOCTORS_BY_LOCATION_')}
        </Link>
      </Toolbar>
    </Page>
  );
};

export default ConnectDoctor;
