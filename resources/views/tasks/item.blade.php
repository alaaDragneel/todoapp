<tr class="task-item-head" id="task-{{ $task->id }}">
     <td>
          <input type="checkbox" data-url="{{ route('todolists.tasks.update', [$task->todo->id, $task->id]) }}" {{ !$task->compeleted ?: 'checked'}} class="check-item">
     </td>
     <td  class="task-item {{ !$task->compeleted  ?: 'done'}}">
          {{ $task->title }}
          <div class="row-buttons">
               <a href="{{ route('todolists.tasks.destroy', [$task->todo->id, $task->id]) }}"
                    class="btn btn-xs btn-danger remove-task-btn">
                    <i class="glyphicon glyphicon-remove"></i>
               </a>
          </div>
     </td>
</tr>
