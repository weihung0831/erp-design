<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the quotations page renders the quotations inertia page', function () {
    $this->get('/dashboard/sales/quotations')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Quotations'));
});
