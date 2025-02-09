import React, { useRef } from 'react';
import { Icon, Link, Navbar, NavLeft, NavRight, NavTitle, Page, List, ListInput, TextEditor } from 'framework7-react';
import { useTranslation } from 'react-i18next';

import PageCss from '../css/forpharma-page.module.css';

const Document = ({ f7router }) => {
  const { t } = useTranslation(['dailyplanner']);
  const editorRef = useRef(null); // Reference for the text editor

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
            <span>{t('_DOCUMENTS_')}</span>
          </p>
        </NavTitle>
        <NavRight>
          <Link onClick={() => f7router.back()}>
            <Icon material="send" color="white" size={36} />
          </Link>
        </NavRight>
      </Navbar>

      <div className="page-content">
        {/* Add icons in a container */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <Icon material="undo" color="blue" style={{ marginRight: '10px', cursor: 'pointer' }} />
          <Icon material="redo" color="blue" style={{ cursor: 'pointer' }} />
        </div>

        {/* Textarea Input */}
        <List noHairlinesBetween>
          <ListInput
            label="Title"
            type="textarea"
            placeholder=""
            style={{ marginBottom: '10px' }} // Spacing between inputs
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>

        {/* Note Input */}
        <List noHairlinesBetween>
          <ListInput
            label="Note"
            placeholder=""
            style={{ marginBottom: '10px' }} // Spacing between inputs
          />
        </List>

        {/* Framework7 Text Editor */}
        <TextEditor
          style={{ marginTop: '15vh' }}
          placeholder="Enter text..."
          buttons={[
            ['bold', 'italic', 'underline', 'strikeThrough'],
            ['orderedList', 'unorderedList'],
          ]}
        />
      </div>
    </Page>
  );
};

export default Document;
