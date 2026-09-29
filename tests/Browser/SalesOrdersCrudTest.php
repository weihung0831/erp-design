<?php

it('creates a pending sales order from the new order form', function () {
    visitHydrated('/dashboard/sales/orders')
        ->click('新增銷貨訂單')
        ->click('#order-customer')
        ->click('[role="option"]:has-text("晨光文具")')
        ->click('#order-line-0-sku')
        ->click('[role="option"]:has-text("中性筆（盒）")')
        ->fill('#order-line-0-quantity', '10')
        ->click('建立訂單')
        ->assertSee('SO-1883')
        ->assertNoJavascriptErrors();
});

it('edits a pending sales order from the list row', function () {
    visitHydrated('/dashboard/sales/orders')
        ->click('[aria-label="編輯 SO-1879"]')
        ->fill('#order-note', '客戶要求提前到 10/01 交貨')
        ->click('儲存變更')
        ->assertSee('客戶要求提前到 10/01 交貨')
        ->assertNoJavascriptErrors();
});

it('deletes a pending sales order from the list row after confirmation', function () {
    visitHydrated('/dashboard/sales/orders')
        ->click('[aria-label="刪除 SO-1879"]')
        ->click('[aria-label="確認刪除 SO-1879"]')
        ->assertDontSee('SO-1879')
        ->assertNoJavascriptErrors();
});

it('shows list row actions only for pending sales orders', function () {
    visitHydrated('/dashboard/sales/orders')
        ->assertPresent('[aria-label="編輯 SO-1879"]')
        ->assertMissing('[aria-label="編輯 SO-1881"]')
        ->assertMissing('[aria-label="刪除 SO-1881"]');
});
