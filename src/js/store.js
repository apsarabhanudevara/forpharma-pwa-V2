import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    userAuthenticated: false,
    userCheckedin: false,
    products: [
      {
        id: '1',
        title: 'Apple iPhone 8',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.',
      },
      {
        id: '2',
        title: 'Apple iPhone 8 Plus',
        description:
          'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!',
      },
      {
        id: '3',
        title: 'Apple iPhone X',
        description:
          'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.',
      },
    ],
    rcpaList: [
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Observation made during the audit',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Observation made during the audit',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Observation made during the audit',
      },
      {
        rcpaId: '0102',
        chemistStockistId: 'CH0120',
        drugName: 'Azithromycin',
        quantity: '289',
        competitordrugName: 'Azithral',
        compititirQuantity: '275',
        observeDate: '10/09/2024',
        remarks: 'Additional Comments',
      },
    ],
  },
  getters: {
    products({ state }) {
      return state.products;
    },
    getUserCheckedinState({ state }) {
      return state.userCheckedin;
    },
    getUserAuthenticatedState({ state }) {
      return state.userAuthenticated;
    },
    rcpaList({ state }) {
      return state.rcpaList;
    },
  },
  actions: {
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
    addRCPA({ state }, rcpa) {
      state.rcpaList = [...state.rcpaList, rcpa];
    },
    loginUser({ state }) {
      state.userAuthenticated = true;
    },
    logoutUser({ state }) {
      state.userAuthenticated = false;
    },
    checkinUser({ state }) {
      state.userCheckedin = true;
    },
    checkOutUser({ state }) {
      state.userCheckedin = false;
    },
  },
});
export default store;
