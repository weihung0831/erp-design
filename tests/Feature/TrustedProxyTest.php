<?php

test('requests forwarded as https by the reverse proxy are treated as secure', function () {
    $this->withServerVariables(['REMOTE_ADDR' => '172.18.0.5'])
        ->withHeaders(['X-Forwarded-Proto' => 'https', 'X-Forwarded-Host' => 'erp-design.weihung.xyz'])
        ->get('/')
        ->assertOk();

    expect(request()->isSecure())->toBeTrue()
        ->and(url('/'))->toBe('https://erp-design.weihung.xyz');
});
