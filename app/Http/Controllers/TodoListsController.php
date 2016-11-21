<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\TodoList;
class TodoListsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
         $todoLists = \Auth::user()
                    ->todo()
                    ->orderBy('updated_at', 'DESC')
                    ->get();
        return view('todolists.index', compact('todoLists'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      return view('todolists.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $this->validate($request,[
        'title' => 'required|min:5',
        'description' => 'min:5',
      ]);

      $todoList = \Auth::user()->todo()->create($request->all());

      return view("todolists.item", compact('todoList'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
      $todoList = TodoList::where('id', $id)->first();
      return view('todolists.updateform', compact('todoList'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $this->validate($request,[
        'title' => 'required|min:5',
        'description' => 'min:5',
      ]);

      $todoList = \Auth::user()->todo()->findOrFail($id);
      $todoList->update($request->all());
      return view("todolists.item", compact('todoList'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $todoList = TodoList::findOrFail($id);
      $todoList->delete();

      return $todoList;
    }
}
