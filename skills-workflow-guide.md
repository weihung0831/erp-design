# Skills 與工作流程指南

## Compound Engineering 指令集

### 開發工作流程

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/ce-plan` | 將需求轉化為結構化實作計畫 | 開始新功能前，規劃實作方式 |
| `/ce-brainstorm` | 協作式腦力激盪，產出需求文件 | 功能構想階段，釐清需求 |
| `/ce-ideate` | 產生並評估專案改進想法 | 想找改進方向時 |
| `/ce-work` | 高效執行開發工作 | 實作功能時 |
| `/ce-review` | 結構化 Code Review（多角色） | 建立 PR 前自我審查 |
| `/ce-compound` | 記錄剛解決的問題供未來參考 | 解決複雜問題後 |

### Git 操作

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/commit` | 建立 git commit | 完成一個變更單元 |
| `/commit-push-pr` | Commit → Push → 開 PR | 功能完成要發 PR |
| `/git-clean-gone-branches` | 清理已刪除 remote 的本地分支 | 定期清理 |
| `/git-worktree` | 管理 Git worktree 做平行開發 | 同時處理多個功能 |

### 文件與品質

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/document-review` | 多角色審查需求/計畫文件 | spec/plan 寫完要檢查 |
| `/onboarding` | 產生 ONBOARDING.md | 新成員入職用 |
| `/document-release` | 更新文件配合已上線的功能 | 功能上線後同步文件 |
| `/learn` | 管理專案學習記錄 | 查看/整理過去學到的經驗 |

### 除錯與測試

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/investigate` | 系統化除錯（調查→分析→假設→修復） | 遇到 bug 要追根因 |
| `/reproduce-bug` | 從 GitHub issue 重現 bug | 收到 bug report |
| `/simplify` | 審查程式碼的複用、品質、效率 | 開發完要精簡程式碼 |

### 部署與上線

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/ship` | 跑測試 → Review → 建 PR | 功能完成要上線 |
| `/land-and-deploy` | Merge PR → 等 CI → 驗證 production | PR 通過要合併部署 |
| `/review` | Pre-landing PR 審查 | PR merge 前最後檢查 |

### 安全與防護

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/careful` | 破壞性指令警告（rm -rf、DROP TABLE 等） | 操作正式環境 |
| `/freeze` | 限制檔案編輯範圍到指定目錄 | 除錯時避免改到無關程式碼 |
| `/unfreeze` | 解除 freeze 限制 | 恢復全目錄編輯 |
| `/guard` | careful + freeze 同時啟用 | 最高安全模式 |
| `/cso` | 安全審計（secrets、依賴、CI/CD、OWASP） | 資安檢查 |

### 排程與自動化

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/schedule` | 建立/管理排程 remote agent | 定期自動化任務 |
| `/loop` | 定時重複執行指令 | 輪詢狀態、持續監控 |

---

## GStack 指令集（瀏覽器自動化與 QA）

### QA 測試

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/qa` | QA 測試 + 自動修 bug | 功能完成要全面測試並修復 |
| `/qa-only` | 只測試不修，產出報告 | 只要 bug 報告，不要自動修 |
| `/browse` | 無頭瀏覽器操作頁面 | 導航、點擊、截圖、驗證狀態 |
| `/test-browser` | 對 PR 影響的頁面跑瀏覽器測試 | PR 提交前驗證 UI |

### 設計相關

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/frontend-design` | 建構有設計品質的前端介面 | 任何前端開發工作 |
| `/design-shotgun` | 產生多個設計變體比較 | 探索設計方向 |
| `/design-html` | 產出 production 級 HTML/CSS | 設計定稿後切版 |
| `/design-review` | 設計師視角 QA（找視覺問題並修復） | UI 完成後視覺檢查 |
| `/design-consultation` | 設計諮詢（色彩、字型、風格系統） | 專案初期建立設計系統 |

### 監控與效能

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/canary` | 部署後 canary 監控 | 上線後監控是否正常 |
| `/benchmark` | 效能基準測試（載入速度、Core Web Vitals） | PR 前後效能比較 |
| `/health` | 程式碼品質儀表板（型別、lint、測試、死碼） | 定期健康檢查 |

### 瀏覽器設定

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/open-gstack-browser` | 開啟可視化 GStack 瀏覽器 | 需要看到操作過程 |
| `/setup-browser-cookies` | 匯入真實瀏覽器 cookie | QA 測試需要登入狀態的頁面 |
| `/gstack-upgrade` | 升級 gstack 到最新版 | 有新版本時 |

---

## 計畫審查（Plan Review）

| 指令 | 說明 | 視角 |
|------|------|------|
| `/plan-ceo-review` | CEO 模式：挑戰前提、擴大範圍 | 產品/商業 |
| `/plan-eng-review` | 工程主管模式：架構、邊界、測試 | 技術/執行 |
| `/plan-design-review` | 設計師模式：互動、狀態、流程 | 設計/UX |
| `/plan-devex-review` | DX 模式：開發者體驗、競品比較 | 開發體驗 |
| `/autoplan` | 依序跑 CEO → Design → Eng → DX 審查 | 全面審查 |

---

## 其他工具

| 指令 | 說明 | 使用時機 |
|------|------|----------|
| `/retro` | 週回顧（分析 commit、工作模式） | 每週結束時 |
| `/office-hours` | YC Office Hours 模式提問 | 產品方向/創業思考 |
| `/codex` | OpenAI Codex 獨立審查/挑戰 | 要第二意見 |
| `/checkpoint` | 儲存工作進度快照 | 切換分支前保存狀態 |
| `/claude-permissions-optimizer` | 優化 Claude Code 權限設定 | 減少權限提示 |
| `/devex-review` | 開發者體驗實測（文件、TTHW） | 評估 DX 品質 |

---

## 設計系統文件（awesome-design-md）

### 什麼是設計系統文件

由 Google Stitch 提出的概念，用純 Markdown 定義設計系統，讓 AI agent 產生一致的 UI。檔案命名為 DESIGN 加上 .md 副檔名。

| 檔案 | 讀取者 | 定義內容 |
|------|--------|----------|
| AGENTS / CLAUDE 設定檔 | Coding agent | 如何建構專案 |
| DESIGN 設定檔 | Design agent | 專案的視覺風格 |

### 本專案的參考資源

位置：awesome-design-md/design-md/

收錄了 58 個知名網站的設計系統文件，可直接複製到專案中使用。

### 每個設計系統文件包含

- **Design Tokens** — 顏色、字型、圓角、陰影、間距
- **Typography** — 字體大小、行高、字重
- **Layout** — 網格系統、斷點、容器寬度
- **Components** — 按鈕、卡片、表單、導覽列等元件規格
- **Motion** — 動畫、過場效果
- **Dark Mode** — 深色模式配色

### 使用方式

1. 從 awesome-design-md/design-md/ 選一個風格接近的設計系統文件
2. 複製到專案根目錄或指定目錄
3. 告訴 AI agent「用這個設計系統文件的風格建頁面」

---

## 常用工作流程組合

### 新功能開發（從零到上線）
```
/ce-brainstorm → /ce-plan → /plan-ceo-review → /plan-eng-review
→ /ce-work → /simplify → /ce-review → /ship → /land-and-deploy → /canary
```

### 前端功能開發（含設計）
```
從 awesome-design-md/design-md/ 選幾個風格參考
→ /design-consultation → 基於參考產出專案設計系統文件
→ /design-shotgun → 產生多個設計變體，選定方向
→ /frontend-design → 依設計系統文件實作 UI
→ /design-review → 視覺審查並修復
→ /qa → 全面測試並修 bug
→ /ship
```

### Bug 修復
```
/reproduce-bug → /investigate → 修復 → /simplify → /commit
```

### PR 發布與部署
```
/ce-review → /ship → /land-and-deploy → /canary
```

### 文件與計畫審查
```
/document-review → /plan-ceo-review → /plan-eng-review → /plan-design-review
```

### 定期維護
```
/health → /retro → /learn → /git-clean-gone-branches
```
