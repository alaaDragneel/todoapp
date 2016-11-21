<div class="alert alert-success" id="success" style="display: none;"></div>
<form action="{{ route('todolists.update', $todoList->id) }}">
  <input type="hidden" name="_method" id="_method" value="PUT">
  {{ csrf_field() }}
  <div class="form-group">
    <label for="" class="control-label">List Name</label>
    <input type="text" class="form-control input-lg" name="title" id="title" value="{{ $todoList->title }}">
    <input type="hidden" name="id" id="id" value="{{ $todoList->id }}">
  </div>
  <div class="form-group">
    <label for="" class="control-label">Description</label>
    <textarea rows="2" class="form-control" name="description" id="description">{{ $todoList->description }}</textarea>
  </div>
</form>
