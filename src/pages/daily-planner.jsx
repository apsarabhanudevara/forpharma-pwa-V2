import { Block, f7, Icon, Link, Page, PageContent, Panel, Tab, Tabs, Toolbar } from 'framework7-react';
import React, { useEffect, useState } from 'react';

import DailyPlannerCss from '../css/dailyplanner.module.css';

const DailyPlanner = (props) => {
  return (
    <Page id="daily-planner-page" pageContent={false}>
      <Toolbar id={DailyPlannerCss.dailyPlannerTabs} bottom tabbar inner={false}>
        <Link href="/forpharma">
          <Icon icon="dashboard" size={22} />
          Dashboard
        </Link>
        <Link href="doctors" tabLink routeTabId="doctors" panelClose="#doctor-info-panel">
          <Icon icon="doctors" size={22} />
          Doctors
        </Link>
        <Link href="chemists" tabLink routeTabId="chemists" panelClose="#doctor-info-panel">
          <Icon icon="chemists" size={22} />
          Chemists
        </Link>
      </Toolbar>
      <Panel
        id="doctor-info-panel"
        left
        cover
        backdrop={false}
        style={{ width: '100vw', height: 'calc(100vh - 116px)' }}
      >
        <Toolbar top tabbar>
          <Link>Hello</Link>
          <Link>Kilo</Link>
          <Link>Joker</Link>
        </Toolbar>
        <PageContent>
          <Block strongIos outlineIos>
            <p>This is page-nested Panel.</p>
            <p>
              <Link panelClose>Close me</Link>
            </p>
          </Block>
        </PageContent>
      </Panel>
      <Tabs id={DailyPlannerCss.dailyPlannerTabPages} routable animated>
        <Tab pageContent id="dashboard"></Tab>
        <Tab pageContent id="doctors"></Tab>
        <Tab pageContent id="chemists"></Tab>
      </Tabs>
    </Page>
  );
};
export default DailyPlanner;
