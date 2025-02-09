import Dexie from 'dexie';
import { populate } from './populate';

export const db = new Dexie('forpharmadb');
// populate happens/iscalled only one time when the db is initially created
db.on('populate', populate);
db.version(1).stores({
  chemists: '++xid, uid__c, name__c, locality__c, city__c, state__c, pin_code__c',
  doctors: '++xid, uid__c, full_name__c, locality__c, city__c, state__c, pin_code__c',
  drugs: '++xid, uid__c, name__c, manufacturer__c, composition__c',
  orders: '++xid, uid__c, order_status__c, order_date__c',
  orders_offline: '++xid, uid__c, order_status__c, order_date__c',
  rcpas: '++xid, uid__c',
  rcpas_offline: '++xid, uid__c',
});
