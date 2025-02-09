import {
  Badge,
  Button,
  Block,
  BlockTitle,
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  Page,
  PageContent,
  Navbar,
  NavLeft,
  NavRight,
  Tabs,
  Tab,
  NavTitle,
  ListItem,
  Sheet,
  f7,
  Toggle,
  Toolbar,
  Card,
  Accordion,
  AccordionContent,
} from 'framework7-react';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import RepAvatar from '../assets/images/rep-placeholder.jpg';
import { db } from '../models/db';
import CompareDrugsCss from '../css/compare-drugs.module.css';
import Azithral from '../assets/drugs/azithral.png';
import QrCode from '../assets/images/Qr-code.png';

const openCheckinDialog = () => {
  var checkin_dialog = f7.dialog
    .create({
      content: `<div style="text-align:center;">
                <img src="${QrCode}" alt="QR Code" style="width: 170px; height: 180px;" />
              </div>`,
      closeByBackdropClick: true, // Closes dialog when clicking outside
      buttons: [],
    })
    .open();
};

const IndividualDruginfo = (props) => {
  const { f7router, xid } = props;
  const { t } = useTranslation(['drugmaster']);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const drugs = useLiveQuery(async () => await db.drugs.get({ xid }));
  return (
    <Page className={CompareDrugsCss.forpharmaPage}>
      <Navbar className={CompareDrugsCss.pageNavBar} sliding={false}>
        <NavLeft>
          <Link onClick={() => f7router.back()}>
            <Icon material="chevron_left" color="white" size={36} />
          </Link>
        </NavLeft>
        <NavTitle className={CompareDrugsCss.pageTitle}>
          <p>
            {t('_DRUG_MASTER_')}
            <br />
            <span className={CompareDrugsCss.updatedAt}>Azithromycin</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link>
            <Icon material="search" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar top tabbar className={CompareDrugsCss.topToolBar}>
        <Link tabLink="#fresh-tasks" tabLinkActive>
          Product Details
        </Link>
        <Link tabLink="#completed">Uses and Efficacy</Link>
      </Toolbar>
      <Tabs animated>
        <Tab id="fresh-tasks" className="page-content" tabActive>
          <Card
            style={{
              height: '66vh',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Header section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
              <img src={Azithral} alt="Product Image" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                AZ001 <br /> Azithromycin
              </h2>
              <span onClick={() => openCheckinDialog()}>
                <img src={QrCode} alt="QR Code" style={{ width: '40px', height: '40px', marginLeft: '16px' }} />
              </span>
            </div>

            {/* Main content area */}
            <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 3fr', marginLeft: '73px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Composition:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>Azithromycin 500mg</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Storage:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>Store at room temperature</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Manufacturer:</span>r
              <span style={{ fontSize: '14px', color: '#333' }}>ABC Pharmaceuticals</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Price:</span>r
              <span style={{ fontSize: '14px', color: '#333' }}>$10.99</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Regulatory Approvals:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>FDA Approved</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Stock Levels:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>In Stock</span>
              <span style={{ fontSize: '14px', color: '#666' }}>Marketing Materials:</span>
              <a href="#" style={{ fontSize: '14px', color: '#337ab7' }}>
                View Materials
              </a>
              <span style={{ fontSize: '14px', color: '#666' }}>Drug Recommended By:</span>
              <a href="#" style={{ fontSize: '14px', color: '#337ab7' }}>
                Dr. Shridhar Reddy Peddi, Mor Chemist & Druggist
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#2186d4',
                  marginRight: '8px',
                  width: '34px',
                }}
              >
                <Icon material="bookmark_border_outlined" color="white" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#2186d4',
                  width: '34px',
                }}
              >
                <Icon material="share" color="white" />
              </div>
            </div>

            {/* Footer section */}
            <div style={{ padding: '16px', borderTop: '1px solid #ddd' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Product Brief</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Azithromycin is an antibiotic used to treat various bacterial infections. It works by stopping the
                growth of bacteria.
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Take Azithromycin exactly as directed by your doctor. Do not take more or less of it or take it more
                often than prescribed.
              </p>
            </div>

            {/* Action buttons */}
          </Card>
        </Tab>
        <Tab id="completed" className="page-content" tabActive>
          <p style={{ marginLeft: '19px', fontWeight: 'bold' }}>Uses and Efficacy</p>
          <List strong outlineIos dividersIos insetMd accordionList>
            <ListItem accordionItem title="Uses">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                    tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="Cautions">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem.
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="Prior to Use">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                    tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="Dosage">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                    tempor vel. Sed pharetra
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="Side Effects">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="Compatibility">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
            <ListItem accordionItem title="FAQ">
              <AccordionContent>
                <Block>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed
                    vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu
                    tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu
                    dignissim felis viverra blandit suscipit eget ipsum.
                  </p>
                </Block>
              </AccordionContent>
            </ListItem>
          </List>
        </Tab>
      </Tabs>
      <Toolbar bottom className={CompareDrugsCss.bottomToolBar} outline={false}>
        <Link href="/forpharma">
          <Icon icon="home" size={22} /> {t('_HOME_')}
        </Link>
        <Link href="/drug-dashboard">
          <Icon icon="dashboard" size={22} />
          {t('_DASHBOARD_')}
        </Link>
        <Link href="/drug-master">
          <Icon material="local_pharmacy_outlined" size={22} /> {t('_DRUG_MASTER_')}
        </Link>
        <Link href="/compare-drugs">
          <Icon material="compare_arrows_outlined" size={22} /> {t('_COMPARE_DRUGS_')}
        </Link>
        <Link href="/drug-category">
          <Icon material="category_outlined" size={24} />
          {t('_DRUGS_BY_CATEGORY_')}
        </Link>
      </Toolbar>
    </Page>
  );
};
export default IndividualDruginfo;
