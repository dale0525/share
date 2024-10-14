const subscribe_urls = [
    {
        name: "主力机场",
        url: "{隐藏}",
    },
    {
        name: "备用机场1",
        url: "{隐藏}",
    },
    {
        name: "备用机场2（不限时流量）",
        url: "{隐藏}",
    },
    {
        name: "备用机场3",
        url: "{隐藏}",
    },
];
const static_providers = [
    "主力机场",
    "备用机场1",
    "备用机场2（不限时流量）",
    "备用机场3",
];
const emby_providers = ["主力机场", "备用机场1", "备用机场3"];
const exclude_filter =
    "(?i)过期|到期|剩余|重置|TG群|劫持|专用|官网|订阅|IPV6| [1-9]\\d*(\\.\\d+)*[倍xX]";
const low_ratio_filter = "0\\.\\d+[倍xX]";
const landing_proxy = "甲骨文日本";
const url_test_static = "{隐藏}";
const url_test_emby = "{隐藏}/web/favicon.ico";
const tolerance = "30";
const emby_filter = "SP";
const custom_rules = `
  ### google play
  - DOMAIN-SUFFIX,googleapis.cn,PROXY
`;
const proxies = `
proxies:
  - name: "甲骨文日本"
    type: vmess
    server: {隐藏}
    port: 443
    uuid: {隐藏}
    alterId: 0
    cipher: aes-128-gcm
    udp: true
    tls: true
    skip-cert-verify: true
    servername: {隐藏}
    network: ws
    ws-opts:
      path: {隐藏}
      headers:
        Host: {隐藏}
  - name: "CF"
    type: vless
    server: {隐藏}
    port: {隐藏}
    uuid: {隐藏}
    network: ws
    tls: false
    udp: false
    sni: {隐藏}
    client-fingerprint: chrome
    ws-opts:
      path: {隐藏}
      headers:
        host: {隐藏}
`;

// 下面的内容可以不用修改
const url_test = "http://1.1.1.1/generate_204";
let proxy_groups = {
    PROXY: { type: "select", proxies: ["自动选择", "CF"] },
    自动选择: {
        type: "fallback",
        proxies: [],
        url: url_test,
        "exclude-filter": emby_filter,
        interval: "300",
        hidden: "true",
        lazy: "false",
    },
    "zzzAUTO-STATIC": {
        type: "url-test",
        // proxies: ["DIRECT"],
        use: static_providers.map((e) => {
            return `${e}-provider`;
        }),
        // url: url_test,
        url: url_test_static,
        "exclude-filter": emby_filter,
        interval: "300",
        hidden: "true",
        tolerance: tolerance,
        lazy: "false",
    },
    "PROXY-STATIC": {
        type: "relay",
        proxies: ["zzzAUTO-STATIC", landing_proxy],
        hidden: "true",
    },
    EMBY: {
        type: "url-test",
        proxies: ["DIRECT"],
        use: emby_providers.map((e) => {
            return `${e}-provider`;
        }),
        url: url_test_emby,
        interval: "300",
        tolerance: tolerance,
        lazy: "false",
    },
};
let subscriptionUserinfo = null;
const rule_providers = `
rule-providers:
  icloud:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/icloud.txt"
    path: ./ruleset/icloud.yaml
    interval: 86400

  apple:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/apple.txt"
    path: ./ruleset/apple.yaml
    interval: 86400

  google:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml"
    path: ./ruleset/google.yaml
    interval: 86400

  direct:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/direct.txt"
    path: ./ruleset/direct.yaml
    interval: 86400

  private:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/private.txt"
    path: ./ruleset/private.yaml
    interval: 86400

  telegramcidr:
    type: http
    behavior: ipcidr
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/telegramcidr.txt"
    path: ./ruleset/telegramcidr.yaml
    interval: 86400

  cncidr:
    type: http
    behavior: ipcidr
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt"
    path: ./ruleset/cncidr.yaml
    interval: 86400

  lancidr:
    type: http
    behavior: ipcidr
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/lancidr.txt"
    path: ./ruleset/lancidr.yaml
    interval: 86400

  applications:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/applications.txt"
    path: ./ruleset/applications.yaml
    interval: 86400

  open-ai:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml"
    path: ./ruleset/open-ai.yaml
    interval: 86400

  gemini:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml"
    path: ./ruleset/gemini.yaml
    interval: 86400

  anthropic:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Anthropic/Anthropic.yaml"
    path: ./ruleset/anthropic.yaml
    interval: 86400

  tiktok:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml"
    path: ./ruleset/tiktok.yaml
    interval: 86400

  speedtest:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Speedtest/Speedtest.yaml"
    path: ./ruleset/speedtest.yaml
    interval: 86400

  steam-cn:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/SteamCN/SteamCN.yaml"
    path: ./ruleset/steam-cn.yaml
    interval: 86400

  epic:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Epic/Epic.yaml"
    path: ./ruleset/epic.yaml
    interval: 86400

  facebook:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Facebook/Facebook.yaml"
    path: ./ruleset/facebook.yaml
    interval: 86400

  crypto:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Crypto/Crypto.yaml"
    path: ./ruleset/crypto.yaml
    interval: 86400

  taptap-io:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TapTap/TapTap.yaml"
    path: ./ruleset/taptap-io.yaml
    interval: 86400

  onedrive:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OneDrive/OneDrive.yaml"
    path: ./ruleset/onedrive.yaml
    interval: 86400

  discord:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Discord/Discord.yaml"
    path: ./ruleset/discord.yaml
    interval: 86400

  emby:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Emby/Emby.yaml"
    path: ./ruleset/emby.yaml
    interval: 86400

  bing:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml"
    path: ./ruleset/bing.yaml
    interval: 86400

  unity:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Unity/Unity.yaml"
    path: ./ruleset/unity.yaml
    interval: 86400

  cloudflare:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Cloudflare/Cloudflare.yaml"
    path: ./ruleset/cloudflare.yaml
    interval: 86400

  cloudflare-cn:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Cloudflarecn/Cloudflarecn.yaml"
    path: ./ruleset/cloudflare-cn.yaml
    interval: 86400

  amazon:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Amazon/Amazon.yaml"
    path: ./ruleset/amazon.yaml
    interval: 86400

  amazon-cn:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/AmazonCN/AmazonCN.yaml"
    path: ./ruleset/amazon-cn.yaml
    interval: 86400

  privacy:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Privacy/Privacy_Classical.yaml"
    path: ./ruleset/privacy.yaml
    interval: 86400

  hijacking:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Hijacking/Hijacking.yaml"
    path: ./ruleset/hijacking.yaml
    interval: 86400

  oracle:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Oracle/Oracle.yaml"
    path: ./ruleset/oracle.yaml
    interval: 86400

  youtube:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml"
    path: ./ruleset/youtube.yaml
    interval: 86400

  alibaba:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Alibaba/Alibaba.yaml"
    path: ./ruleset/alibaba.yaml
    interval: 86400

  github:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GitHub/GitHub.yaml"
    path: ./ruleset/github.yaml
    interval: 86400

  nvidia:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Nvidia/Nvidia.yaml"
    path: ./ruleset/nvidia.yaml
    interval: 86400

  akamai:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Akamai/Akamai.yaml"
    path: ./ruleset/akamai.yaml
    interval: 86400

  no-resolve:
    type: http
    behavior: classical
    path: ./rules/no-resolve.yaml
    url: "https://gist.githubusercontent.com/cnfree8964/0864fd1d2e88936a095fb40d74ce4993/raw/collection.yaml"
`;
const rules = `
  ## 需要直连的地方
  ### rule set
  - RULE-SET,steam-cn,DIRECT
  - RULE-SET,epic,DIRECT
  - RULE-SET,cloudflare-cn,DIRECT
  - RULE-SET,amazon-cn,DIRECT
  - RULE-SET,oracle,DIRECT
  - RULE-SET,alibaba,DIRECT
  - RULE-SET,nvidia,DIRECT
  - RULE-SET,akamai,DIRECT
  ### zerotier
  - PROCESS-NAME,ZeroTier,DIRECT
  - PROCESS-NAME,zerotier-one_x64.exe,DIRECT
  ### tailscale
  - PROCESS-NAME,tailscaled.exe,DIRECT
  - PROCESS-NAME,tailscale.exe,DIRECT
  - PROCESS-NAME,tailscaled,DIRECT

  ## Emby
  - DOMAIN-SUFFIX,stream.synn.cc,EMBY
  - DOMAIN-SUFFIX,stream-zz.synn.cc,EMBY
  - DOMAIN,emby.aca.best,PROXY
  - DOMAIN,porn.aca.best,PROXY
  - RULE-SET,emby,PROXY

  ## AI
  - RULE-SET,open-ai,PROXY-STATIC
  - RULE-SET,bing,PROXY-STATIC
  - RULE-SET,gemini,PROXY-STATIC
  - RULE-SET,anthropic,PROXY-STATIC

  ## 其他需要静态ip代理的地方
  - RULE-SET,tiktok,PROXY-STATIC
  - RULE-SET,facebook,PROXY-STATIC
  - RULE-SET,crypto,PROXY-STATIC
  - RULE-SET,taptap-io,PROXY-STATIC
  - RULE-SET,discord,PROXY-STATIC
  #- RULE-SET,cloudflare,PROXY-STATIC
  - RULE-SET,amazon,PROXY-STATIC

  ## 其他需要随意代理的地方
  ### rule set
  - RULE-SET,google,PROXY
  - RULE-SET,speedtest,PROXY
  - RULE-SET,onedrive,PROXY
  - RULE-SET,github,PROXY
  - RULE-SET,cloudflare,PROXY
  ### tailscale
  - DOMAIN-SUFFIX,controlplane.tailscale.com,PROXY
  - DOMAIN-SUFFIX,log.tailscale.io,PROXY
  ### parsec
  - DOMAIN-SUFFIX,parsec.app,PROXY
  - DOMAIN-SUFFIX,parsecgaming.com,PROXY
  - DOMAIN-SUFFIX,parsecusercontent.com,PROXY

  ## 隐私
  - RULE-SET,privacy,REJECT
  - RULE-SET,hijacking,REJECT

  ## other rule providers
  - RULE-SET,applications,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,direct,DIRECT
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,cncidr,DIRECT
  - RULE-SET,telegramcidr,PROXY
  - RULE-SET,no-resolve,DIRECT,no-resolve
  - GEOIP,LAN,DIRECT,no-resolve
  - GEOIP,CN,DIRECT,no-resolve
  - MATCH,PROXY
`;
const settings = `
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - '*.lan'
    - "+.local"
    - 'localhost.ptlogin2.qq.com'
    - 'dns.msftncsi.com'
    - 'www.msftncsi.com'
    - 'www.msftconnecttest.com'
  nameserver-policy:
    'www.baidu.com': '114.114.114.114'
    '+.internal.crop.com': '10.0.0.1'
    'geosite:cn': https://doh.pub/dns-query
  nameserver:
    - system
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  fallback:
    - tls://8.8.4.4
    - tls://1.1.1.1
  proxy-server-nameserver:
    - https://doh.pub/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    geosite:
      - gfw
    ipcidr:
      - 240.0.0.0/4
    domain:
      - '+.ai.com'
      - '+.algolia.net'
      - '+.anthropic.com'
      - '+.argotunnel.com'
      - '+.arkoselabs.com'
      - '+.auth0.com'
      - '+.azure.com'
      - '+.azureedge.net'
      - '+.bing.com'
      - '+.bingapis.com'
      - '+.bugsnag.com'
      - '+.chatgpt.com'
      - '+.claude.ai'
      - '+.cloudflare.net'
      - '+.cloudflareinsights.com'
      - '+.cohere.ai'
      - '+.docker.com'
      - '+.docker.io'
      - '+.facebook.com'
      - '+.github.com'
      - '+.githubusercontent.com'
      - '+.google'
      - '+.google.com'
      - '+.google.dev'
      - '+.googleapis.cn'
      - '+.googlevideo.com'
      - '+.identrust.com'
      - '+.instagram.com'
      - '+.intercom.io'
      - '+.live.com'
      - '+.livekit.cloud'
      - '+.meta.ai'
      - '+.microsoft.com'
      - '+.microsoftapp.net'
      - '+.minecraft.net'
      - '+.msn.com'
      - '+.openai.com'
      - '+.poe.com'
      - '+.segment.com'
      - '+.segment.io'
      - '+.sentry.io'
      - '+.synn.cc'
      - '+.stripe.com'
      - '+.t.me'
      - '+.tailscale.com'
      - '+.tailscale.io'
      - '+.twitter.com'
      - '+.usefathom.com'
      - '+.v2ex.com'
      - '+.windows.net'
      - '+.wootric.com'
      - '+.x.com'
      - '+.youtube.com'
`;

async function generate_proxy_provider(subscribes) {
    let final = `
proxy-providers:
  `;
    for (let i = 0; i < subscribes.length; i++) {
        const subscribe = subscribes[i];
        if (i == 0) {
            const response = await fetch(subscribe.url, {
                headers: {
                    "User-Agent": "clash-verge/v1.4.5",
                },
            });
            subscriptionUserinfo = response.headers.get(
                "subscription-userinfo"
            );
        }
        final += `
  ${subscribe.name}-provider:
    type: http
    url: "${subscribe.url}"
    interval: 3600
    path: ./proxy/${subscribe.name}.yaml
    exclude-filter: '${exclude_filter}|${low_ratio_filter}'
    health-check:
      enable: false
      interval: 600
      url: ${url_test}
    `;
        proxy_groups[subscribe.name.toUpperCase()] = {
            type: "select",
            use: [`${subscribe.name}-provider`],
        };
        proxy_groups[`${subscribe.name}-auto`.toUpperCase()] = {
            type: "url-test",
            use: [`${subscribe.name}-provider`],
            url: url_test,
            hidden: true,
            tolerance: tolerance,
        };
        proxy_groups["PROXY"]["proxies"].push(subscribe.name.toUpperCase());
        proxy_groups["自动选择"]["proxies"].push(
            `${subscribe.name.toUpperCase()}-auto`.toUpperCase()
        );
        // proxy_groups["自动选择"]["use"].push(`${subscribe.name}-provider`);
    }
    return final;
}

function proxy_groups_to_yaml() {
    let final = `
proxy-groups:`;
    for (let i = 0; i < Object.keys(proxy_groups).length; i++) {
        const name = Object.keys(proxy_groups)[i];
        let indent = "  ";
        final += `\n${indent}- name: "${name}"`;
        const info = proxy_groups[name];
        for (const key in info) {
            final += `\n${indent}${indent}${key}: `;
            if (Array.isArray(info[key])) {
                for (let j = 0; j < info[key].length; j++) {
                    const element = info[key][j];
                    final += `\n${indent}${indent}${indent}- ${element}`;
                }
            } else {
                final += info[key];
            }
        }
    }
    return final;
}

export default {
    async fetch(request) {
        const { searchParams } = new URL(request.url);
        let q = searchParams.get("q");
        if (q != "1s1sljjmtdsxxx") {
            return new Response("Invalid Auth", { status: 400 });
        } else {
            const final_rules = `rules:\n${custom_rules}\n${rules}`;
            const final_proxy_providers = await generate_proxy_provider(
                subscribe_urls
            );
            const final_proxy_groups = proxy_groups_to_yaml();
            let final = `${settings}\n${final_proxy_providers}\n${proxies}\n${final_proxy_groups}\n${rule_providers}\n${final_rules}`;
            const headers = new Headers();
            headers.set("subscription-userinfo", subscriptionUserinfo);
            return new Response(final, {
                headers: headers,
            });
        }
    },
};
