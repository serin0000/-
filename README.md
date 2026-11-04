# ✦ STARLIGHT CINEMA 星空電影院 ｜ 把電影帶到星空下

> **「把電影帶到星空下，讓每一次相聚都成為值得收藏的回憶。」**  
> *Bring the Movies Under the Stars.*  
> **多媒體網頁設計課程 期中報告 - 品牌形象官網設計提案 ｜ 513170500 陳悅琳**  
> A TRACK / CORPORATE BRAND WEBSITE ｜ 結合電影文化、戶外休閒與沉浸式視覺的企業品牌形象官方網站。

---

## ✦ 專案概覽 (Project Overview ｜ 參照 PPT Slide 01 & 02)

- **品牌名稱**：STARLIGHT CINEMA 星空電影院
- **品牌定位**：浪漫、文青、沉浸式的戶外電影體驗
- **核心服務**：戶外電影放映 ｜ 主題活動 ｜ 私人包場
- **主要受眾**：18–35 歲年輕族群、情侶、朋友與家庭
- **網站目標**：品牌曝光、活動推廣、預約轉換（預估每月訪客 1,000+，轉換率 5%+）
- **色彩系統 (OKLCH)**：嚴格落實 PPT Slide 08 之六大色彩 Token（Midnight Navy、Twilight Blue、Starlight Gold、Moon Ivory、Mist Blue、Sunset）
- **字體規範**：Playfair Display（英標）、Noto Serif TC（中標）、Noto Sans TC（內文）
- **無障礙規範**：符合 **WCAG 2.1 AA / AAA** 標準（雙層高對比 `:focus-visible`、螢幕閱讀器 ARIA、跳躍連結、動畫減敏）
- **跨裝置規格**：精密適配 **Desktop 1440px**（最大內容寬 1200px、欄距 24px、導覽列 80px）與 **Mobile 390px**（欄距 16px、按鈕至少 44px）
- **技術棧**：**純原生 HTML5 + CSS3 + ES6+ JavaScript**，零打包依賴，支援直接本機開啟與 GitHub Pages 零配置部署。

---

## ✦ 資訊架構與模組設計 (Information Architecture ｜ 參照 PPT Slide 05)

```
STARLIGHT CINEMA (Sitemap Architecture)
│
├── 01. HOME / 首頁視覺 (HTML5 Canvas 星空畫布 + 流星雨 + 投影光束 + 即時觀影天氣狀態)
│       └── Slide 06 Wireframe 快速入口：[近期活動] | [精選片單] | [場地介紹]
├── 02. ABOUT / 品牌故事 (Slide 02: 專案概覽 + 三大承諾：個人降噪耳機/4K巨幕/星野控光)
├── 03. AUDIENCE & NEEDS / 受眾分析 (Slide 03: 年輕上班族 / 情侶約會族 / 親子家庭 三大 Persona 解法)
├── 04. EXPERIENCE / 體驗特色 (4大特色卡片 + 毛孩星空綠洲寵物友善專區)
├── 05. MOVIES & EVENTS / 片單與活動 (Slide 04/06: 分類篩選 + 4部經典重映 + 快速代入預約)
├── 06. VENUES & CHARTER / 放映場域與包場 (草地星幕廣場/水岸天台/秘境森林 + 3大包場方案)
├── 07. REVIEWS / 顧客回饋 (420+場次指標 + 觀眾真實故事 + 專案展示聲明)
├── 08. USER FLOW & BOOKING / 預約動線與表單 (Slide 04/07: 5步決策動線 + 即時驗證 + 正式上線免責)
├── 09. TICKET MODAL / 專屬電影票根 (訂位編號 + 票券列印 + 剪貼簿複製 + 毛孩登記)
├── 10. FAQ / 常見問題與交通 (Slide 04/05: 交通停車/雨天備案/寵物同行/外食須知)
└── 11. FOOTER / 共通頁尾 (社群連結 | 聯絡方式 | 常見問題 | 隱私權政策 + 結語金句)
```

### 1. 沉浸式 Hero 首頁與 Canvas 星空畫布
- **高解析度 Canvas 引擎**：動態繪製逾 180 顆具備獨立微光閃爍週期與色溫的多層次星斗。
- **流星雨擬真特效**：隨機軌跡與漸層拖尾光暈，營造夜空下仰望銀幕的情境。
- **游標星塵微光互動**：滑鼠游標移動時伴隨若隱若現的金色星塵粒子。
- **即時觀星天氣狀態膠囊**：標示當夜放映動態、溫度與 96% 觀星指數。

### 2. 四維感官特色服務與毛孩友善專區
- **星空觀影**：4K 戶外雷射高對比透聲巨幕，搭配個人專屬 Hi-Fi 降噪耳機，徹底解決露天噪音干擾，全場無刺耳廣播爆音，貼心守護毛孩靈敏聽力。
- **雲朵野餐座位**：手作雙人防潮波西米亞野餐墊、人體工學充氣沙發與露營原木小几，全區開放牽繩毛孩自由同行席地依偎。
- **電影微醺美食**：在地小農焦糖海鹽爆米花、聯名星空精釀啤酒、暖心香料熱紅酒與草本特調；並免費提供毛孩無鹽烘焙爆米花與純淨水碗。
- **主題限定活動**：情人節燭光特映、萬聖驚悚午夜場、經典 35mm 膠捲復刻與毛孩草地特映祭。
- **毛孩星空綠洲專區**：嚴謹規範寵物觀影指南（耳機聽力保護、草地自由漫步、專屬補給站、全程牽繩禮儀）。

### 3. 本月電影片單與即時分類篩選
- 提供「全部」、「浪漫約會」、「科幻史詩」、「經典文藝」四重分頁切換。
- 精選《星際效應》、《愛樂之城》、《銀翼殺手2049》、《重慶森林》四部氛圍巨作，搭配特製高解析 SVG 藝術海報。
- 每張電影卡片皆附有「快速預約此場次」按鈕，點擊後自動平滑滾動並將片名帶入預約表單。

### 4. 戶外場域與私人包場方案
- 三大嚴選場地：**草地星幕廣場**（120人）、**水岸天台星空吧**（50人）、**秘境森林放映區**（30人）。
- 私人包場亮點介紹：**浪漫求婚專案**（NT$ 16,800起）、**私人好友派對**（NT$ 28,000起）、**企業品牌發表日**（NT$ 58,000起）。

### 5. 席位預約諮詢表單與即時驗證
- **即時欄位格式驗證**：嚴格檢查姓名（長度>=2）、Email 正則表達式、電話格式、預約日期（限定明日以後）、參加人數（不小於1的正整數）及服務條款核取。
- **智慧動態金額試算**：隨時依據參加人數或包場方案即時計算總預算（如每席 NT$ 480，即時連動）。
- **無障礙回饋**：採用 `aria-invalid="true"`、`aria-describedby` 與 `role="alert"` 即時顯示錯誤。

### 6. 復古電影票根確認視窗 (Ticket Modal)
- 表單成功送出後，跳出仿造經典電影實體票根質感的確認彈窗。
- 自動生成唯一的預約編號（如 `STRL-2026-9481`）與條碼視覺。
- 支援「一鍵複製預約編號」到剪貼簿，並彈出優雅的 Toast 通知，同時支援「列印 / 下載存為票券」。

---

## ✦ 設計系統與 OKLCH 色彩空間 (Color & Accessibility)

本專案全面採用次世代 **OKLCH 色彩空間**，確保在現代寬色域顯示器上呈現最純淨的星空黑、冷青藍與星光暖金：

```css
:root {
  /* PPT Slide 08 精準 OKLCH 色彩 Token 規格 */
  --color-midnight-navy: oklch(0.20 0.035 263);  /* Midnight Navy: 深藍夜色 */
  --color-twilight-blue: oklch(0.34 0.045 257);  /* Twilight Blue: 暮光藍 */
  --color-starlight-gold: oklch(0.78 0.09 85);    /* Starlight Gold: 暖金星光 */
  --color-moon-ivory: oklch(0.95 0.015 90);      /* Moon Ivory: 月象白 */
  --color-mist-blue: oklch(0.68 0.04 255);        /* Mist Blue: 薄霧灰藍 */
  --color-sunset: oklch(0.62 0.09 48);           /* Sunset: 日落暖橘 */

  /* 前景與文字階層（WCAG AAA 7:1+ 對比度） */
  --color-text-cream: var(--color-moon-ivory);
  --color-text-secondary: oklch(0.88 0.02 90);
  --color-text-muted: var(--color-mist-blue);

  /* 品牌高亮識別 */
  --color-star-gold: var(--color-starlight-gold);
  --color-cinema-amber: var(--color-sunset);
  --color-border-focus: var(--color-starlight-gold);
}
```

### 無障礙無阻礙（WCAG 2.1 AA / AAA）合規項目：
1. **高可視焦點輪廓 (`:focus-visible`)**：所有可聚焦元件（按鈕、連結、輸入框）皆配置雙層高對比星芒金輪廓與位移外環，杜絕鍵盤導航迷失。
2. **跳躍主要內容連結 (`.skip-link`)**：頁面開頭備妥跳至主內容按鈕，鍵盤 Tab 鍵首位直覺觸發。
3. **螢幕閱讀器支援 (`.sr-only`, ARIA)**：包含 `role="banner"`、`role="navigation"`、`role="main"`、`role="dialog"`、`aria-expanded`、`aria-modal`、`aria-live="polite"` 等完備標籤。
4. **焦點管理 (Focus Trap)**：行動版抽屜選單與票根 Modal 開啟時鎖定頁面背景滾動，並限制 Tab 鍵焦點於彈窗內循環，按 `Escape` 鍵立即安全關閉。
5. **偏好減少動態 (`prefers-reduced-motion: reduce`)**：自動偵測並關閉 Canvas 星空渲染與 CSS 平滑滾動，保障前庭系統敏感使用者之體驗。

---

## ✦ 專案目錄結構 (Project Structure)

```
starlight-cinema/
├── index.html                   # 語意化首頁主結構 (WCAG 2.1 AA/AAA)
├── README.md                    # 專題提案與 GitHub Pages 部署手冊
├── css/
│   └── style.css                # OKLCH 色彩變數、排版、RWD (1440px / 390px)、無障礙樣式
├── js/
│   └── main.js                  # Canvas 星空流星引擎、表單驗證、動態試算、票根彈窗
└── images/                      # 100% 獨立自主向量 SVG 圖像（無第三方外部依賴）
    ├── poster-interstellar.svg   # 《星際效應》高畫質向量電影海報
    ├── poster-lalaland.svg       # 《愛樂之城》暮色雙人舞向量海報
    ├── poster-bladerunner2049.svg# 《銀翼殺手2049》賽博龐克光影海報
    ├── poster-chungking.svg      # 《重慶森林》經典霓虹電影海報
    ├── venue-meadow.svg          # 草地星幕廣場實景視覺
    ├── venue-rooftop.svg         # 水岸天台星空吧城市夜景視覺
    ├── venue-forest.svg          # 秘境森林放映區營火氛圍視覺
    ├── exp-projection.svg        # 4K雷射巨幕與耳機體驗插畫
    ├── exp-picnic.svg            # 舒適野餐墊與懶人沙發插畫
    ├── exp-gastronomy.svg        # 爆米花與精釀啤酒美食插畫
    └── exp-events.svg            # 策展主題夜與打板插畫
```

---

## ✦ 部署至 GitHub Pages 指南 (Deployment Guide)

本專案使用原生技術打造，**完全不需安裝 Node.js、npm 或任何打包工具**，推送到 GitHub 即可在 1 分鐘內上線：

### 步驟 1：建立並推送至 GitHub 倉庫
```bash
# 進入專案目錄
cd starlight-cinema

# 初始化 Git 倉庫
git init
git add .
git commit -m "feat: complete STARLIGHT CINEMA brand website"

# 關聯至你的遠端倉庫 (替換 YOUR-USERNAME 與 REPO-NAME)
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

### 步驟 2：啟用 GitHub Pages
1. 前往你的 GitHub 倉庫頁面，點選上方的 **Settings**（設定）。
2. 在左側導覽列找到 **Pages**（位於 Code and automation 下方）。
3. 在 **Build and deployment** 下的 **Branch**：
   - 分支選擇：`main`
   - 目錄選擇：`/(root)`
4. 點選 **Save**（儲存）。
5. 等待 30～60 秒，頁面頂端將顯示你的專屬線上網址：  
   `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## ✦ 專案展示聲明 (Academic Showcase Disclaimer)

> **※ 備註**：  
> 本專案為虛構品牌官網專案展示，頁面內所載之活動統計場次、觀眾真實好評與合作夥伴標章皆為競賽賽道 A 之設計架構模擬示意，嚴謹落實學術誠信規範，旨在展示戶外露天電影品牌的創意突破、現代前端規範、OKLCH 色彩體系與 WCAG 無障礙技術實踐。

