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

  $('.show-task-modal').click(function(event) {
    event.preventDefault();

    $('#task-modal').modal('show');
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

  $(function() {
    $('input[type=checkbox]').iCheck({
      checkboxClass: 'icheckbox_square-green',
      increaseArea: '20%'
    });

    $('#check-all').on('ifChecked', function(e) {
      $('.check-item').iCheck('check');
    });

    $('#check-all').on('ifUnchecked', function(e) {
      $('.check-item').iCheck('uncheck');
    });
  });
});
