<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the sales orders page renders the sales orders inertia page', function () {
    $this->get('/dashboard/sales/orders')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('SalesOrders'));
});
