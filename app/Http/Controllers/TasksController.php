<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Task;
use App\TodoList;
use Carbon\Carbon;
class TasksController extends Controller
{
	public function store(Request $request, $todoListId)
	{
		$this->validate($request, [
			'title' => 'required'
		]);

		// get the todolist By id
		$todolist = TodoList::where('id', $todoListId)->first()->id;
		// store the task
		$task = new Task();
		$task->title = $request->title;
		$task->todo_list_id = $todolist;
		$task->save();
		// return the task Object
		return view('tasks.item', compact('task'));
	}

	public function update(Request $request, $todoListId, $id)
	{
		$task = Task::findOrFail($id);
		$task->compeleted_at = $request->completed === "true" ? Carbon::now() : NULL;
		$effectedRow = $task->update();
		echo $effectedRow;
	}

	public function destroy($todoListId, $id)
	{
		$task = Task::findOrFail($id);
		$task->delete();

		return $task;
	}
}
