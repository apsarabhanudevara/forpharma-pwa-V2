import {
  Block,
  BlockTitle,
  f7,
  Icon,
  Link,
  List,
  ListButton,
  ListInput,
  ListItem,
  Page,
  Toggle,
} from 'framework7-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ForPharmaLogo from '../assets/images/forpharma.svg';
import LoginCss from '../css/login.module.css';

const LoginPage = ({ f7router }) => {
  const { t, i18n } = useTranslation(['common', 'loginpage']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const login = () => {
    // if (username === 'medicalrep@forsysinc.com' && password === 'supersecret123') {
    if (username === 'forsys' && password === 'forsys') {
      f7.store.dispatch('loginUser');
      f7router.navigate('/forpharma');
    } else {
      f7.dialog.alert('Invalid username or password');
    }
  };

  return (
    <Page id={LoginCss.loginScreen}>
      <Block id={LoginCss.loginLogo}>
        <img src={ForPharmaLogo} alt="ForPharma Logo" />
      </Block>
      <Block strong id={LoginCss.loginForm}>
        <BlockTitle color="black">{t('_LOGIN_FORM_TITLE_', { ns: 'loginpage' })}</BlockTitle>
        <List id={LoginCss.loginList} form>
          <ListInput
            outline
            label={t('_EMAIL_', { ns: 'common' })}
            floatingLabel
            type="text"
            placeholder={t('_TYPE_EMAIL_', { ns: 'loginpage' })}
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            clearButton
          >
            <Icon f7="envelope" color="blue" slot="media" />
          </ListInput>
          <ListInput
            outline
            label={t('_PASSWORD_', { ns: 'common' })}
            floatingLabel
            type="password"
            placeholder={t('_TYPE_PASSWORD_', { ns: 'loginpage' })}
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            clearButton
          >
            <Icon material="key" color="blue" slot="media" />
          </ListInput>
          <ListItem>
            <span>
              <Toggle color="green" checked={remember} onToggleChange={() => setRemember(!remember)} />{' '}
              {t('_REMEMBER_PASSWORD_', { ns: 'loginpage' })}
            </span>
            <Link>{t('_FORGOT_PASSWORD_', { ns: 'loginpage' })}</Link>
          </ListItem>
          <ListButton
            id={!username || !password ? LoginCss.signInBtnDisabled : LoginCss.signInBtn}
            title={t('_SIGN_IN_', { ns: 'loginpage' })}
            onClick={login}
          />
          <ListItem id={LoginCss.btnDivider}>
            <span>{t('_OR_', { ns: 'common' })}</span>
          </ListItem>
          <ListButton id={LoginCss.googleBtn}>
            <Icon icon="google"></Icon> {t('_CONTINUE_WITH_GOOGLE_', { ns: 'loginpage' })}
          </ListButton>
          <ListItem id={LoginCss.copyRight}>
            <span>&copy; {year} Forsys Inc.</span>
          </ListItem>
        </List>
      </Block>
    </Page>
  );
};

export default LoginPage;
