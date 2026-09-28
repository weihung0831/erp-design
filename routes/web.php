<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome');
Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
Route::inertia('/dashboard/approvals', 'Approvals')->name('approvals');
Route::inertia('/dashboard/notifications', 'Notifications')->name('notifications');
