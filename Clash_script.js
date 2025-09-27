// Define main function (script entry)
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

const LABELS = {
  chatgpt: "\uD83D\uDCACChatGPT",
  category: "\u5206\u985E\u9078\u64C7",
  other: "\uD83C\uDF10\u5176\u4ED6",
  school: "\uD83C\uDFEBSchool",
  discord: "\uD83C\uDFAEDiscord",
  china: "\u4E2D\u570B\u7DB2\u7AD9",
  apple: "\uD83C\uDF4EApple",
  google: "Google",
  onedrive: "OneDrive",
  globalSelection: "\uD83C\uDF10 \u5168\u7403\u9009\u62E9"
};

const { chatgpt, category, other, school, discord, china, apple, google, onedrive, globalSelection } = LABELS;

const rules = [
  // Google
  `DOMAIN-KEYWORD,google,${google}`,
  `DOMAIN-SUFFIX,youtube.com,${google}`,
  `DOMAIN-SUFFIX,google.com,${google}`,
  `DOMAIN-SUFFIX,gstatic.com,${google}`,
  `DOMAIN-SUFFIX,ytimg.com,${google}`,
  `DOMAIN-SUFFIX,ggpht.com,${google}`,
  // OneDrive
  `PROCESS-NAME,OneDrive,${onedrive}`,
  `PROCESS-NAME,OneDriveUpdater,${onedrive}`,
  `IN-USER,OneDrive*,${onedrive}`,
  `IN-USER,OneDriveiOSApp*,${onedrive}`,
  `DOMAIN-KEYWORD,1drv,${onedrive}`,
  `DOMAIN-KEYWORD,onedrive,${onedrive}`,
  `DOMAIN-KEYWORD,skydrive,${onedrive}`,
  `DOMAIN-SUFFIX,livefilestore.com,${onedrive}`,
  `DOMAIN-SUFFIX,oneclient.sfx.ms,${onedrive}`,
  `DOMAIN-SUFFIX,onedrive.com,${onedrive}`,
  `DOMAIN-SUFFIX,onedrive.live.com,${onedrive}`,
  `DOMAIN-SUFFIX,photos.live.com,${onedrive}`,
  `DOMAIN-SUFFIX,sharepoint.com,${onedrive}`,
  `DOMAIN-SUFFIX,sharepointonline.com,${onedrive}`,
  `DOMAIN-SUFFIX,skydrive.wns.windows.com,${onedrive}`,
  `DOMAIN-SUFFIX,spoprod-a.akamaihd.net,${onedrive}`,
  `DOMAIN-SUFFIX,storage.live.com,${onedrive}`,
  `DOMAIN-SUFFIX,storage.msn.com,${onedrive}`,
  `DOMAIN-SUFFIX,aria.microsoft.com,${onedrive}`,
  `DOMAIN-SUFFIX,office.com,${onedrive}`,
  `DOMAIN-SUFFIX,office.net,${onedrive}`,
  `DOMAIN-SUFFIX,office365.com,${onedrive}`,
  // Apple
  `DOMAIN-SUFFIX,aaplimg.com,${apple}`,
  `DOMAIN-SUFFIX,akadns.net,${apple}`,
  `DOMAIN-SUFFIX,apple-cloudkit.com,${apple}`,
  `DOMAIN-SUFFIX,apple-dns.net,${apple}`,
  `DOMAIN-SUFFIX,apple-mapkit.com,${apple}`,
  `DOMAIN-SUFFIX,apple.co,${apple}`,
  `DOMAIN-SUFFIX,apple.com,${apple}`,
  `DOMAIN-SUFFIX,apple.com.cn,${apple}`,
  `DOMAIN-SUFFIX,apple.news,${apple}`,
  `DOMAIN-SUFFIX,appstore.com,${apple}`,
  `DOMAIN-SUFFIX,cdn-apple.com,${apple}`,
  `DOMAIN-SUFFIX,icloud-content.com,${apple}`,
  `DOMAIN-SUFFIX,icloud.com,${apple}`,
  `DOMAIN-SUFFIX,icloud.com.cn,${apple}`,
  `DOMAIN-SUFFIX,itunes.com,${apple}`,
  `DOMAIN-SUFFIX,me.com,${apple}`,
  `DOMAIN-SUFFIX,mzstatic.com,${apple}`,
  // ChatGPT
  `DOMAIN-KEYWORD,openai,${chatgpt}`,
  `DOMAIN-SUFFIX,chatgpt.com,${chatgpt}`,
  `DOMAIN-SUFFIX,chat.openai.com,${chatgpt}`,
  `DOMAIN-SUFFIX,auth0.openai.com,${chatgpt}`,
  `DOMAIN-SUFFIX,cdn.openai.com,${chatgpt}`,
  `DOMAIN-SUFFIX,openai.com,${chatgpt}`,
  // School
  `DOMAIN-KEYWORD,soul2,${school}`,
  `DOMAIN-KEYWORD,hkuspace,${school}`,
  `DOMAIN-SUFFIX,teams.microsoft.com,${school}`,
  `DOMAIN-SUFFIX,outlook.office.com,${school}`,
  `DOMAIN-SUFFIX,m365.cloud.microsoft,${school}`,
  `DOMAIN-SUFFIX,hkuspace365-my.sharepoint.com,${school}`,
  `DOMAIN-SUFFIX,learner.hkuspace.hku.hk,${school}`,
  `DOMAIN-SUFFIX,soul2.hkuspace.hku.hk,${school}`,
  // Discord
  `DOMAIN-SUFFIX,airhorn.solutions,${discord}`,
  `DOMAIN-SUFFIX,airhornbot.com,${discord}`,
  `DOMAIN-SUFFIX,bigbeans.solutions,${discord}`,
  `DOMAIN-SUFFIX,dis.gd,${discord}`,
  `DOMAIN-SUFFIX,discord-activities.com,${discord}`,
  `DOMAIN-SUFFIX,discord.co,${discord}`,
  `DOMAIN-SUFFIX,discord.com,${discord}`,
  `DOMAIN-SUFFIX,discord.design,${discord}`,
  `DOMAIN-SUFFIX,discord.dev,${discord}`,
  `DOMAIN-SUFFIX,discord.gg,${discord}`,
  `DOMAIN-SUFFIX,discord.gift,${discord}`,
  `DOMAIN-SUFFIX,discord.gifts,${discord}`,
  `DOMAIN-SUFFIX,discord.media,${discord}`,
  `DOMAIN-SUFFIX,discord.new,${discord}`,
  `DOMAIN-SUFFIX,discord.store,${discord}`,
  `DOMAIN-SUFFIX,discord.tools,${discord}`,
  `DOMAIN-SUFFIX,discordactivities.com,${discord}`,
  `DOMAIN-SUFFIX,discordapp.com,${discord}`,
  `DOMAIN-SUFFIX,discordapp.io,${discord}`,
  `DOMAIN-SUFFIX,discordapp.net,${discord}`,
  `DOMAIN-SUFFIX,discordapp.page.link,${discord}`,
  `DOMAIN-SUFFIX,discordcdn.com,${discord}`,
  `DOMAIN-SUFFIX,discordmerch.com,${discord}`,
  `DOMAIN-SUFFIX,discordpartygames.com,${discord}`,
  `DOMAIN-SUFFIX,discordsays.com,${discord}`,
  `DOMAIN-SUFFIX,discordstatus.com,${discord}`,
  `DOMAIN-SUFFIX,hammerandchisel.ssl.zendesk.com,${discord}`,
  `DOMAIN-SUFFIX,watchanimeattheoffice.com,${discord}`,
  // China websites
  `DOMAIN-SUFFIX,taobao.com,${china}`,
  `DOMAIN-SUFFIX,alibaba.com,${china}`,
  `DOMAIN-SUFFIX,aliyuncs.com,${china}`,
  `DOMAIN-SUFFIX,dingtalk.com,${china}`,
  `DOMAIN-SUFFIX,alicdn.com,${china}`,
  `DOMAIN-SUFFIX,wechat.com,${china}`,
  `DOMAIN-SUFFIX,taobao.com,${china}`,
  `DOMAIN-SUFFIX,wx.qlogo.cn,${china}`,
  `DOMAIN-SUFFIX,qpic.cn,${china}`,
  // Other
  'DOMAIN,global.tagonline.asia,DIRECT',
  `GEOIP,CN,${other}`,
  `MATCH,${other}`
];

function extractProxyNames(config) {
  const groups = config && config["proxy-groups"];
  if (Array.isArray(groups)) {
    const preferredGroup = groups.find(
      (group) =>
        group &&
        group.name === globalSelection &&
        Array.isArray(group.proxies) &&
        group.proxies.length > 0
    );
    if (preferredGroup) {
      return [...preferredGroup.proxies];
    }
    const fallbackGroup = groups.find(
      (group) => group && Array.isArray(group.proxies) && group.proxies.length > 0
    );
    if (fallbackGroup) {
      return [...fallbackGroup.proxies];
    }
  }

  if (config && Array.isArray(config.proxies)) {
    return config.proxies
      .map((proxy) => proxy && proxy.name)
      .filter((name) => typeof name === 'string' && name.trim().length > 0);
  }

  return [];
}

function pickRandomProxy(names) {
  const available = Array.isArray(names)
    ? names.filter((name) => typeof name === 'string' && name.trim().length > 0)
    : [];
  if (!available.length) {
    return 'DIRECT';
  }
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function createProxyGroups(proxyNames) {
  const uniqueNames = Array.from(
    new Set(
      Array.isArray(proxyNames)
        ? proxyNames.filter((name) => typeof name === 'string' && name.trim().length > 0)
        : []
    )
  );
  const selectProxies = uniqueNames.length ? uniqueNames : ['DIRECT'];
  const randomProxy = pickRandomProxy(uniqueNames);
  const googleProxies = ['DIRECT', chatgpt, category, ...selectProxies];
  if (randomProxy && !googleProxies.includes(randomProxy)) {
    googleProxies.push(randomProxy);
  }

  return [
    {
      ...groupBaseOption,
      name: chatgpt,
      type: 'select',
      'include-all': false,
      proxies: [...selectProxies]
    },
    {
      ...groupBaseOption,
      name: google,
      type: 'select',
      'include-all': false,
      proxies: googleProxies
    },
    {
      ...groupBaseOption,
      name: category,
      type: 'select',
      'include-all': false,
      proxies: ['DIRECT', ...uniqueNames]
    },
    {
      ...groupBaseOption,
      name: other,
      type: 'select',
      'include-all': false,
      proxies: ['DIRECT', ...uniqueNames]
    },
    {
      ...groupBaseOption,
      name: school,
      type: 'select',
      proxies: ['DIRECT', category]
    },
    {
      ...groupBaseOption,
      name: discord,
      type: 'select',
      proxies: ['DIRECT', category]
    },
    {
      ...groupBaseOption,
      name: china,
      type: 'select',
      proxies: ['DIRECT', category]
    },
    {
      ...groupBaseOption,
      name: apple,
      type: 'select',
      proxies: ['DIRECT', category]
    },
    {
      ...groupBaseOption,
      name: onedrive,
      type: 'select',
      proxies: ['DIRECT', category]
    }
  ];
}

function main(config, profileName) {
  const proxies = extractProxyNames(config);
  const proxyGroups = createProxyGroups(proxies);

  config["rules"] = rules;
  config["proxy-groups"] = proxyGroups;
  return config;
}
