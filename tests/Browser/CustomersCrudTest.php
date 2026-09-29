<?php

use Pest\Browser\Api\AwaitableWebpage;

/** Opens the customer list and adds 遠東測試 as customer C-0053. */
function createTestCustomer(): AwaitableWebpage
{
    return visitHydrated('/dashboard/sales/customers')
        ->click('新增客戶')
        ->fill('#customer-name', '遠東測試')
        ->fill('#customer-tax-id', '12345678')
        ->fill('#customer-contact', '劉先生')
        ->fill('#customer-phone', '02-2345-6789')
        ->fill('#customer-credit-limit', '500000')
        ->click('建立客戶');
}

it('creates a customer from the new customer form', function () {
    createTestCustomer()
        ->assertSee('C-0053')
        ->assertNoJavascriptErrors();
});

it('edits a customer from the list row', function () {
    visitHydrated('/dashboard/sales/customers')
        ->click('[aria-label="編輯 C-0012"]')
        ->fill('#customer-phone', '02-2711-9999')
        ->click('儲存變更')
        ->assertSee('02-2711-9999')
        ->assertNoJavascriptErrors();
});

it('deletes a customer without orders or receivables after confirmation', function () {
    createTestCustomer()
        ->click('[aria-label="刪除 C-0053"]')
        ->click('[aria-label="確認刪除 C-0053"]')
        ->assertDontSee('C-0053')
        ->assertNoJavascriptErrors();
});

it('does not offer delete for a customer that has orders', function () {
    visitHydrated('/dashboard/sales/customers')
        ->click('[aria-label="下一頁"]')
        ->assertPresent('[aria-label="編輯 C-0046"]')
        ->assertMissing('[aria-label="刪除 C-0046"]');
});
