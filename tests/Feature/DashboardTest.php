<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the dashboard page renders the dashboard inertia page', function () {
    $this->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Dashboard'));
});
