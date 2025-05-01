<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassificacioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EquipController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JocController;
use App\Http\Controllers\ModeDeJocController;
use App\Http\Controllers\TorneigController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\PremiController;
use App\Http\Controllers\TipusUsuariController;
use App\Http\Controllers\MapaController;
use App\Http\Controllers\EquipUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//RUTAS APP

//AUTENTICACIÓN
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::delete('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//EQUIPS
Route::get('/equips', [EquipController::class, 'list'])->name('equips_list');
Route::post('/equip/new', [EquipController::class, 'new'])->name('equip_new');
Route::get('/equip/{id}', [EquipController::class, 'show'])->name('equip_show');
Route::match(['get', 'post'], '/equip/edit/{id}', [EquipController::class, 'edit'])->name('equip_edit');
Route::get('/equip/delete/{id}', [EquipController::class, 'delete'])->name('equip_delete');

//CLASSIFICACIO
Route::get('/classification/individual', [ClassificacioController::class, 'getIndividual'])->name('classificacio-individual');
Route::get('/classification/collectiu', [ClassificacioController::class, 'getCollective'])->name('classificacio-colectiva');

//EQUIP-USER
Route::get('/equips/users', [EquipUserController::class, 'listEquipsWithUsers'])->name('equip-users_list');

//USER
Route::get('/users', [UserController::class, 'list'])->name('users_list');
// Route::post('/user/new', [UserController::class, 'new'])->name('user_new');
Route::get('/user/{id}', [UserController::class, 'show'])->name('user_show');
Route::match(['get', 'post'], '/user/edit/{id}', [UserController::class, 'edit'])->name('user_edit');
Route::get('/user/delete/{id}', [UserController::class, 'delete'])->name('user_delete');

//JOC
Route::get('/jocs', [JocController::class, 'list'])->name('jocs_list');
Route::post('/joc/new', [JocController::class, 'new'])->name('joc_new');
Route::get('/joc/{id}', [JocController::class, 'show'])->name('joc_show');
Route::match(['get', 'post'], '/joc/edit/{id}', [JocController::class, 'edit'])->name('joc_edit');
Route::get('/joc/delete/{id}', [JocController::class, 'delete'])->name('joc_delete');

//MODEJOC
Route::get('/modejocs', [ModeDeJocController::class, 'list'])->name('modejocs_list');
Route::post('/modejoc/new', [ModeDeJocController::class, 'new'])->name('modejoc_new');
Route::get('/modejoc/{id}', [ModeDeJocController::class, 'show'])->name('modejoc_show');
Route::match(['get', 'post'], '/modejoc/edit/{id}', [ModeDeJocController::class, 'edit'])->name('modejoc_edit');
Route::get('/modejoc/delete/{id}', [ModeDeJocController::class, 'delete'])->name('modejoc_delete');

//TORNEIG
Route::get('/torneigs', [TorneigController::class, 'list']) ->name('torneigs_list');
Route::post('/torneig/new', [TorneigController::class, 'new'])->name('torneig_new');
Route::get('/torneig/{id}', [TorneigController::class, 'show'])->name('torneig_show');
Route::match(['get', 'post'], '/torneig/edit/{id}', [TorneigController::class, 'edit'])->name('torneig_edit');
Route::get('/torneig/delete/{id}', [TorneigController::class, 'delete'])->name('torneig_delete');

//PARTIDA
Route::get('/partides', [PartidaController::class, 'list'])->name('partides_list');
Route::post('/partida/new', [PartidaController::class, 'new'])->name('partida_new');
Route::get('/partida/{id}', [PartidaController::class, 'show'])->name('partida_show');
Route::get('/partida/delete/{id}', [PartidaController::class, 'delete'])->name('partida_delete');

//PREMI
Route::get('/premis', [PremiController::class, 'list'])->name('premis_list');
Route::post('/premi/new', [PremiController::class, 'new'])->name('premi_new');
Route::get('/premi/{id}', [PremiController::class, 'show'])->name('premi_show');
Route::get('/premi/delete/{id}', [PremiController::class, 'delete'])->name('premi_delete');

//TIPUS USUARI
// Route::get('/api/tipus_usuari', [TipusUsuariController::class, 'list'])->name('tipus_usuari_list');
// Route::match(['get', 'post'], '/api/tipus_usuari/new', [TipusUsuariController::class, 'new'])->name('tipus_usuari_new');
// Route::get('/api/tipus_usuari/{id}', [TipusUsuariController::class, 'show'])->name('tipus_usuari_show');
// Route::match(['get', 'post'], '/api/tipus_usuari/edit/{id}', [TipusUsuariController::class, 'edit'])->name('tipus_usuari_edit');
// Route::get('/api/tipus_usuari/delete/{id}', [TipusUsuariController::class, 'delete'])->name('tipus_usuari_delete');

//MAPA
Route::get('/mapas', [MapaController::class, 'list'])->name('mapas_list');
Route::post('/mapa/new', [MapaController::class, 'new'])->name('mapa_new');
Route::get('/mapa/delete/{id}', [MapaController::class, 'delete'])->name('mapa_delete');
