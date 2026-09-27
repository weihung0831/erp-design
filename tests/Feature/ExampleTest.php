<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the home page renders the welcome inertia page', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Welcome'));
});
