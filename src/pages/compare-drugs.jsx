import React, { useEffect, useState, useRef } from 'react';
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

import CompareDrugsCss from '../css/compare-drugs.module.css';
import QrCode from '../assets/images/Qr-code.png';
import Azithral from '../assets/drugs/azithral.png';

const CompareDrugs = ({ f7router }) => {
  const { t } = useTranslation(['drugmaster']);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  const specialtiesList = [
    'Azithral 250mg',
    'Azee 1000',
    'Paracitemol',
    'Citrizin',
    'Bentnesol',
    'Benadrryl',
    'ascoril',
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
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true); // Keep dropdown open while typing
  };

  const filteredSpecialties = specialtiesList.filter((specialty) =>
    specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <Page className={CompareDrugsCss.forpharmaPage}>
      <Navbar className={CompareDrugsCss.pageNavBar} sliding={false}>
        <NavTitle className={CompareDrugsCss.pageTitle}>
          <p>
            {t('_DRUG_MASTER_')}
            <br />
            <span className={CompareDrugsCss.updatedAt}>Compare Drugs</span>
          </p>
        </NavTitle>
      </Navbar>

      <Toolbar bottom className={CompareDrugsCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/drug-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/drug-master">
          <Icon material="local_pharmacy_outlined" size={22} /> {t('_DRUG_MASTER_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="compare_arrows_outlined" size={22} color="blue" /> {t('_COMPARE_DRUGS_')}
        </Link>
        <Link href="/drug-category">
          <Icon material="category_outlined" size={24} />
          {t('_DRUGS_BY_CATEGORY_')}
        </Link>
      </Toolbar>

      <div className={CompareDrugsCss.searchBarContainer}>
        <Icon material="search" size={24} className={CompareDrugsCss.searchIcon} />
        <input
          type="text"
          className={CompareDrugsCss.searchInput}
          placeholder="Search specialty"
          value={searchQuery}
          onClick={() => setIsDropdownOpen(true)}
          onChange={handleSearchChange}
        />
        <Icon material="mic" size={24} className={CompareDrugsCss.micIcon} />
      </div>

      {/* Dropdown for filtered specialties */}
      {isDropdownOpen && filteredSpecialties.length > 0 && (
        <div className={CompareDrugsCss.dropdownContainer} ref={dropdownRef}>
          <List className={CompareDrugsCss.dropdownList}>
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
      {selectedSpecialties.length > 1 && (
        <Block style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '108px', borderRadius: '8px' }}>
              <p>Drug</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '108px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: '12px' }}>
                <div>
                  <img src={Azithral} alt="Medicine" style={{ width: '40px', height: '40px' }} />
                </div>
                <div>
                  <img src={QrCode} alt="QR Code" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#2186d4',
                    width: '20px',
                  }}
                >
                  <Icon material="share" color="white" />
                </div>
              </div>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                {/* Added minWidth and maxWidth */}
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>AZ002</h3>
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>Azeth 1000</h3>{' '}
                {/* Added a small bottom margin */}
                <p style={{ fontSize: '9px', margin: '0', width: '120px' }}>Azithromicin 250mg</p>{' '}
                <p style={{ fontSize: '9px', margin: '0', width: '120px' }}>Manufacturer: Akmbic</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '108px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: '12px' }}>
                <div>
                  <img src={Azithral} alt="Medicine" style={{ width: '40px', height: '40px' }} />
                </div>
                <div>
                  <img src={QrCode} alt="QR Code" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#2186d4',
                    width: '20px',
                  }}
                >
                  <Icon material="share" color="white" />
                </div>
              </div>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                {/* Added minWidth and maxWidth */}
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>AZ002</h3>
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>Azee 1000</h3>{' '}
                {/* Added a small bottom margin */}
                <p style={{ fontSize: '9px', margin: '0', width: '120px' }}>Azithromicin 250mg</p>{' '}
                <p style={{ fontSize: '9px', margin: '0', width: '120px' }}>Manufacturer: Akmbic</p>
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '46px', borderRadius: '8px' }}>
              <p>Price</p>
            </div>
            <div
              style={{
                backgroundColor: '#e9edf0',
                width: '123px',
                height: '46px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                {/* Added minWidth and maxWidth */}
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>Rs 356.00</h3>
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#e9edf0',
                width: '123px',
                height: '46px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                {/* Added minWidth and maxWidth */}
                <h3 style={{ margin: '0 0 0 0', width: '110px', fontSize: '11px' }}>Rs 356.00</h3>
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Uses</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Cautions</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Prior to Use</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Dosage</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Side Effects</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Compatability</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>FAQ</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cgggg,
                </p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
                  voluptates obcaecati officia cum,g
                </p>{' '}
              </div>
            </div>
          </div>
          <div id={CompareDrugsCss.twoColumns} className="grid grid-cols-3 grid-gap">
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <p>Marketing Email</p>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>
                  Promotional Interactive brochures PDF's
                </p>{' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>Visual aids PDF's</p>{' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>Visual aids Videos</p>{' '}
              </div>
            </div>
            <div style={{ backgroundColor: '#e9edf0', width: '123px', height: '163px', borderRadius: '8px' }}>
              <div style={{ flexGrow: 1, minWidth: '0', maxWidth: 'calc(100% - 100px)' }}>
                {' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>
                  Promotional Interactive brochures PDF's
                </p>{' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>Visual aids PDF's</p>{' '}
                <p style={{ fontSize: '13px', margin: '0', width: '120px', color: '#2186d4' }}>Visual aids Videos</p>{' '}
              </div>
            </div>
          </div>
        </Block>
      )}
    </Page>
  );
};
export default CompareDrugs;
