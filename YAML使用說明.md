# 完整 YAML 設定

`config.yaml` 面向 Mihomo／Clash Verge Rev，已包含基本設定、節點來源、策略組及規則。它不需要訂閱轉換伺服器，但目前節點來源是佔位網址，尚不能直接作為可用代理訂閱。

## 接入自己的節點

在本機副本或客戶端的持久覆寫中，把 `proxy-providers.subscription.url` 換成有效、能被 Mihomo 解析的節點訂閱網址。`https://example.invalid/REPLACE_WITH_YOUR_SUBSCRIPTION_URL` 是刻意不可用的佔位符，不是服務。

公開 GitHub 倉庫不得放入私人訂閱網址或節點憑證。若直接修改下載後的本機副本，下次更新遠端 YAML 會覆蓋修改；要持續同步 GitHub 規則，請使用客戶端支援的持久覆寫功能保存私人網址。私有倉庫的 Raw 讀取需要認證，不能當作匿名公開訂閱。

## 分流行為

- 💬ChatGPT：手動選擇訂閱內的節點。
- Google：DIRECT、💬ChatGPT 和訂閱內的節點；第一個選項為 DIRECT。
- muti_media：DIRECT 和訂閱內的節點；第一個選項為 DIRECT。
- 未匹配規則的流量：DIRECT。
- YouTube Music 的 `music.youtube.com` 走 muti_media；共用影音域名仍可能走 Google，無法僅靠域名完整區分兩個 App。
- 沿用原腳本的 auth0.com、sentry.io、stripe.com 等共享域名規則；其他使用這些域名的服務也會受影響。

## 從 JS 遷移的調整

原 JS 不包含節點、DNS 或監聽設定，它原本依賴現有訂閱。YAML 改用 `proxy-providers` 動態取得節點，並透過各分組的 `use` 引用全部節點，不再引用舊訂閱第一個分組內的選項。

移除 11 條 `IN-USER`：它匹配入站認證使用者名稱，並非 App 名稱。域名規則保留並去重，將 YouTube Music 精確域名提前，避免被一般 YouTube 規則遮蔽。原本的隨機節點已存在於列表中，沒有額外效果，因此不另做隨機選擇。補上 `MATCH,DIRECT` 明確指定未匹配流量的處理方式。

節點健康檢查沿用 300 秒間隔、3000 毫秒逾時與 Google 測試網址。未搬移不適用於手動選擇組的失敗切換設定。基本配置新增本機 7890 混合埠、禁止 LAN 連入、規則模式、停用 IPv6、保存分組選擇。內建 DNS 與 TUN 預設關閉，系統代理和 TUN 按客戶端需求啟用。這些基礎項目不是從原腳本還原而來；Clash Verge 的介面設定也可能覆寫它們。

切換至 YAML 前，停用原本會重寫 `rules` 和 `proxy-groups` 的 JS；保留舊設定以便切回。加入真實訂閱後，檢查節點是否載入，再手動選擇各組出口。

## 驗證結果

已使用本機 Clash Verge 隨附的 `verge-mihomo.exe -t`，在獨立檢查目錄中確認 YAML 可被核心解析。原腳本共 100 條規則，移除 11 條 IN-USER、去除 3 條完全重複規則，再增加一條 MATCH，共 87 條。此檢查未啟動代理服務，也未驗證真實訂閱下載或節點連線。

## GitHub 使用

上傳位置：`YouWas/myruelinclash` 倉庫的 `main` 分支。

Raw 位址：<https://raw.githubusercontent.com/YouWas/myruelinclash/main/config.yaml>

此網址提供完整 YAML 結構，但仍須按上文用本機持久覆寫接入私人訂閱。它不是可直接使用的成品節點訂閱。原倉庫中的 JS 與 INI 保留，匯入 YAML 時不需要同時啟用它們。

## 格式參考

- [Mihomo 代理集合](https://wiki.metacubex.one/config/proxy-providers/)
- [Mihomo 路由規則與 IN-USER 定義](https://wiki.metacubex.one/config/rules/)

