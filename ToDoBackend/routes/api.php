<?php

use App\Http\Controllers\ToDoController;
use Illuminate\Support\Facades\Route;

Route::prefix('/to-do')->group(function() {
    Route::get('/', [ToDoController::class, 'index']);
    Route::post('/create', [ToDoController::class, 'store']);
    Route::get('/{id}', [ToDoController::class, 'show']);
    Route::put('/update/{id}', [ToDoController::class, 'update']);
    Route::delete('/delete/{id}', [ToDoController::class, 'destroy']);
    Route::put('/end/{id}', [ToDoController::class, 'end']);
});
