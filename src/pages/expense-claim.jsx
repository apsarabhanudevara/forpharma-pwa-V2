import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/expense-claim.css';
import {
  Page,
  Navbar,
  NavTitle,
  Block,
  Popup,
  NavRight,
  Link,
  Icon,
  ListInput,
  List,
  Button,
  Toolbar,
  f7,
} from 'framework7-react';
import DrugMasterDashboardCss from '../css/drugmaster-dashboard.module.css';

const ExpenseClaim = ({ f7router }) => {
  const { t } = useTranslation(['drugmaster']);
  const [showNewClaimPopup, setShowNewClaimPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [formData, setFormData] = useState({
    claimType: '',
    fromDate: '',
    toDate: '',
    fromPlace: '',
    toPlace: '',
    conveyanceMode: '',
    distance: '',
    totalAmount: '',
  });

  const [claims] = useState([
    {
      expenseDate: '09 July 2024',
      transactionDate: '09 July 2024',
      employeeId: '2965',
      employeeName: 'Ashu',
      department: 'AH',
      claimType: 'Local Conveyance',
      claimSubType: 'Bike',
      amount: '₹315',
      status: 'Pending',
    },
    {
      expenseDate: '01 July 2024',
      transactionDate: '01 July 2024',
      employeeId: '2965',
      employeeName: 'Ashu',
      department: 'AH',
      claimType: 'Local Conveyance',
      claimSubType: 'Bike',
      amount: '₹320',
      status: 'Pending',
    },
    {
      expenseDate: '10 June 2024',
      transactionDate: '10 June 2024',
      employeeId: '2970',
      employeeName: 'Mira',
      department: 'Finance',
      claimType: 'Hotel Stay',
      claimSubType: 'Business Trip',
      amount: '₹2500',
      status: 'Pending',
    },
    // Two new pending records
    {
      expenseDate: '08 July 2024',
      transactionDate: '08 July 2024',
      employeeId: '2972',
      employeeName: 'Priya',
      department: 'Sales',
      claimType: 'Travel',
      claimSubType: 'Cab',
      amount: '₹450',
      status: 'Pending',
    },
    {
      expenseDate: '07 July 2024',
      transactionDate: '07 July 2024',
      employeeId: '2973',
      employeeName: 'Rahul',
      department: 'Marketing',
      claimType: 'Food',
      claimSubType: 'Team Lunch',
      amount: '₹1200',
      status: 'Pending',
    },
    {
      expenseDate: '15 June 2024',
      transactionDate: '15 June 2024',
      employeeId: '2966',
      employeeName: 'John',
      department: 'IT',
      claimType: 'Local Conveyance',
      claimSubType: 'Taxi',
      amount: '₹500',
      status: 'Approved',
    },
    {
      expenseDate: '20 May 2024',
      transactionDate: '20 May 2024',
      employeeId: '2975',
      employeeName: 'Sita',
      department: 'HR',
      claimType: 'Food',
      claimSubType: 'Client Meeting',
      amount: '₹800',
      status: 'Approved',
    },
    {
      expenseDate: '05 May 2024',
      transactionDate: '05 May 2024',
      employeeId: '2968',
      employeeName: 'Ravi',
      department: 'Sales',
      claimType: 'Flight Ticket',
      claimSubType: 'Business Trip',
      amount: '₹7000',
      status: 'Rejected',
    },
    {
      expenseDate: '12 April 2024',
      transactionDate: '12 April 2024',
      employeeId: '2980',
      employeeName: 'Neha',
      department: 'Marketing',
      claimType: 'Conference',
      claimSubType: 'Registration Fee',
      amount: '₹1500',
      status: 'Rejected',
    },
  ]);

  const statusCounts = {
    Pending: claims.filter((claim) => claim.status === 'Pending').length,
    Approved: claims.filter((claim) => claim.status === 'Approved').length,
    Rejected: claims.filter((claim) => claim.status === 'Rejected').length,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // showToast('Expense claim saved successfully!');
    handleSaveExpense();
    setShowNewClaimPopup(false);
  };

  const handleSaveExpense = () => {
    f7.toast
      .create({
        text: 'Expense Claim saved successfully!',
        closeTimeout: 2000,
        position: 'center',
        cssClass: 'custom-toast',
        icon: '<i class="icon f7-icons">checkmark_circle</i>',
      })
      .open();
  };

  const showToast = (message) => {
    f7.toast
      .create({
        text: message,
        closeTimeout: 2000,
        position: 'top',
        cssClass: 'success-toast',
      })
      .open();
  };

  return (
    <Page className={DrugMasterDashboardCss.forpharmaPage}>
      <Navbar className={DrugMasterDashboardCss.pageNavBar} sliding={false}>
        <NavTitle className={DrugMasterDashboardCss.pageTitle}>
          <div className="navbar-title">
            <h1>All Claims</h1>
            <small style={{ color: 'white' }}>
              Last updated:{' '}
              {new Date().toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata',
              })}{' '}
              (Hyderabad, India)
            </small>
          </div>
        </NavTitle>
      </Navbar>

      <div className="action-buttons">
        <button className="action-button create-expense" onClick={() => setShowNewClaimPopup(true)}>
          <span className="icon">+</span>
          Create New Expense
        </button>
        <button className="action-button approve-claims" onClick={() => showToast('Claims approved successfully!')}>
          <span className="icon">✓</span>
          Approve Claims
        </button>
      </div>

      <div className="status-filters">
        {['Pending', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            className={`status-button ${selectedStatus === status ? 'active' : ''}`}
            onClick={() => setSelectedStatus(status)}
            data-count={statusCounts[status]}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="claims-container">
        <div className="table-container">
          <table className="claims-table">
            <thead>
              <tr>
                <th>Expense Date</th>
                <th>Transaction Date</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Claim Type</th>
                <th>Claim Sub Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {claims
                .filter((claim) => claim.status === selectedStatus)
                .map((claim, index) => (
                  <tr key={index}>
                    <td>{claim.expenseDate}</td>
                    <td>{claim.transactionDate}</td>
                    <td>{claim.employeeId}</td>
                    <td>{claim.employeeName}</td>
                    <td>{claim.department}</td>
                    <td>{claim.claimType}</td>
                    <td>{claim.claimSubType}</td>
                    <td>{claim.amount}</td>
                    <td>
                      <span className={`status-badge ${claim.status.toLowerCase()}`}>{claim.status}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Popup opened={showNewClaimPopup} onPopupClosed={() => setShowNewClaimPopup(false)}>
        <Page>
          <Navbar>
            <NavTitle>Create New Claims</NavTitle>
            <NavRight>
              <Link popupClose style={{ color: 'white' }}>
                Close
              </Link>
            </NavRight>
          </Navbar>
          <Block>
            <form onSubmit={handleFormSubmit} className="claim-form">
              <h2 style={{ color: 'white' }}>Claim - 1</h2>
              <button type="button" className="add-new-claims">
                + Add New Claims
              </button>
              <List noHairlinesMd>
                <div className="form-row">
                  <ListInput
                    label="Claim Type *"
                    type="select"
                    value={formData.claimType}
                    onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                  >
                    <option value="">Select Claim Type</option>
                    <option value="Local Conveyance">Local Conveyance</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                  </ListInput>
                  <ListInput
                    label="From Date *"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <ListInput
                    label="To Date *"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  />
                  <ListInput
                    label="From Place *"
                    type="text"
                    placeholder="Enter From Place"
                    value={formData.fromPlace}
                    onChange={(e) => setFormData({ ...formData, fromPlace: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <ListInput
                    label="To Place *"
                    type="text"
                    placeholder="Enter To Place"
                    value={formData.toPlace}
                    onChange={(e) => setFormData({ ...formData, toPlace: e.target.value })}
                  />
                  <ListInput
                    label="Conveyance Mode *"
                    type="select"
                    value={formData.conveyanceMode}
                    onChange={(e) => setFormData({ ...formData, conveyanceMode: e.target.value })}
                  >
                    <option value="">Select Mode</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Bus">Bus</option>
                  </ListInput>
                </div>
                <div className="form-row">
                  <ListInput
                    label="Distance (KM) *"
                    type="number"
                    placeholder="Enter Distance"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  />
                  <ListInput
                    label="Total Amount *"
                    type="number"
                    placeholder="Enter Amount"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                  />
                </div>
              </List>
              <div className="form-buttons">
                <Button fill type="submit" className="save-button" onClick={handleSaveExpense}>
                  Save
                </Button>
              </div>
            </form>
          </Block>
        </Page>
      </Popup>

      <Toolbar bottom className={DrugMasterDashboardCss.bottomToolBar}>
        <Link href="/forpharma">
          <Icon icon="home" size={32} /> {t('_HOME_')}
        </Link>
        <Link href="#" tabLinkActive>
          <Icon icon="dashboard" size={32} color="blue" />
          Expense Claim
        </Link>
      </Toolbar>
    </Page>
  );
};

export default ExpenseClaim;
