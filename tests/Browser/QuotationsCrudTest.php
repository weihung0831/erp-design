<?php

use Pest\Browser\Api\AwaitableWebpage;

/** The quotation list, ready for interaction. */
function visitQuotations(): AwaitableWebpage
{
    return visitHydrated('/dashboard/sales/quotations');
}

it('creates a draft quotation from the new quotation form', function () {
    visitQuotations()
        ->click('新增報價單')
        ->click('#quotation-customer')
        ->click('[role="option"]:has-text("晨光文具")')
        ->click('#quotation-line-0-sku')
        ->click('[role="option"]:has-text("中性筆（盒）")')
        ->fill('#quotation-line-0-quantity', '10')
        ->click('建立報價單')
        ->assertSee('QT-0943')
        ->assertNoJavascriptErrors();
});

it('edits a draft quotation', function () {
    visitQuotations()
        ->click('QT-0942')
        ->click('編輯')
        ->fill('#quotation-note', '交期已確認，改報含安裝')
        ->click('儲存變更')
        ->assertSee('交期已確認，改報含安裝')
        ->assertNoJavascriptErrors();
});

it('deletes a draft quotation after confirmation', function () {
    visitQuotations()
        ->click('QT-0942')
        ->click('刪除')
        ->click('確認刪除')
        ->assertDontSee('QT-0942')
        ->assertNoJavascriptErrors();
});

it('does not offer edit or delete once a quotation is sent', function () {
    visitQuotations()
        ->click('QT-0941')
        ->assertSee('客戶接受')
        ->assertDontSee('編輯')
        ->assertDontSee('刪除');
});

it('edits a draft quotation from the list row', function () {
    visitQuotations()
        ->click('[aria-label="編輯 QT-0942"]')
        ->fill('#quotation-note', '從列表改的備註')
        ->click('儲存變更')
        ->assertSee('從列表改的備註')
        ->assertNoJavascriptErrors();
});

it('deletes a draft quotation from the list row after confirmation', function () {
    visitQuotations()
        ->click('[aria-label="刪除 QT-0942"]')
        ->click('[aria-label="確認刪除 QT-0942"]')
        ->assertDontSee('QT-0942')
        ->assertNoJavascriptErrors();
});

it('shows list row actions only for draft quotations', function () {
    visitQuotations()
        ->assertPresent('[aria-label="編輯 QT-0942"]')
        ->assertMissing('[aria-label="編輯 QT-0941"]')
        ->assertMissing('[aria-label="刪除 QT-0941"]');
});

it('returns to the list when the edit form opened from a list row is dismissed', function () {
    $page = visitQuotations()->click('[aria-label="編輯 QT-0942"]');

    $page->script('() => document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))');

    $page->assertDontSee('送出報價')
        ->assertNoJavascriptErrors();
});

it('keeps the form open when escape only closes an open dropdown', function () {
    visitQuotations()
        ->click('新增報價單')
        ->click('#quotation-customer')
        ->keys('[role="listbox"]', 'Escape')
        ->wait(0.5)
        ->assertMissing('[role="listbox"]')
        ->assertPresent('#quotation-form-title');
});

it('keeps the form open when an outside click only closes an open dropdown', function () {
    $page = visitQuotations()
        ->click('新增報價單')
        ->click('#quotation-customer');

    $page->script(<<<'JS'
        () => {
            document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
            document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        }
        JS);

    $page->wait(0.5)
        ->assertPresent('#quotation-form-title');
});

it('picks the validity date from the calendar popover', function () {
    visitQuotations()
        ->click('新增報價單')
        ->click('#quotation-valid-until')
        ->click('[data-day="2026-10-20"] button')
        ->assertSeeIn('#quotation-valid-until', '2026-10-20')
        ->assertPresent('#quotation-form-title');
});

it('does not allow a validity date before the quotation date', function () {
    visitQuotations()
        ->click('新增報價單')
        ->click('#quotation-valid-until')
        ->click('[aria-label="前往上個月"]')
        ->assertAttribute('[data-day="2026-09-27"] button', 'disabled', '');
});
