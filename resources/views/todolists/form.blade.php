<div class="alert alert-success" id="success" style="display: none;"></div>
<form action="{{ route('todolists.store') }}" method="post">
  {{ csrf_field() }}
  <div class="form-group">
    <label for="" class="control-label">List Name</label>
    <input type="text" class="form-control input-lg" name="title" id="title">
  </div>
  <div class="form-group">
    <label for="" class="control-label">Description</label>
    <textarea rows="2" class="form-control" name="description" id="description"></textarea>
  </div>
</form>
