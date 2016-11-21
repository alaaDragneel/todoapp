<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable = ['title', 'todo_list_id', 'compeleted_at'];

  public function todo()
  {
    return $this->belongsTo(TodoList::class);
  }
  public function getCompeletedAttribute()
  {
    return !is_null($this->compeleted_at);
  }
}
