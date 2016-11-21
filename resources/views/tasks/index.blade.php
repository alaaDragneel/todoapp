@foreach ($tasks as $task)
  <tr class="task-item-head" id="task-{{ $task->id }}">
    <td>
      <input type="checkbox" {{ !$task->compeleted ?: 'checked'}} class="check-item">
    </td>
    <td  class="task-item {{ !$task->compeleted  ?: 'done'}}">
      {{ $task->title }}
      <div class="row-buttons">
        <a href="#" class="btn btn-xs btn-danger">
          <i class="glyphicon glyphicon-remove"></i>
        </a>
      </div>
    </td>
  </tr>
@endforeach
