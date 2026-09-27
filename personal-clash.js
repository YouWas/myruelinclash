// Clash Verge Rev: paste into a local/global JavaScript override.
// Uses the current subscription's nodes and providers; no private URL is embedded.
// Replaces routing rules. Unmatched traffic is DIRECT.
const PERSONAL_RULES = [
  "DOMAIN-SUFFIX,byteoversea.com,muti_media",
  "DOMAIN-SUFFIX,ibytedtos.com,muti_media",
  "DOMAIN-SUFFIX,ipstatp.com,muti_media",
  "DOMAIN-SUFFIX,muscdn.com,muti_media",
  "DOMAIN-SUFFIX,musical.ly,muti_media",
  "DOMAIN-SUFFIX,tik-tokapi.com,muti_media",
  "DOMAIN-SUFFIX,tiktok.com,muti_media",
  "DOMAIN-SUFFIX,tiktokcdn.com,muti_media",
  "DOMAIN-SUFFIX,tiktokv.com,muti_media",
  "DOMAIN,cdn.registerdisney.go.com,muti_media",
  "DOMAIN-SUFFIX,adobedtm.com,muti_media",
  "DOMAIN-SUFFIX,bam.nr-data.net,muti_media",
  "DOMAIN-SUFFIX,bamgrid.com,muti_media",
  "DOMAIN-SUFFIX,braze.com,muti_media",
  "DOMAIN-SUFFIX,cdn.optimizely.com,muti_media",
  "DOMAIN-SUFFIX,cdn.registerdisney.go.com,muti_media",
  "DOMAIN-SUFFIX,cws.conviva.com,muti_media",
  "DOMAIN-SUFFIX,d9.flashtalking.com,muti_media",
  "DOMAIN-SUFFIX,disney-plus.net,muti_media",
  "DOMAIN-SUFFIX,disney-portal.my.onetrust.com,muti_media",
  "DOMAIN-SUFFIX,disney.demdex.net,muti_media",
  "DOMAIN-SUFFIX,disney.my.sentry.io,muti_media",
  "DOMAIN-SUFFIX,disneyplus.bn5x.net,muti_media",
  "DOMAIN-SUFFIX,disneyplus.com,muti_media",
  "DOMAIN-SUFFIX,disneyplus.com.ssl.sc.omtrdc.net,muti_media",
  "DOMAIN-SUFFIX,disneystreaming.com,muti_media",
  "DOMAIN-SUFFIX,dssott.com,muti_media",
  "DOMAIN-SUFFIX,execute-api.us-east-1.amazonaws.com,muti_media",
  "DOMAIN-SUFFIX,js-agent.newrelic.com,muti_media",
  "DOMAIN-KEYWORD,apiproxy-device-prod-nlb-,muti_media",
  "DOMAIN-KEYWORD,dualstack.apiproxy-,muti_media",
  "DOMAIN-KEYWORD,netflixdnstest,muti_media",
  "DOMAIN,netflix.com.edgesuite.net,muti_media",
  "DOMAIN-SUFFIX,fast.com,muti_media",
  "DOMAIN-SUFFIX,netflix.com,muti_media",
  "DOMAIN-SUFFIX,netflix.net,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest0.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest1.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest2.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest3.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest4.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest5.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest6.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest7.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest8.com,muti_media",
  "DOMAIN-SUFFIX,netflixdnstest9.com,muti_media",
  "DOMAIN-SUFFIX,nflxext.com,muti_media",
  "DOMAIN-SUFFIX,nflximg.com,muti_media",
  "DOMAIN-SUFFIX,nflximg.net,muti_media",
  "DOMAIN-SUFFIX,nflxso.net,muti_media",
  "DOMAIN-SUFFIX,nflxvideo.net,muti_media",
  "DOMAIN,music.youtube.com,muti_media",
  "DOMAIN-KEYWORD,youtube,Google",
  "DOMAIN,youtubei.googleapis.com,Google",
  "DOMAIN,yt3.ggpht.com,Google",
  "DOMAIN-SUFFIX,googlevideo.com,Google",
  "DOMAIN-SUFFIX,gvt2.com,Google",
  "DOMAIN-SUFFIX,withyoutube.com,Google",
  "DOMAIN-SUFFIX,youtu.be,Google",
  "DOMAIN-SUFFIX,youtube-nocookie.com,Google",
  "DOMAIN-SUFFIX,youtube.com,Google",
  "DOMAIN-SUFFIX,youtubeeducation.com,Google",
  "DOMAIN-SUFFIX,youtubegaming.com,Google",
  "DOMAIN-SUFFIX,youtubekids.com,Google",
  "DOMAIN-SUFFIX,yt.be,Google",
  "DOMAIN-SUFFIX,ytimg.com,Google",
  "DOMAIN-KEYWORD,google,Google",
  "DOMAIN-SUFFIX,google.com,Google",
  "DOMAIN-SUFFIX,gstatic.com,Google",
  "DOMAIN-SUFFIX,ggpht.com,Google",
  "DOMAIN-KEYWORD,openai,💬ChatGPT",
  "DOMAIN-SUFFIX,auth0.com,💬ChatGPT",
  "DOMAIN-SUFFIX,challenges.cloudflare.com,💬ChatGPT",
  "DOMAIN-SUFFIX,chatgpt.com,💬ChatGPT",
  "DOMAIN-SUFFIX,client-api.arkoselabs.com,💬ChatGPT",
  "DOMAIN-SUFFIX,events.statsigapi.net,💬ChatGPT",
  "DOMAIN-SUFFIX,featuregates.org,💬ChatGPT",
  "DOMAIN-SUFFIX,identrust.com,💬ChatGPT",
  "DOMAIN-SUFFIX,intercom.io,💬ChatGPT",
  "DOMAIN-SUFFIX,intercomcdn.com,💬ChatGPT",
  "DOMAIN-SUFFIX,oaistatic.com,💬ChatGPT",
  "DOMAIN-SUFFIX,oaiusercontent.com,💬ChatGPT",
  "DOMAIN-SUFFIX,openai.com,💬ChatGPT",
  "DOMAIN-SUFFIX,openaiapi-site.azureedge.net,💬ChatGPT",
  "DOMAIN-SUFFIX,sentry.io,💬ChatGPT",
  "DOMAIN-SUFFIX,stripe.com,💬ChatGPT",
  "MATCH,DIRECT"
];

function main(config) {
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    throw new Error('Expected a Clash configuration object');
  }
  const labels = ['💬ChatGPT', 'Google', 'muti_media'];
  const nodes = Array.from(new Set((Array.isArray(config.proxies) ? config.proxies : [])
    .map(p => p && p.name)
    .filter(n => typeof n === 'string' && n.trim().length > 0)));
  if (nodes.some(n => labels.includes(n))) {
    throw new Error('A proxy node has the same name as a personal group; rename that node first');
  }
  const providers = config['proxy-providers'];
  const providerNames = providers && typeof providers === 'object' && !Array.isArray(providers)
    ? Object.keys(providers) : [];
  const makeGroup = (name, first) => {
    const choices = Array.from(new Set([...first, ...nodes]));
    const group = {name, type: 'select', hidden: false};
    if (choices.length) group.proxies = choices;
    if (providerNames.length) group.use = providerNames;
    if (!choices.length && !providerNames.length) group.proxies = ['DIRECT'];
    return group;
  };
  const retained = (Array.isArray(config['proxy-groups']) ? config['proxy-groups'] : [])
    .filter(g => g && !labels.includes(g.name));
  config['proxy-groups'] = [
    makeGroup('💬ChatGPT', []),
    makeGroup('Google', ['DIRECT', '💬ChatGPT']),
    makeGroup('muti_media', ['DIRECT']),
    ...retained
  ];
  config.rules = [...PERSONAL_RULES];
  return config;
}

