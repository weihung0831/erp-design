<aside id="erp-sidebar" class="erp-sidebar fixed inset-y-0 left-0 z-50 flex w-[248px] -translate-x-full flex-col overflow-y-auto bg-[#101a2d] text-white transition-transform duration-300 lg:translate-x-0">
    <div class="flex min-h-full flex-col px-4 py-5">
        <div class="flex items-center gap-3 px-3">
            <div class="relative flex size-10 items-center justify-center overflow-hidden rounded-[13px] bg-[#8df0c1] text-[#102038] shadow-[0_8px_24px_rgba(141,240,193,0.18)]">
                <span class="absolute -right-1 -top-1 size-5 rounded-full bg-[#d9ff65]"></span>
                <svg class="relative size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.8 7.6 12 4.5l5.2 3.1v8.8L12 19.5l-5.2-3.1V7.6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m7.1 7.7 4.9 2.9 4.9-2.9M12 10.7v8.4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            </div>
            <div>
                <p class="text-[17px] font-semibold tracking-[0.18em] text-white">NOVA</p>
                <p class="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8190a9]">ERP operating system</p>
            </div>
        </div>

        <div class="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <p class="px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#75849e]">目前工作區</p>
            <button type="button" class="mt-2 flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left transition hover:bg-white/[0.06]" aria-label="切換工作區">
                <span class="flex size-8 items-center justify-center rounded-lg bg-[#304260] text-xs font-bold text-[#a6f5d0]">TW</span>
                <span class="min-w-0 flex-1"><span class="block truncate text-sm font-medium text-white">NOVA Taiwan</span><span class="mt-0.5 block truncate text-[11px] text-[#8190a9]">總部 · 台北</span></span>
                <svg class="size-4 text-[#8190a9]" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>

        <nav class="mt-8 flex-1" aria-label="主要功能">
            <p class="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#687892]">主要功能</p>
            <div class="mt-3 space-y-1">
                <a href="#overview" class="sidebar-link sidebar-link-active group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg><span class="flex-1">營運總覽</span><span class="size-1.5 rounded-full bg-[#9af4c7]"></span></a>
                <a href="#sales" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V9.5M12 19V5M19 19v-7.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="m5 7 7-3 7 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="flex-1">銷售管理</span><span class="sidebar-count">12</span></a>
                <a href="#procurement" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6.5h16M6.5 6.5v11A1.5 1.5 0 0 0 8 19h8a1.5 1.5 0 0 0 1.5-1.5v-11M9 10h6M9 14h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="flex-1">採購管理</span><span class="sidebar-count sidebar-count-alert">5</span></a>
                <a href="#inventory" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3.5 8 4.25v8.5l-8 4.25-8-4.25v-8.5L12 3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m4.5 7.75 7.5 4 7.5-4M12 11.75v8.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg><span class="flex-1">庫存管理</span><span class="sidebar-count sidebar-count-alert">3</span></a>
            </div>

            <p class="mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#687892]">支援與設定</p>
            <div class="mt-3 space-y-1">
                <a href="#finance" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 9h8M8 13h3M16 13h.01M8 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="flex-1">財務與會計</span></a>
                <a href="#team" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 19v-1.2a3.8 3.8 0 0 0-3.8-3.8H7.8A3.8 3.8 0 0 0 4 17.8V19M10 10.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM15 4.5a3.2 3.2 0 0 1 0 6.2M16.2 14h.8a3 3 0 0 1 3 3v1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span class="flex-1">團隊與權限</span></a>
                <a href="#settings" class="sidebar-link group"><svg class="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" stroke-width="1.7"/><path d="m19.1 13.6 1.2.9-1.8 3.1-1.4-.6a7.4 7.4 0 0 1-1.9 1.1l-.2 1.5h-3.6l-.2-1.5a7.4 7.4 0 0 1-1.9-1.1l-1.4.6-1.8-3.1 1.2-.9a7 7 0 0 1 0-2.2l-1.2-.9 1.8-3.1 1.4.6a7.4 7.4 0 0 1 1.9-1.1l.2-1.5H15l.2 1.5a7.4 7.4 0 0 1 1.9 1.1l1.4-.6 1.8 3.1-1.2.9a7 7 0 0 1 0 2.2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg><span class="flex-1">系統設定</span></a>
            </div>
        </nav>

        <div class="mt-8 rounded-2xl border border-[#8df0c1]/20 bg-[#183247] p-4">
            <div class="flex items-start justify-between gap-3"><div><p class="text-xs font-semibold text-white">本月營運目標</p><p class="mt-1 text-[11px] leading-5 text-[#91a9b4]">距離達標還有 18%</p></div><span class="rounded-full bg-[#8df0c1]/15 px-2 py-1 text-[10px] font-semibold text-[#9af4c7]">82%</span></div>
            <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div class="h-full w-[82%] rounded-full bg-[#8df0c1]"></div></div>
            <p class="mt-2 text-[10px] text-[#91a9b4]">NT$ 1.64M / NT$ 2.00M</p>
        </div>

        <div class="mt-4 flex items-center gap-3 border-t border-white/10 px-2 pt-4">
            <div class="flex size-9 items-center justify-center rounded-full bg-[#f1c7aa] text-xs font-bold text-[#5c342b]">YC</div>
            <div class="min-w-0 flex-1"><p class="truncate text-xs font-semibold text-white">Yvonne Chen</p><p class="mt-0.5 truncate text-[10px] text-[#8190a9]">營運管理員</p></div>
            <button type="button" class="text-[#8190a9] transition hover:text-white" aria-label="開啟個人選單"><svg class="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 4 13.5 10l-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
    </div>
</aside>

<div id="sidebar-overlay" class="fixed inset-0 z-40 hidden bg-[#0b1322]/50 backdrop-blur-[2px] lg:hidden"></div>
