<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the shipments page renders the shipments inertia page', function () {
    $this->get('/dashboard/sales/shipments')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Shipments'));
});
