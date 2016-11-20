$(document).ready(function() {
  $('.show-todolist-modal').click(function(event) {
    event.preventDefault();
    var url = $(this).attr('href');
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

  function updateTodoListCounter() {
    var total = $('.list-group-item').length;
    $('#todo-list-counter').text(total).next().text(total > 1 ? "records" : "record");
  }

  $('#todolist-modal').on('keypress', ":input:not(textarea)", function() {
    return event.keyCode != 13;
  });

  $('#todo-list-save-btn').click(function(event) {
    event.preventDefault();
    var form = $('#todo-list-body form');
        url = form.attr('action'),
        method = 'POST';
        // reset the error messages
        form.find('.help-block').remove();
        form.find('.has-error').removeClass('.has-error');
        $.ajax({
          url: url,
          method: method,
          data: form.serialize(),
          success: function(msg) {
            $('#todo-list').prepend(msg);

            showMessage('the todo list addedd successfully');

            form.trigger('reset');
            $('#title').focus();

            updateTodoListCounter();

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
