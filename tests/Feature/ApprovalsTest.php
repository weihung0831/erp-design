<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the approvals page renders the approvals inertia page', function () {
    $this->get('/dashboard/approvals')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Approvals'));
});
