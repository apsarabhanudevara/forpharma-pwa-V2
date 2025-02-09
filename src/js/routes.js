import { f7 } from 'framework7-react';

import SplashPage from '../pages/splash.jsx';
import LoginPage from '../pages/login.jsx';
import RepDashboard from '../pages/rep-dashboard.jsx';
import RepCheckinPage from '../pages/rep-checkin.jsx';
import CreateOrder from '../pages/create-order.jsx';
import Dashboard from '../pages/dashboard.jsx';
import DoctorsMainPage from '../pages/doctors-main.jsx';
import DoctorsProfile from '../pages/doctors-profile.jsx';
import ChemistsMainPage from '../pages/chemists-main.jsx';
import ChemistsProfile from '../pages/chemists-profile.jsx';
import MeetingTarget from '../pages/meeting-target.jsx';
import CoreSalesTargets from '../pages/core-sales-targets.jsx';
import OrderCapture from '../pages/order-capture.jsx';
import CoreSalesVisits from '../pages/core-sales-visits.jsx';
import ChemistStockistDashboard from '../pages/chemist-stockist-dashboard.jsx';
import ChemistStockistList from '../pages/chemist-stockist-list.jsx';
import ChemistStockistListInfo from '../pages/chemist-stockist-list-info.jsx';
import DrugMasterInventory from '../pages/drug-master-inventory.jsx';
import OrderHistory from '../pages/order-history.jsx';
import TeamSummary from '../pages/team-summary.jsx';
import DoctorMasterDashboard from '../pages/doctor-master-dashboard.jsx';
import CoreSalesDashboard from '../pages/core-sales-target.jsx';
import EmployeeDashboard from '../pages/employee-dashboard.jsx';
import EmployeeDirectory from '../pages/employee-directory.jsx';
import EmployeeLocation from '../pages/employee-location.jsx';
import EmployeeDepartment from '../pages/employee-department.jsx';
import EmployeeProfile from '../pages/employee-profile.jsx';
import AttendanceRecord from '../pages/attendance-record.jsx';
import DailyActivity from '../pages/daily-activity.jsx';
import Calendar from '../pages/calendar.jsx';
import DrugMasterDashboard from '../pages/drug-master-dashboard.jsx';
import DrugMaster from '../pages/durg-master.jsx';
import CompareDrugs from '../pages/compare-drugs.jsx';
import DrugCategory from '../pages/drug-category.jsx';
import IndividualDruginfo from '../pages/individual-druginfo.jsx';
import TeamPerformanceOverview from '../pages/team-performance-overview.jsx';
import RetailChemistDashboard from '../pages/retail-chemist-dashboard.jsx';
import InputInventoryDashboard from '../pages/input-inventory-dashboard.jsx';
import RcpaList from '../pages/rcpa-list.jsx';
import RescheduleMeet from '../pages/reschedule-meet.jsx';
import RcpaPharma from '../pages/rcpa-pharma.jsx';
import RcpaDoctor from '../pages/rcpa-doctors.jsx';
import RcpaChemist from '../pages/rcpa-chemist.jsx';
import ChemistDrugInventory from '../pages/chemist-drug-inventory.jsx';
import RcpaEntry from '../pages/rcpa-entry.jsx';
import IndividualLaboratory from '../pages/individual.laboratory.jsx';
import ChurnAndRecurring from '../pages/churn-and-recurring.jsx';
import CompetitiveMatrics from '../pages/competitive-matrics.jsx';
import DoctorMaster from '../pages/doctor-master.jsx';
import DoctorMasterInfo from '../pages/doctor-master-info.jsx';
import DoctorLocation from '../pages/doctor-location.jsx';
import DoctorSpeciality from '../pages/doctor-speciality.jsx';
import StartMeeting from '../pages/start-meeting.jsx';
import ConnectDoctor from '../pages/connect-doctor.jsx';
import ConnectDoctorDrugmaster from '../pages/connect-doctor-durgmaster.jsx';
import ChemistOrderHistory from '../pages/chemist-order-history.jsx';
import StartMeetingChemist from '../pages/start-meeting-chemist.jsx';
import TransferDoctorMeeting from '../pages/transfer-doctor-meeting.jsx';
import TaggedChemist from '../pages/tagged-chemist.jsx';
import TourPlanner from '../pages/tour-planner.jsx';
import Document from '../pages/document.jsx';
import TaggedDoctors from '../pages/tagged-doctors.jsx';
import ExpenseClaim from '../pages/expense-claim.jsx';
var isUserAuthenticated = (f7) => {
  return f7.store.state.userAuthenticated ? true : false;
};
var routes = [
  {
    path: '/',
    component: SplashPage,
    options: {
      clearPreviousHistory: true,
    },
  },
  {
    path: '/forpharma',
    async({ resolve, reject }) {
      if (isUserAuthenticated(f7)) {
        resolve(
          {
            component: Dashboard,
          },
          {
            transition: 'f7-cover-v',
          }
        );
      } else {
        resolve(
          {
            component: LoginPage,
          },
          {
            transition: 'f7-cover-v',
            clearPreviousHistory: true,
          }
        );
      }
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/rep-dashboard',
    component: RepDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/rep-checkin',
    component: RepCheckinPage,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctors',
    component: DoctorsMainPage,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor/:uid__c/',
    component: DoctorsProfile,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemists',
    component: ChemistsMainPage,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist/:uid__c/',
    component: ChemistsProfile,
    transition: 'f7-cover-v',
  },
  {
    path: '/create-order',
    component: CreateOrder,
    transition: 'f7-cover-v',
  },
  {
    path: '/meeting-target',
    component: MeetingTarget,
    transition: 'f7-cover-v',
  },
  {
    path: '/sales-targets',
    component: CoreSalesTargets,
    transition: 'f7-cover-v',
  },
  {
    path: '/order-capture',
    component: OrderCapture,
    transition: 'f7-cover-v',
  },
  {
    path: '/sales-visits',
    component: CoreSalesVisits,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist-stockist',
    component: ChemistStockistDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist-stockist-list',
    component: ChemistStockistList,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist-info/:uid__c/',
    component: ChemistStockistListInfo,
    transition: 'f7-cover-v',
  },
  {
    path: '/drug-inventory',
    component: DrugMasterInventory,
    transition: 'f7-cover-v',
  },
  {
    path: '/order-history',
    component: OrderHistory,
    transition: 'f7-cover-v',
  },
  {
    path: '/team-summary',
    component: TeamSummary,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor-master-dashboard',
    component: DoctorMasterDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/core-sales-dashboard',
    component: CoreSalesDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/employee-dashboard',
    component: EmployeeDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/employee-directory',
    component: EmployeeDirectory,
    transition: 'f7-cover-v',
  },
  {
    path: '/employee-location',
    component: EmployeeLocation,
    transition: 'f7-cover-v',
  },
  {
    path: '/employee-department',
    component: EmployeeDepartment,
    transition: 'f7-cover-v',
  },
  {
    path: '/employee/:uid__c/',
    component: EmployeeProfile,
    transition: 'f7-cover-v',
  },
  {
    path: '/daily-activity',
    component: DailyActivity,
    transition: 'f7-cover-v',
  },
  {
    path: '/attendance-record',
    component: AttendanceRecord,
    transition: 'f7-cover-v',
  },
  {
    path: '/calendar',
    component: Calendar,
    transition: 'f7-cover-v',
  },
  {
    path: '/drug-dashboard',
    component: DrugMasterDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/drug-master',
    component: DrugMaster,
    transition: 'f7-cover-v',
  },
  {
    path: '/compare-drugs',
    component: CompareDrugs,
    transition: 'f7-cover-v',
  },
  {
    path: '/drug-category',
    component: DrugCategory,
    transition: 'f7-cover-v',
  },
  {
    path: '/drug/:xid/',
    component: IndividualDruginfo,
    transition: 'f7-cover-v',
  },
  {
    path: '/team-perf-overview',
    popup: {
      component: TeamPerformanceOverview,
    },
  },
  {
    path: '/churn-recurring',
    popup: {
      component: ChurnAndRecurring,
    },
  },
  {
    path: '/competitive-matrics',
    popup: {
      component: CompetitiveMatrics,
    },
  },
  {
    path: '/retailchemist-dashboard',
    component: RetailChemistDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/inputinventory-dashboard',
    component: InputInventoryDashboard,
    transition: 'f7-cover-v',
  },
  {
    path: '/tour-planner',
    component: TourPlanner,
    transition: 'f7-cover-v',
  },
  {
    path: '/expense-claim',
    component: ExpenseClaim,
    transition: 'f7-cover-v',
  },
  {
    path: '/rcpa-list',
    component: RcpaList,
    transition: 'f7-cover-v',
  },
  {
    path: '/rcpa-pharma',
    component: RcpaPharma,
    transition: 'f7-cover-v',
  },
  {
    path: '/rcpa-doctor',
    component: RcpaDoctor,
    transition: 'f7-cover-v',
  },
  {
    path: '/rcpa-chemist',
    component: RcpaChemist,
    transition: 'f7-cover-v',
  },
  {
    path: '/individual-laboratory',
    component: IndividualLaboratory,
    transition: 'f7-cover-v',
  },
  {
    path: '/rcpa-entry',
    component: RcpaEntry,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor-master',
    component: DoctorMaster,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor-master/:uid__c/',
    component: DoctorMasterInfo,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor-speciality',
    component: DoctorSpeciality,
    transition: 'f7-cover-v',
  },
  {
    path: '/doctor-location',
    component: DoctorLocation,
    transition: 'f7-cover-v',
  },
  {
    path: '/transfer-doctor-meeting',
    component: TransferDoctorMeeting,
    transition: 'f7-cover-v',
  },
  {
    path: '/connect-doctor-drugmaster',
    component: ConnectDoctorDrugmaster,
    transition: 'f7-cover-v',
  },
  {
    path: '/connect-doctor',
    component: ConnectDoctor,
    transition: 'f7-cover-v',
  },
  {
    path: '/start-meeting',
    component: StartMeeting,
    transition: 'f7-cover-v',
  },
  {
    path: '/start-meeting-chemist',
    component: StartMeetingChemist,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist-drug-inventory',
    component: ChemistDrugInventory,
    transition: 'f7-cover-v',
  },
  {
    path: '/chemist-order-history/:uid__c/',
    component: ChemistOrderHistory,
    transition: 'f7-cover-v',
  },
  {
    path: '/reschedule-meet',
    component: RescheduleMeet,
    transition: 'f7-cover-v',
  },
  {
    path: '/document',
    component: Document,
    transition: 'f7-cover-v',
  },
  {
    path: '/tagged-doctors',
    component: TaggedDoctors,
    transition: 'f7-cover-v',
  },
  {
    path: '/tagged-chemist',
    component: TaggedChemist,
    transition: 'f7-cover-v',
  },

  // {
  //   path: '/daily-planner/',
  //   tabs: daily_planner_tabs,
  //   async({ resolve, reject }) {
  //     if (isUserAuthenticated(f7)) {
  //       resolve(
  //         {
  //           component: DailyPlanner,
  //         },
  //         {
  //           transition: 'f7-cover-v',
  //         }
  //       );
  //     } else {
  //       reject();
  //     }
  //   },
  // },
];

export default routes;
