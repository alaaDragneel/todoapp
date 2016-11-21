<?php

use Illuminate\Database\Seeder;

class TodoListTableSeeder extends Seeder
{
  /**
  * Run the database seeds.
  *
  * @return void
  */
  public function run()
  {
    DB::statement('SET FOREIGN_KEY_CHECKS=0');
    DB::table('tasks')->truncate();

    DB::table('todo_lists')->truncate();

    $todoLists = [];
    $tasks = [];
    for ($i=0; $i < 10; $i++) {
      $todoLists[] = [
        'title' => "Todo list {$i}",
        'description' => "Todo List Description {$i}",
        'user_id' => rand(1,2)
      ];

      for ($j=1; $j < rand(1,5); $j++) {
        $tasks[] = [
          'todo_list_id' => $i,
          'title' => "task {$j} for todo list {$i}",
          'compeleted_at' => rand(0,1) == 0 ? NULL : DB::raw('CURRENT_TIMESTAMP'),
        ];
      }
    }

    DB::table('todo_lists')->insert($todoLists);

    DB::table('tasks')->insert($tasks);
  }
}
