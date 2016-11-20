@extends('layouts.main')

@section('content')

         <!-- Header -->
         <header>
             <div class="container">
                 <div class="row">
                     <div class="col-md-8 col-md-offset-2">
                         <div class="clearfix">
                             <div class="pull-left">
                                 <h1 class="header-title">Todo List</h1>
                             </div>
                             <div class="pull-right">
                                 <a href="{{ route('todolists.create') }}" class="btn btn-success show-todolist-modal">Create New List</a>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </header>
         <!-- Main Container -->
         <div class="container">
             <div class="row">
                 <div class="col-md-8 col-md-offset-2">
                      <?php $count = $todoLists->count(); ?>
                      <div class="alert alert-warning {{$count ? 'hidden' : ''}}" id="no-record-alert">
                           No Records Found
                      </div>
                     <div class="panel panel-default {{!$count ? 'hidden' : ''}}">
                          <ul class="list-group" id="todo-list">
                               @foreach($todoLists as $todoList)
                                    @include('todolists.item', ['todoList' => $todoList])
                               @endforeach
                         </ul>

                         <div class="panel-footer">
                             <small><span id="todo-list-counter">{{ $count }}</span> <span>{{ $count > 1 ? 'list items' : 'list item' }}</span> </small>
                         </div>
                     </div>
                 </div>

                 @include('todolists.todolistModal')

                 @include('todolists.taskModal')
             </div>
         </div>

@endsection
