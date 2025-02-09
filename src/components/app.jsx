import { App, f7, f7ready, Icon, Toolbar, View, Views } from 'framework7-react';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../js/routes';
import store from '../js/store';

const ForPharmaPWA = () => {
  const networkOfflineStatusNotification = useRef(null);
  const { t, i18n } = useTranslation(['common']);

  // Framework7 Parameters
  const f7params = {
    name: 'ForPharma', // App name
    theme: 'md', // Automatic theme detection
    colors: {
      primary: '#0b2d47',
    },

    // App store
    store: store,
    // App routes
    routes: routes,

    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === 'production'
        ? {
            path: '/service-worker.js',
          }
        : {},
  };

  f7ready((f7) => {
    // Call F7 APIs here
    if (!f7.online) {
      showConnectionNotification(f7);
    }
  });

  const showConnectionNotification = (f7) => {
    if (networkOfflineStatusNotification.current == null) {
      networkOfflineStatusNotification.current = f7.notification.create({
        icon: '<i class="material-icons">wifi_off</i>',
        title: t('_DEVICE_OFFLNE_', { ns: 'common' }),
        subtitle: t('_DEVICE_OFFLINE_TITLE_', { ns: 'common' }),
        text: t('_DEVICE_OFFLINE_SUBTITLE_', { ns: 'common' }),
        closeOnClick: true,
        closeButton: true,
        swipeToClose: true,
        on: {
          closed() {
            networkOfflineStatusNotification.current.close();
            networkOfflineStatusNotification.current.destroy();
            networkOfflineStatusNotification.current = null;
          },
        },
      });
    }
    if (!f7.online && networkOfflineStatusNotification.current != null) {
      networkOfflineStatusNotification.current.open();
    }
  };

  return (
    <App
      {...f7params}
      on={{
        init: () => {
          f7.dirtyInstance = false;
        },
        connection: (c) => {
          let isDeviceConnected = c;
          if (isDeviceConnected) {
            if (f7.serviceWorker.container.controller) {
              f7.serviceWorker.container.controller.postMessage({
                type: 'FORPHARMA_SYNC_OFFLINE_DATA',
              });
              // f7.serviceWorker.container.controller.postMessage({
              //   type: 'FORPHARMA_SYNC_OFFLINE_RCPAS',
              // });
            }
            if (networkOfflineStatusNotification.current != null) {
              networkOfflineStatusNotification.current.close();
              networkOfflineStatusNotification.current.destroy();
              networkOfflineStatusNotification.current = null;
            }
          } else {
            showConnectionNotification(f7);
          }
        },
        serviceWorkerRegisterSuccess: (registrstion) => {
          const regn = registrstion;
          f7.on('routeChange', () => {
            regn.update();
          });
          regn.addEventListener('updatefound', () => {
            const installingSW = regn.installing;
            installingSW.onstatechange = () => {
              if ((installingSW.state === 'installed' || installingSW.state === 'activated') && f7.dirtyInstance) {
                f7.dialog
                  .create({
                    title: t('_SERVICE_WORKER_DIALOG_TITLE_', { ns: 'common' }),
                    text: t('_SERVICE_WORKER_DIALOG_TEXT_', { ns: 'common' }),
                    buttons: [
                      {
                        text: t('_UPDATE_', { ns: 'common' }),
                        onClick: (dialog, e) => {
                          window.location.reload();
                        },
                      },
                      {
                        text: t('_CLOSE_', { ns: 'common' }),
                        onClick: (dialog, e) => {
                          dialog.close();
                        },
                      },
                    ],
                  })
                  .open();
              }
            };
          });
        },
      }}
    >
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/"></View>
    </App>
  );
};

export default ForPharmaPWA;
