<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the customers page renders the customers inertia page', function () {
    $this->get('/dashboard/sales/customers')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Customers'));
});
