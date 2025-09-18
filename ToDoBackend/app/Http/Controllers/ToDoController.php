<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tarea = Tarea::all();
        return response()->json($tarea, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'estado' => 'nullable|boolean',
            'priority' => 'required|integer|min:1|max:5',
            'dueDate' => 'required|date'

        ]);

        $tarea = Tarea::create([
            'title' => $request->title,
            'description' => $request->description,
            'estado' => $request->estado ?? false,
            'priority' => $request->priority ?? 3,
            'dueDate' => $request->dueDate
        ]);

        return response()->json([
            'messaje' => 'Tarea creada exitosamente',
            'tarea' => $tarea
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $tarea = Tarea::find($id);

        if(!$tarea){
            return response()->json($tarea, 200);
        } else {
            return response()->json(['messaje', 'Tarea no encontrada'], 404);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return response()->json([
                'message' => 'Tarea no encontrada'
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'estado' => 'nullable|boolean',
            'priority' => 'nullable|integer|min:1|max:5',
            'dueDate' => 'required|date'
        ]);

        $tarea->update([
            'title' => $request->title,
            'description' => $request->description,
            'estado' => $request->estado,
            'priority' => $request->priority,
            'dueDate' => $request->dueDate,
        ]);

        return response()->json([
            'message' => 'Tarea actualizada con éxito'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tarea = Tarea::find($id);

        if($tarea){
            $tarea->delete();
            return response()->json(['message' => 'Tarea eliminada exitosamente' ], 200);
        } else {
            return response()->json(['messaje', 'Tarea no encontrada'], 404);
        }
    }

    public function end(Request $request, string $id)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $estado = $request->input('estado');

        $tarea->estado = $estado;
        $tarea->save();

        return response()->json(['message' => 'Tarea marcada como ' . ($estado ? 'terminada' : 'pendiente')], 200);
    }
}
