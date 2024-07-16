/* eslint-disable n/no-extraneous-import */
import {FaLinkedin, FaInstagram, FaGithub} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {decrypt, ImportKey} from '../utils/decryptUtils';
import {botChecker} from '../utils/antibot';

export interface social {
  name: string;
  logo: JSX.Element;
  url: string;
  innerText?: string;
}

const emailEncrypted = 'btv477QL/vApNzeHEVXDWbQ=';
function EmailTemplate(email: string): social {
  return {
    name: 'E-mail',
    logo: <MdEmail />,
    url: 'mailto://' + email,
    innerText: email,
  };
}

const arrayRRSS: Array<social> = [
  {
    name: 'Linkedin',
    logo: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/gabuscuv/',
    innerText: '/in/gabuscuv',
  },
  {
    name: 'Github',
    logo: <FaGithub />,
    url: 'https://github.com/gabuscuv/',
    innerText: 'gabuscuv',
  },
  {
    name: 'Instagram',
    logo: <FaInstagram />,
    url: 'https://www.instagram.com/gabuscuv/',
    innerText: 'gabuscuv',
  },
];

export function GetSocials(): Promise<Array<social>> {
  return new Promise(accept => {
    if (botChecker()) {
      accept(arrayRRSS);
    }
    ImportKey().then(e => {
      decrypt(e, emailEncrypted).then(email => {
        accept(arrayRRSS.toSpliced(0, 0, EmailTemplate(email)));
      });
    });
  });
}
