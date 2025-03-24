<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EquipController;
use App\Http\Controllers\JocController;
use App\Http\Controllers\TorneigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PartidaController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //EQUIPS
    Route::get('/equips', [EquipController::class, 'list']);
    Route::match(['get', 'post'], '/equips', [EquipController::class, 'new']);
    Route::get('/equips/{id}', [EquipController::class, 'show']);
    Route::match(['get', 'post'], '/equips/{id}', [EquipController::class, 'edit']);
    Route::get('/equips/{id}', [EquipController::class, 'delete']);
    

    //USER
    Route::get('/users', [UserController::class, 'list']);
    Route::match(['get', 'post'], '/users', [UserController::class, 'new']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::match(['get', 'post'], '/users/{id}', [UserController::class, 'edit']);
    Route::get('/users/{id}', [UserController::class, 'delete']);

    //JOC
    Route::get('/jocs', [JocController::class, 'list']);
    Route::match(['get', 'post'], '/jocs', [JocController::class, 'new']);
    Route::get('/jocs/{id}', [JocController::class, 'show']);
    Route::match(['get', 'post'], '/jocs/{id}', [JocController::class, 'edit']);
    Route::get('/jocs/{id}', [JocController::class, 'delete']);
});

require __DIR__ . '/auth.php';
