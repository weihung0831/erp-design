# CLAUDE.md

## Design System
每個產業的設計系統定義在 `designs/<產業>/DESIGN.md`。
進行任何視覺或 UI 決策前，**必須先讀取對應產業的 DESIGN.md**。
字型、色彩、間距、美學方向皆定義於此，未經使用者核准不可偏離。
QA 模式下，標記任何不符合 DESIGN.md 的程式碼。

## 目錄結構

```
designs/
├── <產業>/
│   ├── DESIGN.md      # 設計代碼：色彩、字型、間距、元件模式
│   └── preview.html   # 互動式瀏覽器預覽（含 dark/light 切換）
awesome-design-md/       # submodule — 59 套參考設計系統（Linear, BMW, etc.）
```

## 產業設計差異化

每個產業必須有獨立的 accent 色，不可重複：
- 電子業：Electric Cyan `#00E5FF`
- 食品廠：Gradient Green `#10B981`
- 物流業：Signal Amber `#F59E0B`
- 金屬加工：Forge Orange `#FF6B2C`
- 紡織業：Indigo `#6366F1`
- 製藥業：Clinical Teal `#14B8A6`

共通慣例：亮色預設、Geist Mono 等寬數據、8px 間距基準、LED 發光狀態標籤。

## 新增產業流程

1. 從 `awesome-design-md/design-md/` 挑選 3-5 個風格參考
2. 執行 `/design-consultation` 產出設計系統
3. 在 `designs/<產業>/` 產出 `DESIGN.md` 和 `preview.html`
4. 確保 accent 色與既有產業不衝突

## 預覽

```bash
open designs/<產業>/preview.html
```

## 前置設定

```bash
git submodule update --init   # 初始化 awesome-design-md 參考設計
```
