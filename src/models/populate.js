import { db } from './db';

// const baseUrl = 'https://forsys.wenable.com/api';
// const baseUrl = 'http://localhost:3473';
const baseUrl = 'https://forpharma-admin-backend-476e0848cd4d.herokuapp.com';

export async function populate() {
  const fetchChemists = await fetch(`${baseUrl}/chemists`).then((chemists) => chemists.json());
  const fetchDoctors = await fetch(`${baseUrl}/doctors`).then((doctors) => doctors.json());
  const fetchDrugs = await fetch(`${baseUrl}/drugs`).then((drugs) => drugs.json());
  const fetchOrders = await fetch(`${baseUrl}/orders`).then((orders) => orders.json());
  const fetchRcpas = await fetch(`${baseUrl}/rcpa`).then((rcpas) => rcpas.json());
  await Promise.all([fetchChemists, fetchDoctors, fetchDrugs, fetchOrders, fetchRcpas]).then(
    async ([chemists, doctors, drugs, orders, rcpas]) => {
      await db.chemists.bulkAdd(chemists);
      await db.doctors.bulkAdd(doctors);
      await db.drugs.bulkAdd(drugs);
      await db.orders.bulkAdd(orders);
      await db.rcpas.bulkAdd(rcpas);
    }
  );
}
