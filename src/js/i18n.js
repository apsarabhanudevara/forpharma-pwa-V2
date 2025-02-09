import i18n from 'i18next';
import react from 'react';
import { initReactI18next } from 'react-i18next';

//English Translation Namespaces
import commonJSON from '../locale/en/common.json';
import dashboardJSON from '../locale/en/dashboard-page.json';
import loginPageJSON from '../locale/en/login-page.json';
import dailyPlannerJSON from '../locale/en/daily-planner.json';
import captureOrderJSON from '../locale/en/create-order.json';
import repCheckinJSON from '../locale/en/rep-checkin.json';
import meetingTargetJSON from '../locale/en/meeting-target.json';
import coreSallesTargetJSON from '../locale/en/core-sales-targets.json';
import orderCaptureJSON from '../locale/en/oder-capture.json';
import coreSallesVisitsJSON from '../locale/en/core-sales-visits.json';
import chemistStockistJSON from '../locale/en/chemist-stockits.json';
import teamSummaryJSON from '../locale/en/team-summary.json';
import employeeMasterJSON from '../locale/en/employee-dashboard.json';
import dailyActivityJSON from '../locale/en/daily-activity.json';
import drugMasterJSON from '../locale/en/drug-master.json';
import retailChemistJSON from '../locale/en/retail-chemist.json';
// French Translation
import frJSON from '../locale/fr/fr.json';

const resources = {
  en: {
    common: { ...commonJSON },
    loginpage: { ...loginPageJSON },
    dashboard: { ...dashboardJSON },
    dailyplanner: { ...dailyPlannerJSON },
    captureorder: { ...captureOrderJSON },
    repchekin: { ...repCheckinJSON },
    meetingtarget: { ...meetingTargetJSON },
    coresalestargets: { ...coreSallesTargetJSON },
    ordercapture: { ...orderCaptureJSON },
    coresalesvisits: { ...coreSallesVisitsJSON },
    chemiststockist: { ...chemistStockistJSON },
    teamsummary: { ...teamSummaryJSON },
    employeemaster: { ...employeeMasterJSON },
    dailyActivity: { ...dailyActivityJSON },
    drugmaster: { ...drugMasterJSON },
    retailChemist: { ...retailChemistJSON },
  },
  fr: { ...frJSON },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
