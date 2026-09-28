<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the notifications page renders the notifications inertia page', function () {
    $this->get('/dashboard/notifications')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Notifications'));
});
