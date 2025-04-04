<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EquipController;
use App\Http\Controllers\JocController;
use App\Http\Controllers\TorneigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\PremiController;
use App\Http\Controllers\TipusUsuariController;
use App\Http\Controllers\ModeDeJocController;


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
});

//EQUIPS
Route::get('/equips', [EquipController::class, 'list'])->name('equips_list');
Route::match(['get', 'post'], '/equip/new', [EquipController::class, 'new'])->name('equip_new');
Route::get('/equip/{id}', [EquipController::class, 'show'])->name('equip_show');
Route::match(['get', 'post'], '/equip/edit/{id}', [EquipController::class, 'edit'])->name('equip_edit');
Route::get('/equip/delete/{id}', [EquipController::class, 'delete'])->name('equip_delete');


//USER
Route::get('/users', [UserController::class, 'list'])->name('users_list');
Route::match(['get', 'post'], '/user/new', [UserController::class, 'new'])->name('user_new');
Route::get('/user/{id}', [UserController::class, 'show'])->name('equip_show');
Route::match(['get', 'post'], '/user/edit/{id}', [UserController::class, 'edit'])->name('user_edit');
Route::get('/user/delete/{id}', [UserController::class, 'delete'])->name('user_delete');

//JOC
Route::get('/jocs', [JocController::class, 'list'])->name('jocs_list');
Route::match(['get', 'post'], '/joc/new', [JocController::class, 'new'])->name('joc_new');
Route::get('/joc/{id}', [JocController::class, 'show'])->name('joc_show');
Route::match(['get', 'post'], '/jocs/edit/{id}', [JocController::class, 'edit'])->name('joc_edit');
Route::get('/joc/delete/{id}', [JocController::class, 'delete'])->name('joc_delete');

//MODEJOC
Route::get('/modejocs', [ModeDeJocController::class, 'list'])->name('modejocs_list');
Route::match(['get', 'post'], '/modejoc/new', [ModeDeJocController::class, 'new'])->name('modejoc_new');
Route::get('/modejoc/{id}', [ModeDeJocController::class, 'show'])->name('modejoc_show');
Route::match(['get', 'post'], '/modejoc/edit/{id}', [ModeDeJocController::class, 'edit'])->name('modejoc_edit');
Route::get('/modejoc/delete/{id}', [ModeDeJocController::class, 'delete'])->name('modejoc_delete');

//TORNEIG
Route::get('/torneigs', [TorneigController::class, 'list']) ->name('torneigs_list');
Route::match(['get', 'post'], '/torneig/new', [TorneigController::class, 'new'])->name('torneig_new');
Route::get('/torneig/{id}', [TorneigController::class, 'show'])->name('torneig_show');
Route::match(['get', 'post'], '/torneig/edit/{id}', [TorneigController::class, 'edit'])->name('torneig_edit');
Route::get('/torneig/delete/{id}', [TorneigController::class, 'delete'])->name('torneig_delete');

//PARTIDA
Route::get('/partides', [PartidaController::class, 'list'])->name('partides_list');
Route::match(['get', 'post'], '/partida/new', [PartidaController::class, 'new'])->name('partida_new');
Route::get('/partida/{id}', [PartidaController::class, 'show'])->name('partida_show');
Route::match(['get', 'post'], '/partida/edit/{id}', [PartidaController::class, 'edit'])->name('partida_edit');
Route::get('/partida/delete/{id}', [PartidaController::class, 'delete'])->name('partida_delete');

//PREMI
Route::get('/premis', [PremiController::class, 'list'])->name('premis_list');
Route::match(['get', 'post'], '/premi/new', [PremiController::class, 'new'])->name('premi_new');
Route::get('/premi/{id}', [PremiController::class, 'show'])->name('premi_show');
Route::match(['get', 'post'], '/premi/edit/{id}', [PremiController::class, 'edit'])->name('premi_edit');
Route::get('/premi/delete/{id}', [PremiController::class, 'delete'])->name('premi_delete');

//TIPUS USUARI
Route::get('/tipus_usuari', [TipusUsuariController::class, 'list'])->name('tipus_usuari_list');
Route::match(['get', 'post'], '/tipus_usuari/new', [TipusUsuariController::class, 'new'])->name('tipus_usuari_new');
Route::get('/tipus_usuari/{id}', [TipusUsuariController::class, 'show'])->name('tipus_usuari_show');
Route::match(['get', 'post'], '/tipus_usuari/edit/{id}', [TipusUsuariController::class, 'edit'])->name('tipus_usuari_edit');
Route::get('/tipus_usuari/delete/{id}', [TipusUsuariController::class, 'delete'])->name('tipus_usuari_delete');


Route::middleware('auth')->group(function () {
    // Ruta para editar el perfil (mostrar formulario)
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Ruta para actualizar el perfil y la foto
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Ruta para eliminar la cuenta del usuario
    Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->name('profile.delete');
});
require __DIR__ . '/auth.php';