const botUserAgentsArray = [
  'googlebot',
  'AdsBot-Google',
  'bingbot',
  'linkedinbot',
  'mediapartners-google',
  'lighthouse',
  'insights',
];

export function botChecker(): boolean {
  const agent = navigator.userAgent;

  let isBotUserAgent = false;
  for (let j = 0; j < botUserAgentsArray.length; j++) {
    if (
      agent.toLowerCase().indexOf(botUserAgentsArray[j].toLowerCase()) !== -1
    ) {
      console.log(botUserAgentsArray[j]);

      isBotUserAgent = true;
      break;
    }
  }

  return isBotUserAgent;
}
