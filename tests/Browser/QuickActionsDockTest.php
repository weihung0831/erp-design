<?php

it('navigates to sales orders when clicking 新增銷貨單', function () {
    visit('/dashboard')
        ->click('[aria-label="新增銷貨單"]')
        ->assertPathIs('/dashboard/sales/orders')
        ->assertNoJavascriptErrors();
});

it('navigates to customers when clicking 新增客戶', function () {
    visit('/dashboard')
        ->click('[aria-label="新增客戶"]')
        ->assertPathIs('/dashboard/sales/customers')
        ->assertNoJavascriptErrors();
});

it('opens the print dialog when clicking 列印報表', function () {
    $page = visit('/dashboard');
    $page->script('() => { window.printCalled = false; window.print = () => { window.printCalled = true; }; }');

    $page->click('[aria-label="列印報表"]');

    expect($page->script('() => window.printCalled'))->toBeTrue();
});
