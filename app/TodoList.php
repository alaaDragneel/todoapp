<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    public function user()
    {
    		return $this->belongsTo(User::class);
    }

    protected $fillable = ['title', 'description', 'user_id'];
}
