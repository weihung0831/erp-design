<!DOCTYPE html>
<html lang="zh-Hant">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>NOVA ERP｜營運總覽</title>
        <meta name="description" content="NOVA ERP 企業資源規劃系統營運總覽">

        @fonts
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div class="min-h-screen bg-[#f5f7fb] text-[#172033]">
            <x-erp.sidebar />

            <div class="lg:pl-[248px]">
                <x-erp.topbar />

                <main id="overview" class="mx-auto max-w-[1600px] px-5 py-6 sm:px-7 sm:py-8">
                    <x-erp.page-header />

                    <section class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="關鍵績效指標">
                        <x-erp.metric-card
                            label="本月營收"
                            value="NT$ 1,284,600"
                            detail-prefix="較上月"
                            detail-highlight="+ NT$ 145,800"
                            icon="revenue"
                            tone="green"
                            trend="12.8%"
                        />
                        <x-erp.metric-card
                            label="待收款"
                            value="NT$ 328,400"
                            detail-prefix="其中"
                            detail-highlight="NT$ 86,200 已逾期"
                            detail-highlight-tone="orange"
                            icon="invoice"
                            tone="orange"
                            tag="8 筆待追蹤"
                        />
                        <x-erp.metric-card
                            label="庫存總值"
                            value="NT$ 4,890,200"
                            detail-prefix="庫存健康度"
                            detail-highlight="93.6%"
                            detail-highlight-tone="blue"
                            icon="inventory"
                            tone="blue"
                            trend="6.4%"
                        />
                        <x-erp.metric-card
                            label="待處理訂單"
                            value="48"
                            detail-prefix="今日新增"
                            detail-highlight="+ 12 筆"
                            detail-highlight-tone="orange"
                            icon="orders"
                            tone="red"
                            tag="7 筆需關注"
                        />
                    </section>

                    <section class="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.42fr)_minmax(340px,0.78fr)]">
                        <x-erp.revenue-chart />
                        <x-erp.inventory-health />
                    </section>

                    <section class="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.42fr)_minmax(340px,0.78fr)]">
                        <x-erp.transactions />
                        <x-erp.tasks />
                    </section>

                    <footer class="flex flex-col gap-2 pb-2 pt-7 text-[10px] text-[#9aa5b5] sm:flex-row sm:items-center sm:justify-between"><span>© 2024 NOVA ERP · 企業營運管理平台</span><span class="inline-flex items-center gap-1.5"><i class="size-1.5 rounded-full bg-[#5bc891]"></i>資料同步於 5 分鐘前</span></footer>
                </main>
            </div>
        </div>

        <x-erp.toast />
    </body>
</html>
