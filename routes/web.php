<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome');
Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
Route::inertia('/dashboard/approvals', 'Approvals')->name('approvals');
Route::inertia('/dashboard/notifications', 'Notifications')->name('notifications');
Route::inertia('/dashboard/sales/quotations', 'Quotations')->name('sales.quotations');
Route::inertia('/dashboard/sales/orders', 'SalesOrders')->name('sales.orders');
Route::inertia('/dashboard/sales/shipments', 'Shipments')->name('sales.shipments');
Route::inertia('/dashboard/sales/customers', 'Customers')->name('sales.customers');
