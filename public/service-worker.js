import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { db } from '../src/models/db';
import { populate } from '../src/models/populate';
import { nanoid } from 'nanoid';

// IMPORTANT workbox data do not delete START
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
self.skipWaiting();
clientsClaim();
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
// IMPORTANT workbox data do not delete END

// const baseUrl = 'https://forsys.wenable.com/api';
// const baseUrl = 'http://localhost:3473';
const baseUrl = 'https://forpharma-admin-backend-476e0848cd4d.herokuapp.com';
// populate happens/iscalled only one time when the db is initially created
db.on('populate', populate);

const getDoctors = async () => {
  await db.doctors.toArray().then((data) => {});
};
getDoctors();
self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'FORPHARMA_SYNC_ORDERS') {
    const xids = e.data.xids;
    console.log('FORPHARMA_SYNC_ORDERS >> ', e);
    Promise.all(
      xids.map(async (xid, index) => {
        const order = await db.orders_offline.get({ xid });
        return {
          local_id__c: xid,
          doctor_uid__c: order.doctor_uid,
          chemist_uid__c: null,
          drug_uid__c: order.drug_uid,
          quantity__c: order.quantity,
          order_date__c: order.order_date,
          delivery_date__c: order.delivery_date,
          order_status__c: order.order_status,
          instructions__c: order.instructions,
        };
      })
    ).then(async (orderArray) => {
      try {
        const response = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(orderArray),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const ordersResponse = await response.json();
        // const responseArray = JSON.stringify(ordersResponse.clone());
        await db.orders.bulkAdd(ordersResponse);
        cleanOrdersOfflineDb(ordersResponse);
        return ordersResponse;
      } catch (error) {
        console.log('Create Orders Error: ', error.message);
      }
    });
  }
});

self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'FORPHARMA_SYNC_OFFLINE_DATA') {
    console.log('FORPHARMA_SYNC_OFFLINE_DATA >> ', e);
    syncOrders();
    syncRCPAS();
  }
});
const syncOrders = async () => {
  await db.orders_offline.toArray().then(async (offlineOrders) => {
    let ordersArray = [];
    if (offlineOrders && offlineOrders.length > 0) {
      await offlineOrders.map((order, index) => {
        ordersArray.push({
          uid__c: nanoid(),
          local_id__c: order.xid,
          doctor_uid__c: order.doctor_uid__c,
          chemist_uid__c: order.chemist_uid__c,
          drug_uid__c: order.drug_uid__c,
          quantity__c: order.quantity__c,
        });
      });
      try {
        const response = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(ordersArray),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const ordersResponse = await response.json();
        // const responseArray = JSON.stringify(ordersResponse.clone());
        await db.orders.bulkAdd(ordersResponse);
        cleanOrdersOfflineDb(ordersResponse);
        return ordersResponse;
      } catch (error) {
        console.log('Create Orders Error: ', error.message);
      }
    }
  });
};
const syncRCPAS = async () => {
  await db.rcpas_offline.toArray().then(async (offlineRCPAS) => {
    let rcpasArray = [];
    if (offlineRCPAS && offlineRCPAS.length > 0) {
      await offlineRCPAS.map((rcpa, index) => {
        rcpasArray.push({
          uid__c: nanoid(),
          id__c: rcpa.xid,
          chemist_uid__c: rcpa.chemist_uid__c,
          drug_uid__c: rcpa.drug_uid__c,
          quantity__c: rcpa.quantity__c,
          audit_date__c: rcpa.audit_date__c,
          comp_drug_uid__c: rcpa.comp_drug_uid__c,
          comp_quantity__c: rcpa.comp_quantity__c,
          remarks__c: rcpa.remarks__c,
        });
      });
      try {
        const response = await fetch(`${baseUrl}/rcpa`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(rcpasArray),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const rcpaResponse = await response.json();
        // const responseArray = JSON.stringify(ordersResponse.clone());
        await db.rcpas.bulkAdd(rcpaResponse);
        cleanRCPAOfflineDb(rcpaResponse);
        return rcpaResponse;
      } catch (error) {
        console.log('Create RCPA Error: ', error.message);
      }
    }
  });
};
const cleanOrdersOfflineDb = async (respArray) => {
  let keys = [];
  respArray.map(async (order, index) => keys.push(order.local_id__c));
  await db.orders_offline.bulkDelete(keys);
};

self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'SYNC_DOCTORS_NOW') {
    console.log('Doctors sync started');
    try {
      const response = await fetch(`${baseUrl}/doctors`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const doctorsResponse = await response.json();
      await db.doctors.clear().then(
        async () =>
          await db.doctors.bulkAdd(doctorsResponse).then(() => {
            self.clients.matchAll().then(function (clients) {
              if (clients && clients.length) {
                //Respond to last focused tab
                clients[0].postMessage({ type: 'DOCTORS_SYNC_COMPLETE' });
                console.log('Sent message to the client');
              }
            });
          })
      );
    } catch (error) {
      console.log("Fetch Doctor's error", error.message);
      self.clients.matchAll().then(function (clients) {
        if (clients && clients.length) {
          //Respond to last focused tab
          clients[0].postMessage({ type: 'DOCTORS_SYNC_COMPLETE' });
          console.log('Sent message to the client');
        }
      });
    }
  }
});

self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'SYNC_CHEMISTS_NOW') {
    console.log('Chemists sync started');
    try {
      const response = await fetch(`${baseUrl}/chemists`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const chemistsResponse = await response.json();
      await db.chemists.clear().then(
        async () =>
          await db.chemists.bulkAdd(chemistsResponse).then(() => {
            self.clients.matchAll().then(function (clients) {
              if (clients && clients.length) {
                //Respond to last focused tab
                clients[0].postMessage({ type: 'CHEMISTS_SYNC_COMPLETE' });
                console.log('Sent message to the client');
              }
            });
          })
      );
    } catch (error) {
      console.log("Fetch Chemist's error", error.message);
      self.clients.matchAll().then(function (clients) {
        if (clients && clients.length) {
          //Respond to last focused tab
          clients[0].postMessage({ type: 'CHEMISTS_SYNC_COMPLETE' });
          console.log('Sent message to the client');
        }
      });
    }
  }
});
// RCPA SYNC
self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'FORPHARMA_SYNC_RCPAS') {
    console.log('FORPHARMA_SYNC_RCPAS >> ', e);
    const xids = e.data.xids;
    Promise.all(
      xids.map(async (xid, index) => {
        const rcpa = await db.rcpas_offline.get({ xid });
        console.log('rcpa >> ', rcpa);
        return {
          id__c: xid,
          chemist_uid__c: rcpa.chemist_uid__c,
          drug_uid__c: rcpa.drug_uid__c,
          quantity__c: rcpa.quantity__c,
          audit_date__c: rcpa.audit_date__c,
          comp_drug_uid__c: rcpa.comp_drug_uid__c,
          comp_quantity__c: rcpa.comp_quantity__c,
          remarks__c: rcpa.remarks__c,
        };
      })
    ).then(async (rcpaArray) => {
      try {
        const response = await fetch(`${baseUrl}/rcpa`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(rcpaArray),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const rcpaResponse = await response.json();
        // const responseArray = JSON.stringify(ordersResponse.clone());
        console.log('rcpaResponse >> ', rcpaResponse);
        await db.rcpas.bulkAdd(rcpaResponse);
        cleanRCPAOfflineDb(rcpaResponse);
        return rcpaResponse;
      } catch (error) {
        console.log('Create Orders Error: ', error.message);
      }
    });
  }
});
const cleanRCPAOfflineDb = async (respArray) => {
  let keys = [];
  respArray.map(async (rcpa, index) => keys.push(rcpa.id__c));
  if (keys?.length > 0) {
    await db.rcpas_offline.bulkDelete(keys);
  }
};
self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'FORPHARMA_SYNC_OFFLINE_RCPAS') {
    console.log('FORPHARMA_SYNC_OFFLINE_RCPAS >> ', e);
  }
});
