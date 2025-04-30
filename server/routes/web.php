<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EquipController;
use App\Http\Controllers\JocController;
use App\Http\Controllers\MapaController;
use App\Http\Controllers\TorneigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\PremiController;
use App\Http\Controllers\TipusUsuariController;
use App\Http\Controllers\ModeDeJocController;
use Illuminate\Support\Facades\File;


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
 Route::get('/equips', [EquipController::class, 'list'])->name('equips_list')->middleware();
 Route::post( '/equip/new', [EquipController::class, 'new'])->name('equip_new');
 Route::get('/equip/{id}', action: [EquipController::class, 'show'])->name('equip_show');
 Route::match(['get', 'post'], '/equip/edit/{id}', [EquipController::class, 'edit'])->name('equip_edit');
 Route::get('/equip/delete/{id}', [EquipController::class, 'delete'])->name('equip_delete');
 Route::get('/classification/individual', [EquipController::class, 'getIndividual']);
 Route::get('/classification/collectiu', [EquipController::class, 'getCollective']);

Route::get('/api/equips', [EquipController::class, 'list'])->name('equips_list')->middleware();
Route::post( '/api/equip/new', [EquipController::class, 'new'])->name('equip_new');
Route::get('/api/equip/{id}', [EquipController::class, 'show'])->name('equip_show');
Route::match(['get', 'post'], '/api/equip/edit/{id}', [EquipController::class, 'edit'])->name('equip_edit');
Route::get('/api/equip/delete/{id}', [EquipController::class, 'delete'])->name('equip_delete');
Route::get('/api/classification/individual', [EquipController::class, 'getIndividual']);
Route::get('/api/classification/collectiu', [EquipController::class, 'getCollective']);

//USER
Route::get('/api/users', [UserController::class, 'list'])->name('users_list');
Route::post( '/api/user/new', [UserController::class, 'new'])->name('user_new');
Route::get('/api/user/{id}', [UserController::class, 'show'])->name('equip_show');
Route::match(['get', 'post'], '/api/user/edit/{id}', [UserController::class, 'edit'])->name('user_edit');
Route::get('/api/user/delete/{id}', [UserController::class, 'delete'])->name('user_delete');

//JOC
Route::get('/api/jocs', [JocController::class, 'list'])->name('jocs_list');
Route::post( '/api/joc/new', [JocController::class, 'new'])->name('joc_new');
Route::get('/api/joc/{id}', [JocController::class, 'show'])->name('joc_show');
Route::match(['get', 'post'], '/api/jocs/edit/{id}', [JocController::class, 'edit'])->name('joc_edit');
Route::get('/api/joc/delete/{id}', [JocController::class, 'delete'])->name('joc_delete');

//MODEJOC
Route::get('/api/modejocs', [ModeDeJocController::class, 'list'])->name('modejocs_list');
Route::post( '/api/modejoc/new', [ModeDeJocController::class, 'new'])->name('modejoc_new');
Route::get('/api/modejoc/{id}', [ModeDeJocController::class, 'show'])->name('modejoc_show');
Route::match(['get', 'post'], '/api/modejoc/edit/{id}', [ModeDeJocController::class, 'edit'])->name('modejoc_edit');
Route::get('/api/modejoc/delete/{id}', [ModeDeJocController::class, 'delete'])->name('modejoc_delete');

//TORNEIG
Route::get('/api/torneigs', [TorneigController::class, 'list'])->name('torneigs_list');
Route::post('/api/torneig/new', [TorneigController::class, 'new'])->name('torneig_new');
Route::get('/api/torneig/{id}', [TorneigController::class, 'show'])->name('torneig_show');
Route::match(['get', 'post'], '/api/torneig/edit/{id}', [TorneigController::class, 'edit'])->name('torneig_edit');
Route::get('/api/torneig/delete/{id}', [TorneigController::class, 'delete'])->name('torneig_delete');


//PARTIDA
Route::get('/api/partides', [PartidaController::class, 'list'])->name('partides_list');
Route::post( '/api/partida/new', [PartidaController::class, 'new'])->name('partida_new');
Route::get('/api/partida/{id}', [PartidaController::class, 'show'])->name('partida_show');
Route::match(['get', 'post'], '/api/partida/edit/{id}', [PartidaController::class, 'edit'])->name('partida_edit');
Route::get('/api/partida/delete/{id}', [PartidaController::class, 'delete'])->name('partida_delete');

//PREMI
Route::get('/api/premis', [PremiController::class, 'list'])->name('premis_list');
Route::post( '/api/premi/new', [PremiController::class, 'new'])->name('premi_new');
Route::get('/api/premi/{id}', [PremiController::class, 'show'])->name('premi_show');
Route::match(['get', 'post'], '/api/premi/edit/{id}', [PremiController::class, 'edit'])->name('premi_edit');
Route::get('/api/premi/delete/{id}', [PremiController::class, 'delete'])->name('premi_delete');

//TIPUS USUARI
Route::get('/api/tipus_usuari', [TipusUsuariController::class, 'list'])->name('tipus_usuari_list');
Route::post( '/api/tipus_usuari/new', [TipusUsuariController::class, 'new'])->name('tipus_usuari_new');
Route::get('/api/tipus_usuari/{id}', [TipusUsuariController::class, 'show'])->name('tipus_usuari_show');
Route::match(['get', 'post'], '/api/tipus_usuari/edit/{id}', [TipusUsuariController::class, 'edit'])->name('tipus_usuari_edit');
Route::get('/api/tipus_usuari/delete/{id}', [TipusUsuariController::class, 'delete'])->name('tipus_usuari_delete');

//MAPA
Route::get('/api/mapas', [MapaController::class, 'list'])->name('mapas_list');


Route::get('/api/images', function () {
    $directory = public_path('uploads/fotoJocs');
    $files = File::files($directory);

    $images = array_map(function ($file) {
        return $file->getFilename();
    }, $files);

    return response()->json($images);
});


Route::middleware('auth')->group(function () {
    // Ruta para editar el perfil (mostrar formulario)
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    // Ruta para actualizar el perfil y la foto
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Ruta para eliminar la cuenta del usuario
    Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->name('profile.delete');
});
require __DIR__ . '/auth.php';
