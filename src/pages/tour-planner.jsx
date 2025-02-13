import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import '../css/tour-planner.css';
import CompareDrugsCss from '../css/compare-drugs.module.css';
import DrugMasterDashboardCss from '../css/drugmaster-dashboard.module.css';
import {
  App as F7App,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Block,
  Button,
  List,
  Card,
  CardContent,
  Segmented,
  Popup,
  NavRight,
  Link,
  Icon,
  ListInput,
  f7,
  Toolbar,
} from 'framework7-react';
import { ArrowLeft, Trash2, Edit, X as XIcon } from 'lucide-react';
import LoginCss from '../css/login.module.css';

const mockTours = [
  {
    id: 1,
    date: '23 Aug 2024',
    tourType: 'Admin Work',
    customers: 9,
    status: 'Saved',
    place: 'Hyderabad',
    startTime: '09:00',
    endTime: '17:00',
    station: 'Central',
  },
  {
    id: 2,
    date: '1 Aug 2024',
    tourType: 'Customer Engagement Activity',
    customers: 9,
    status: 'Saved',
    place: 'Delhi',
    startTime: '10:00',
    endTime: '18:00',
    station: 'North',
  },
  {
    id: 3,
    date: '1 Aug 2024',
    tourType: 'Field Work',
    customers: 9,
    status: 'Saved',
    place: 'Bangalore',
    startTime: '08:30',
    endTime: '16:30',
    station: 'South',
  },
];

const mockPendingTours = [
  {
    id: 6,
    date: '29 Aug 2024',
    name: 'Sourabh',
    tourType: 'Non Field Work',
    customers: 7,
    status: 'Pending',
    place: 'Pune',
  },
  {
    id: 7,
    date: '5 Mar 2024',
    name: 'Raj',
    tourType: 'Field Work',
    customers: 6,
    status: 'Pending',
    place: 'Chennai',
  },
  {
    id: 8,
    date: '1 Jul 2024',
    name: 'Sanket',
    tourType: 'Non Field Work',
    customers: 10,
    status: 'Pending',
    place: 'Hyderabad',
  },
];

const mockApprovedTours = [
  {
    id: 9,
    date: '15 Aug 2024',
    name: 'Amit',
    tourType: 'Field Work',
    customers: 8,
    status: 'Approved',
    place: 'Kolkata',
  },
  {
    id: 10,
    date: '20 Aug 2024',
    name: 'Priya',
    tourType: 'Admin Work',
    customers: 5,
    status: 'Approved',
    place: 'Ahmedabad',
  },
  {
    id: 11,
    date: '25 Aug 2024',
    name: 'Rahul',
    tourType: 'Customer Engagement',
    customers: 12,
    status: 'Rejected',
    place: 'Jaipur',
  },
];

const mockDeletedTours = [
  {
    id: 12,
    date: '10 Aug 2024',
    name: 'Neha',
    tourType: 'Field Work',
    customers: 4,
    status: 'Rejected',
    place: 'Lucknow',
  },
];

const mockDoctors = [
  { id: 1, name: 'Dr. Krishna', dob: '29/4/2024', phone: '9828373658', address: '3/285 Sri Aurobindo Marg' },
  { id: 2, name: 'Dr. Praveen Darji', dob: '29/4/2024', phone: '9828373659', address: '27, Kautilya Aurobindo Marg' },
  { id: 3, name: 'Dr. Anjali Sharma', dob: '15/5/2024', phone: '9876543210', address: '45, MG Road' },
  { id: 4, name: 'Dr. Rajesh Kumar', dob: '22/6/2024', phone: '9898989898', address: '12, Park Street' },
];

const mockCampaigns = [
  { id: 1, name: 'Summer Health Drive' },
  { id: 2, name: 'Diabetes Awareness' },
  { id: 3, name: 'Heart Health Campaign' },
  { id: 4, name: 'Vaccination Drive' },
];

const mockStations = ['Hyderabad', 'South Delhi', 'Bangalore Central', 'Pune East', 'Chennai North'];

const TourPlanner = ({ f7router }) => {
  const { t } = useTranslation('dashboard');
  const [view, setView] = useState('list');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [approveViewTab, setApproveViewTab] = useState('pending');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors based on search query
  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedDoctors.find((selected) => selected.id === doctor.id)
  );

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctors([...selectedDoctors, doctor]);
    setSearchQuery('');
  };

  const handleDoctorRemove = (doctorId) => {
    setSelectedDoctors(selectedDoctors.filter((doctor) => doctor.id !== doctorId));
  };

  const handleSave = () => {
    f7.toast
      .create({
        text: 'Tour plan saved successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    setView('list');
  };
  const handleApprovalConfirm = () => {
    f7.toast
      .create({
        text: 'Approval Comfirmed!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    setShowApprovalModal(false);
  };

  const handleDeletionConfirm = () => {
    f7.toast
      .create({
        text: 'Deleted Successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
    setShowApprovalModal(false);
  };
  const handleDeleteConfirm = () => {
    f7.toast
      .create({
        text: 'Tour plan deleted successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">delete</i>',
      })
      .open();
    setShowDeleteModal(false);
  };

  const renderListView = () => (
    <Block>
      <div className="flex gap-4" style={{ paddingLeft: '12px' }}>
        <Button fill large onClick={() => setView('approve')}>
          Approve Tours
        </Button>
        <Button fill large onClick={() => setView('create')}>
          Create NTP
        </Button>
      </div>
      {mockTours.map(renderTourCard)}
    </Block>
  );

  const renderApproveView = () => (
    <Block>
      <Segmented strong>
        <Button active={approveViewTab === 'pending'} onClick={() => setApproveViewTab('pending')}>
          Pending - {mockPendingTours.length}
        </Button>
        <Button active={approveViewTab === 'approved'} onClick={() => setApproveViewTab('approved')}>
          Approved/Rejected - {mockApprovedTours.length}
        </Button>
        <Button active={approveViewTab === 'deleted'} onClick={() => setApproveViewTab('deleted')}>
          Deleted - {mockDeletedTours.length}
        </Button>
      </Segmented>

      {approveViewTab === 'pending' &&
        mockPendingTours.map((tour) => (
          <Card key={tour.id}>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Tour Date</div>
                  <div className="text-primary">on {tour.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div>{tour.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tour Type</div>
                  <div>{tour.tourType}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">No of Customers</div>
                  <div>{tour.customers}</div>
                </div>
                <div className="text-red-900 bold" style={{ color: 'orange' }}>
                  Pending
                </div>
                <Button
                  fill
                  onClick={() => f7.dialog.alert(renderTourDetails(tour).replace(/\n/g, '<br/>'), 'Tour Details')}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      {approveViewTab === 'approved' &&
        mockApprovedTours.map((tour) => (
          <Card key={tour.id}>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Tour Date</div>
                  <div className="text-primary">on {tour.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div>{tour.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tour Type</div>
                  <div>{tour.tourType}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">No of Customers</div>
                  <div>{tour.customers}</div>
                </div>
                <div
                  className={tour.status === 'Approved' ? 'text-green-500' : 'text-red-500'}
                  style={{ color: 'green' }}
                >
                  {tour.status}
                </div>
                <Button
                  fill
                  onClick={() => f7.dialog.alert(renderTourDetails(tour).replace(/\n/g, '<br/>'), 'Tour Details')}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      {approveViewTab === 'deleted' &&
        mockDeletedTours.map((tour) => (
          <Card key={tour.id}>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Tour Date</div>
                  <div className="text-primary">on {tour.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div>{tour.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tour Type</div>
                  <div>{tour.tourType}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">No of Customers</div>
                  <div>{tour.customers}</div>
                </div>
                <div className="text-red-500" style={{ color: 'Red' }}>
                  Deleted
                </div>
                <Button
                  fill
                  onClick={() => f7.dialog.alert(renderTourDetails(tour).replace(/\n/g, '<br/>'), 'Tour Details')}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </Block>
  );

  const renderTourDetails = (tour) => {
    return Object.entries(tour)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  const renderCreateView = () => (
    <Block
      className="create-tour-form animate-fade-in"
      style={{ maxWidth: '1200px', margin: '20 auto', background: '#ffffff' }}
    >
      <Card className="tour-card">
        <CardContent style={{ width: '100%' }}>
          {/* <div className="form-title">Create New Tour Plan</div> */}
          <List noHairlinesMd inset id={LoginCss.loginList}>
            <ListInput
              outline
              label="Select Day"
              type="date"
              placeholder="Select date"
              clearButton
              className="custom-input"
              calendarParams={{
                closeOnSelect: true,
                backdrop: true,
                containerEl: '#app',
              }}
            />

            <ListInput
              outline
              label="Station"
              type="select"
              placeholder="Select station"
              dropdownPlaceholderText="Select station"
              className="custom-input custom-select"
              popupParams={{
                backdrop: true,
                closeOnSelect: true,
              }}
            >
              {mockStations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </ListInput>

            <ListInput
              outline
              label="Type of Tour Plan"
              type="select"
              placeholder="Select Type"
              dropdownPlaceholderText="Select Type"
              className="custom-input custom-select"
              popupParams={{
                backdrop: true,
                closeOnSelect: true,
              }}
            >
              <option value="field">Field Work</option>
              <option value="admin">Admin Work</option>
              <option value="customer">Customer Engagement</option>
            </ListInput>

            <ListInput
              outline
              label="Select Start Time"
              type="time"
              placeholder="Select time"
              className="custom-input"
              calendarParams={{
                closeOnSelect: true,
                backdrop: true,
                containerEl: '#app',
              }}
            />

            <ListInput
              outline
              label="Select End Time"
              type="time"
              placeholder="Select time"
              className="custom-input"
              calendarParams={{
                closeOnSelect: true,
                backdrop: true,
                containerEl: '#app',
              }}
            />

            <ListInput
              outline
              label="Select Campaign"
              type="select"
              placeholder="Select a campaign"
              dropdownPlaceholderText="Select a campaign"
              className="custom-input custom-select"
              popupParams={{
                backdrop: true,
                closeOnSelect: true,
              }}
            >
              {mockCampaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </ListInput>

            <div
              style={{
                position: 'relative',
                marginBottom: '20px',
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239,244,255,1)',
              }}
            >
              <div
                style={{
                  
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '10px',
                  fontWeight: '500',
                  backgroundColor: 'rgba(239,244,255,1)',
                }}
              >
                Select Doctors
              </div>

              {/* Selected doctors tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                {selectedDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#e8f0fe',
                      borderRadius: '4px',
                      padding: '6px 10px',
                      fontSize: '13px',
                      border: '1px solid #d0e1fd',
                      minWidth: '150px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#1967d2',
                      }}
                    >
                      {/* <span style={{ fontWeight: '500' }}>Dr.</span> */}
                      <span>{doctor.name.split(' ')[0]}</span>
                      <span>{doctor.name.split(' ')[1]}</span>
                    </div>
                    <button
                      onClick={() => handleDoctorRemove(doctor.id)}
                      style={{
                        padding: '2px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#1967d2',
                      }}
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Search input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowDoctorsDropdown(true)}
                placeholder="Search doctors..."
                style={{
                  width: '100%',
                  padding: '25px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(239,244,255,1)',
                }}
              />

              {/* Dropdown */}
              {showDoctorsDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    marginTop: '4px',
                  }}
                >
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #eee',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                        onClick={() => {
                          handleDoctorSelect(doctor);
                          setShowDoctorsDropdown(false);
                        }}
                      >
                        <div style={{ fontWeight: '500' }}>{doctor.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{doctor.address}</div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: '8px 12px',
                        color: '#666',
                        textAlign: 'center',
                      }}
                    >
                      No doctors found
                    </div>
                  )}
                </div>
              )}
            </div>

            <ListInput outline label="Enter Place" type="text" placeholder="Enter location" className="custom-input" />
          </List>

          <div className="buttonGroup">
            <Button fill large className="action-button save-button" onClick={handleSave}>
              Save
            </Button>
            <Button fill large className="action-button cancel-button" onClick={() => setView('list')}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </Block>
  );

  // Update the status badges in renderTourCard
  const renderTourCard = (tour) => (
    <Card key={tour.id} className="tour-card mb-4">
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Tour Planned Date</div>
            <div className="text-[#0f3d60]">on {tour.date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Tour Type</div>
            <div className="text-[#0f3d60]">{tour.tourType}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">No of Customers</div>
            <div>{tour.customers}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <div
              className={`status-badge ${
                tour.status === 'Approved'
                  ? 'status-approved'
                  : tour.status === 'Rejected'
                    ? 'status-rejected'
                    : 'status-pending'
              }`}
            >
              {tour.status === 'Pending for approval' && <span className="mr-2">?</span>}
              {tour.status === 'Approved' && <span className="mr-2">✓</span>}
              {tour.status === 'Rejected' && <span className="mr-2">×</span>}
              {tour.status}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            fill
            onClick={() => setShowApprovalModal(true)}
            className="bg-[#0f3d60] hover:bg-[#0f3d60]/90 text-white"
          >
            {tour.status === 'Approved' ? 'View details' : 'Send for Approval'}
          </Button>
          <Link iconOnly onClick={() => setShowDeleteModal(true)}>
            <Icon>
              <Trash2 size={20} />
            </Icon>
          </Link>
          {tour.status === 'Saved' && (
            <Link iconOnly>
              <Icon>
                <Edit size={20} />
              </Icon>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    // <F7App theme="ios">
    <Page className={DrugMasterDashboardCss.forpharmaPage} style={{ backgroundColor: '#ffffff' }}>
      <Navbar className={DrugMasterDashboardCss.pageNavBar} sliding={false}>
        {view !== 'list' && view !== 'create' && (
          <NavLeft>
            <Link onClick={() => setView('list')}>
              <Icon>
                <ArrowLeft size={24} />
              </Icon>
            </Link>
          </NavLeft>
        )}
        <NavTitle className={DrugMasterDashboardCss.pageTitle} style={{ paddingTop: '30px', fontSize: '30px' }}>
          {view === 'list' && 'Tour Plans'}
          {view === 'approve' && 'Approve Plans'}
          {view === 'create' && 'Create New Tour Plan'}
          {view === 'edit' && 'Edit Tour Plan'}
        </NavTitle>
        <NavRight />
      </Navbar>
      <Block>
        {view === 'list' && renderListView()}
        {view === 'approve' && renderApproveView()}
        {view === 'create' && renderCreateView()}

        <Popup
          opened={showApprovalModal}
          onClose={() => setShowApprovalModal(false)}
          className="custom-modal"
          closeOnEscape={true}
          backdrop={true}
          animate={false}
        >
          <div className="custom-modal-content">
            <p className="text-center text-lg font-medium">Send tour plan to Manager for approval?</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                fill
                onClick={() => {
                  setShowApprovalModal(false);
                }}
                color="red"
                className="w-24"
              >
                No
              </Button>
              <Button
                fill
                onClick={() => {
                  handleApprovalConfirm();
                  setShowApprovalModal(false);
                }}
                color="blue"
                className="w-24"
              >
                Yes
              </Button>
            </div>
          </div>
        </Popup>
        <Popup
          opened={showDeleteModal}
          onClose={() => setShowApprovalModal(false)}
          className="custom-modal"
          closeOnEscape={true}
          backdrop={true}
          animate={false}
        >
          <div className="custom-modal-content">
            <p className="text-center text-lg font-medium">Are you sure you want to delete tour plan?</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                fill
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                color="red"
                className="w-24"
              >
                No
              </Button>
              <Button
                fill
                onClick={() => {
                  handleDeletionConfirm();
                  setShowDeleteModal(false);
                }}
                color="blue"
                className="w-24"
              >
                Yes
              </Button>
            </div>
          </div>
        </Popup>

        {/* <Popup
          opened={showDeleteModal}
          onPopupClosed={() => setShowDeleteModal(false)}
          className="small-popup"
          tabletFullscreen={false}
        >
          <Block>
            <p>Are you sure you want to delete tour plan?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowDeleteModal(false)} color="red">
                No
              </Button>
              <Button fill onClick={handleDeleteConfirm} color="green">
                Yes
              </Button>
            </div>
          </Block>
        </Popup> */}
      </Block>
      <Toolbar bottom className={DrugMasterDashboardCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> Home
        </Link>
        <Link href="#" tabLinkActive>
          <Icon material="local_pharmacy_outlined" size={32} color="blue" /> New Tour Plan
        </Link>
      </Toolbar>
    </Page>
    // </F7App>
  );
};

export default TourPlanner;
