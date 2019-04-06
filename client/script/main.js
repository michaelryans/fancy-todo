function clog(input) {
    console.log(input)
}

function sendData() {
    $.ajax({
        url:"http://localhost:3000/test",
        method:"POST",
        data: {
            body:req.body
        }
    })
    .done(response => {
        console.log(response)
    })
    .fail(err => {
        console.log(err)
    })
}

$('#form-task').submit(event => {
    event.preventDefault()

    var $form = $('#form-task')
    url = $form.attr('action')
    console.log(url +'<-- url ')

    $.post(url, {
        name:$('#task-name').val(),
        date:(new Date($('#task-date').val())).toISOString(),
        description:$('#task-description').val(),
    })
    .done(response => {
        console.log(response)
    })
    .fail(err => {
        console.log({
            error: err,
            meesage: "gagal terima form balik untuk task"
        })
    })
})