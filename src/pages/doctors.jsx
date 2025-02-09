import { useLiveQuery } from 'dexie-react-hooks';
import {
  Block,
  f7,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  PageContent,
  Panel,
  Tab,
  Tabs,
  Toolbar,
} from 'framework7-react';
import React, { useEffect } from 'react';

import RepAvatar from '../assets/images/rep-placeholder.jpg';
import DoctorsCss from '../css/doctors.module.css';
import { db } from '../models/db';

const createinitials = (f) => {
  const name = f;
  const chopped = name.split(' ');
  const initialOne = Array.from(chopped[0])[0].toUpperCase();
  const initialTwo = chopped[1] ? Array.from(chopped[1])[0].toUpperCase() : '';
  return initialOne + initialTwo;
};

const Doctors = (props) => {
  {
    /** TODO: implement infinite scroll */
  }
  const doctors = useLiveQuery(() => db.doctors.toArray());
  return (
    <Page id={DoctorsCss.doctorsPageContent}>
      <Navbar sliding={false}>
        <NavLeft>
          <Link iconOnly iconF7="chevron_left" color="white" onClick={() => f7router.back()} />
        </NavLeft>
        <NavTitle>Connect Doctors</NavTitle>
        <NavRight>
          <Link iconOnly iconF7="search" color="white" />
        </NavRight>
      </Navbar>
      <Toolbar top tabbar>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Fresh Tasks
        </Link>
        <Link tabLink="#completed-tasks">Completed</Link>
        <Link tabLink="#no-show">No-Show</Link>
      </Toolbar>
      <Toolbar id="daily-planner-tabs" bottom tabbar inner={false}>
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
      <Tabs id={DoctorsCss.connectDoctorsTabs} animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <List mediaList>
            <ul>
              {doctors &&
                doctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    mediaItem
                    chevronCenter
                    link="#"
                    panelOpen="#doctor-info-panel"
                    title={doctor.title + doctor.fullname}
                    subtitle={doctor.designation}
                    text={doctor.timing}
                    style={{ backgroundColor: '#e9f3fb', borderRadius: '4px', margin: '8px 16px' }}
                  >
                    {(index + 1) % 3 === 0 ? (
                      <div
                        slot="media"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: '#134e7c',
                          color: 'white',
                          fontSize: '30px',
                          width: '65px',
                          height: '65px',
                        }}
                        width={65}
                      >
                        {createinitials(doctor.fullname)}
                      </div>
                    ) : (
                      <img slot="media" style={{ borderRadius: '50%' }} width={65} src={RepAvatar} />
                    )}
                  </ListItem>
                ))}
            </ul>
          </List>
        </Tab>
        <Tab id="completed-tasks" className="page-content">
          <Block>
            <p>Tab 2 content</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
              voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad
              laboriosam accusamus?
            </p>
            <p>
              Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque
              exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui
              dignissimos voluptas! Aliquam rerum consequuntur deleniti.
            </p>
            <p>
              Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi
              consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores?
              Natus, perferendis.
            </p>
            <p>
              Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident
              consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis
              similique iusto, repellat sed quisquam!
            </p>
            <p>
              Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim
              voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit!
              Adipisci!
            </p>
            <p>
              Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem
              autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum
              cumque impedit.
            </p>
            <p>
              Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero
              consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque.
              Iure fugit, minima facere.
            </p>
          </Block>
        </Tab>
        <Tab id="no-show" className="page-content">
          <Block>
            <p>Tab 3 content</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium
              voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad
              laboriosam accusamus?
            </p>
            <p>
              Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque
              exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui
              dignissimos voluptas! Aliquam rerum consequuntur deleniti.
            </p>
            <p>
              Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi
              consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores?
              Natus, perferendis.
            </p>
            <p>
              Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident
              consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis
              similique iusto, repellat sed quisquam!
            </p>
            <p>
              Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim
              voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit!
              Adipisci!
            </p>
            <p>
              Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem
              autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum
              cumque impedit.
            </p>
            <p>
              Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero
              consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque.
              Iure fugit, minima facere.
            </p>
          </Block>
        </Tab>
      </Tabs>
    </Page>
  );
};
export default Doctors;
