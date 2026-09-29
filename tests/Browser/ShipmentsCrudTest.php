<?php

it('creates a shipment from an order that is being prepared', function () {
    visitHydrated('/dashboard/sales/shipments')
        ->click('新增出貨單')
        ->click('#shipment-order')
        ->click('[role="option"]:has-text("SO-1881")')
        ->click('#shipment-carrier')
        ->click('[role="option"]:has-text("黑貓宅急便")')
        ->click('建立出貨單')
        ->assertSee('SH-0562')
        ->assertNoJavascriptErrors();
});

it('edits a shipment waiting to be picked from the list row', function () {
    visitHydrated('/dashboard/sales/shipments')
        ->click('[aria-label="編輯 SH-0561"]')
        ->fill('#shipment-note', '改由後門卸貨')
        ->click('儲存變更')
        ->assertSee('改由後門卸貨')
        ->assertNoJavascriptErrors();
});

it('deletes a shipment waiting to be picked from the list row after confirmation', function () {
    visitHydrated('/dashboard/sales/shipments')
        ->click('[aria-label="刪除 SH-0561"]')
        ->click('[aria-label="確認刪除 SH-0561"]')
        ->assertDontSee('SH-0561')
        ->assertNoJavascriptErrors();
});

it('shows list row actions only for shipments waiting to be picked', function () {
    visitHydrated('/dashboard/sales/shipments')
        ->assertPresent('[aria-label="編輯 SH-0561"]')
        ->assertMissing('[aria-label="編輯 SH-0560"]')
        ->assertMissing('[aria-label="刪除 SH-0560"]');
});
