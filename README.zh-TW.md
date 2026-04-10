# ERP Design

為製造業 ERP 應用打造的產業別設計系統。每個產業擁有專屬的 `DESIGN.md`（設計代碼、字型、色彩、元件）與 `preview.html`（瀏覽器互動式預覽，含明暗模式切換）。

[English](README.md)

## 產業總覽

| 產業 | 主色 | 狀態 |
|------|------|------|
| [電子業](designs/電子業/) | Electric Cyan `#00E5FF` | ✅ 完成 |
| [食品廠](designs/食品廠/) | Gradient Green `#10B981` | ✅ 完成 |
| [物流業](designs/物流業/) | Signal Amber `#F59E0B` | ✅ 完成 |
| [金屬加工](designs/金屬加工/) | Forge Orange `#FF6B2C` | ✅ 完成 |
| [紡織業](designs/紡織業/) | Indigo `#6366F1` | ✅ 完成 |
| [製藥業](designs/製藥業/) | Clinical Teal `#14B8A6` | ✅ 完成 |

## 目錄結構

```
designs/
├── 電子業/          # 電青色、玻璃擬態、電路板美學
│   ├── DESIGN.md
│   └── preview.html
├── 食品廠/          # 漸層綠、紅綠燈系統、暖灰色階
│   ├── DESIGN.md
│   └── preview.html
├── 物流業/          # 琥珀信號、shadow-as-border、膠囊導航
│   ├── DESIGN.md
│   └── preview.html
├── 金屬加工/        # 鍛造橙、冷鋼灰、CNC 精密感
│   ├── DESIGN.md
│   └── preview.html
├── 紡織業/          # 靛藍、織物漸層、暖紫灰色階
│   ├── DESIGN.md
│   └── preview.html
└── 製藥業/          # 臨床 Teal、實驗室精密、冷藍黑色階
    ├── DESIGN.md
    └── preview.html
```

## 設計系統格式

每份 `DESIGN.md` 包含：

- **產品情境** — 目標使用者、產業、專案類型
- **美學方向** — 氛圍、裝飾程度、參考靈感
- **字型系統** — 字型組合、字級表、CSS 變數
- **色彩** — 主色、背景色階、語義狀態色、明暗模式
- **間距** — 8px 基準單位、Compact-first 密度
- **版面** — 12 欄網格、Sidebar、Header、斷點
- **深度與層級** — 陰影系統、圓角層級
- **動效** — 緩動函數、時長、特色動畫
- **元件模式** — 按鈕、表格、標籤、KPI 卡片、導航
- **Do's and Don'ts** — 一致性護欄

## 預覽

在瀏覽器中開啟任何 `preview.html` 即可查看完整設計系統：

```bash
open designs/金屬加工/preview.html
```

每份預覽包含：
- 色彩調色盤
- 字型排版展示
- 元件展示（按鈕、輸入框、狀態標籤）
- 間距與圓角比例尺
- 完整 ERP 儀表板 Mockup（Sidebar + KPI + 資料表格）
- 明暗模式切換

## 設計參考

本專案以 submodule 引入 [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)，包含 59 套參考設計系統（Linear、Stripe、BMW、Tesla、SpaceX 等）作為靈感來源。

```bash
git submodule update --init
```

## 共通慣例

所有產業設計系統共享以下慣例，同時保持各自的視覺獨特性：

- **亮色模式預設** — 預覽預設亮色，可切換深色模式
- **等寬數據字型** — Geist Mono + `tabular-nums`，所有數值資料
- **8px 間距基準** — Compact-first，適配資料密集型 ERP
- **LED 發光狀態標籤** — 膠囊形 + 動態脈衝指示
- **56px 固定 Header** — 一致的導航框架
- **220px 可收合 Sidebar** — 收合至 64px icon-only

## 授權

私有專案。
