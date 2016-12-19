$(document).ready(function() {
  $('body').on('click', '.show-todolist-modal' ,function(event) {
    event.preventDefault();
    var elm = $(this),
    url = elm.attr('href'),
    title = elm.attr('title');
    $('#todo-list-title').text(title);
    $('#todo-list-save-btn').text(elm.hasClass('edit') ? 'Update' : 'Create');
    $.ajax({
      url: url,
      dataType: 'html',
      success: function(msg) {
        $('#todo-list-body').html(msg);
      },
    });
    $('#todolist-modal').modal('show');
  });

  function showMessage(msg){
    $('#success').text(msg).fadeTo(1000, 500).slideUp(500, function(){
      $(this).hide();
    });
  }

  function showNorRecordMessage(total){
    if (total > 0) {
      $('#todo-list').closest('.panel').removeClass('hidden');
      $('#no-record-alert').addClass('hidden');
    } else {
      $('#todo-list').closest('.panel').addClass('hidden');
      $('#no-record-alert').removeClass('hidden');
    }
  }

  function updateTodoListCounter() {
    var total = $('.list-group-item').length;
    $('#todo-list-counter').text(total).next().text(total > 1 ? "records" : "record");

    showNorRecordMessage(total);
  }

  $('#todolist-modal').on('keypress', ":input:not(textarea)", function() {
    return event.keyCode != 13;
  });

  $('#todo-list-save-btn').click(function(event) {
    event.preventDefault();
    var form = $('#todo-list-body form');
    url = form.attr('action'),
    method = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT';
    // reset the error messages
    form.find('.help-block').remove();
    form.find('.has-error').removeClass('.has-error');
    $.ajax({
      url: url,
      method: method,
      data: form.serialize(),
      success: function(msg) {
        if (method == 'POST') {
          $('#todo-list').prepend(msg);
          showMessage('the todo list addedd successfully');
          form.trigger('reset');
          $('#title').focus();
          updateTodoListCounter();
        } else {
          showMessage('the todo list updated successfully');
          var id = $('input[name=id]').val();
          if (id) {
            $('#todo-list-' + id).replaceWith(msg);
          }
          $('.editTodolist-modal').modal('hide');
        }
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;
        if($.isEmptyObject(errors) == false) {
          $.each(errors, function(key, value){
            $('#' + key)
            .closest('.form-group')
            .addClass('has-error')
            .append("<span class='help-block'><strong>"+ value +"</strong></span>")
          });
        }
      },
    });
  });

  $('body').on('click', '.show-confirm-modal' ,function(event) {
    event.preventDefault();

    var elm = $(this),
    title = elm.data('title'),
    action = elm.attr('href');

    $('#confirm-body form').attr('action', action);
    $('#successDelete').show().html('are you Sure form delete <strong>'+ title +'</strong> Fucker!');

    $('#confirm-modal').modal('show');
  });

  $('#confirm-remove-btn').click(function(event) {
    event.preventDefault();

    var form = $('#confirm-body form'),
    url = form.attr('action');

    $.ajax({
      url: url,
      method: 'DELETE',
      data: form.serialize(),
      success: function(msg) {
        $('#confirm-modal').modal('hide');

        $('#todo-list-' + msg.id).slideUp(500, function() {
          $(this).remove();
          updateTodoListCounter();
          $('#no-record-alert').after('<div class="alert alert-success">the todolist deleted successfully</div>');
          $('.alert-success').delay(500).slideUp(500);
        });
      },
    });
  });

  function countActiveTasks() {
    var total = $('tr.task-item-head:not(:has(td.done))').length;

    $('#active-task-counter').text(total + ' ' + (total > 1 ? 'tasks' : 'task') + ' left');
  }

  $('body').on('click', '.show-task-modal', function(event) {
    event.preventDefault();
    var elm = $(this),
    url = elm.attr('href'),
    title = elm.data('title'),
    action = elm.data('action'),
    parent = elm.closest('.list-group-item')

    $('#task-modal-subtitle').html(title);
    $('#task-form').attr('action', action);
    $('#selected-todo-list').val(parent.attr('id'));

    $.ajax({
      url: url,
      dataType: 'html',
      success: function(msg) {
        $('#tasks-table-body').html(msg);
        initIcheck();
        countActiveTasks();
      },
    });
    $('#task-modal').modal('show');
  });

  function countAllTasksOfSelectedList() {
    var total = $('#tasks-table-body tr').length,
    selectedTodoListId = $('#selected-todo-list').val();
    $('#' + selectedTodoListId).find('span.badge').text(total + ' ' + (total > 1 ? 'tasks' : 'task'));
  }

  $('#task-form').submit(function (e) {
    e.preventDefault();
    var form = $(this),
    action = form.attr('action');
    $.ajax({
      url: action,
      method: 'POST',
      data: form.serialize(),
      success: function (msg) {
        $('#tasks-table-body').prepend(msg);
        form.trigger('reset');
        countActiveTasks();
        initIcheck();
        countAllTasksOfSelectedList();
      }
    });
  });

  function marktheTask(checkbox) {
    var url = checkbox.data('url'),
    completed = checkbox.is(':checked');

    $.ajax({
      url: url,
      method: 'PUT',
      data: {
        completed: completed,
        _token: $('input[name=_token]').val(),
      },
      success: function(msg) {
        if (msg) {
          var nextId = checkbox.closest('td').next();

          if (completed) {
            nextId.addClass('done');
          } else {
            nextId.removeClass('done');
          }

          countActiveTasks();
        }
      }
    });
  }

  function initIcheck(){
    $('input[type=checkbox]').iCheck({
      checkboxClass: 'icheckbox_flat-grey',
      increaseArea: '20%'
    });

    $('#check-all').on('ifChecked', function(e) {
      $('.check-item').iCheck('check');
    });

    $('#check-all').on('ifUnchecked', function(e) {
      $('.check-item').iCheck('uncheck');
    });

    $('.check-item').on('ifChecked', function (e) {
      var checkbox = $(this);
      marktheTask(checkbox);
    }).on('ifUnchecked', function (e) {
      var checkbox = $(this);
      marktheTask(checkbox);
    });
  }

  $('.fillter-btn').click(function(event) {
    event.preventDefault();

    var id = this.id;

    $(this).addClass('active').siblings().removeClass('active');

    if (id == 'all-tasks') {
      $('tr.task-item-head').show();
    } else if (id == 'active-tasks') {
      $('tr.task-item-head:has(td.done)').hide();
      $('tr.task-item-head:not(:has(td.done))').show();

    } else if (id == 'compeleted-tasks') {
      $('tr.task-item-head:has(td.done)').show();
      $('tr.task-item-head:not(:has(td.done))').hide();
    }

  });

  $('#tasks-table-body').on('click', '.remove-task-btn', function(e) {
    e.preventDefault();

    var url = $(this).attr('href');

    $.ajax({
      url: url,
      method: 'DELETE',
      data: {
        _token: $('input[name=_token]').val(),
      },
      success: function (msg) {
        $('#task-' + msg.id).fadeOut(500, function() {
          $(this).remove();
          countActiveTasks();
          countAllTasksOfSelectedList();
        });
      }
    });
  });
});
