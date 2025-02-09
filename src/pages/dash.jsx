import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  f7,
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Tabs,
  Tab,
  Toolbar,
} from 'framework7-react';

import PageCss from '../css/forpharma-page.module.css';

const Dashboard = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  return (
    <Page className={PageCss.forpharmaPage} pageContent={false}>
      <Navbar className={PageCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={PageCss.pageTitle}>
          <p>
            <span>{t('_DAILY_PLANNER_')}</span>
            <br />
            {t('_CONNECT_DOCTORS_')}
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={PageCss.topToolBar}>
        <Link tabLink="#tab-1" tabLinkActive>
          {t('_FRESH_TASKS_')}
        </Link>
        <Link tabLink="#tab-2">{t('_COMPLETED_')}</Link>
        <Link tabLink="#tab-3">{t('_NO_SHOW_')}</Link>
      </Toolbar>
      <Toolbar bottom className={PageCss.bottomToolBar} outline={false}>
        <Link href="/forpharma" tabLinkActive>
          <Icon icon="home" size={22} color="blue" />
          {t('_HOME_')}
        </Link>
        <Link href="/forpharma">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="doctors">
          <Icon icon="doctors" size={22} color="white" />
          {t('_DOCTORS_')}
        </Link>
        <Link href="chemists">
          <Icon icon="chemists" size={22} />
          {t('_CHEMISTS_')}
        </Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="tab-1" className="page-content" tabActive>
          <Block>
            <p>Tab 1 content</p>
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
        <Tab id="tab-2" className="page-content">
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
        <Tab id="tab-3" className="page-content">
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

export default Dashboard;
