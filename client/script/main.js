$(document).ready(function() {
    if(localStorage.token) {
        getTaskData();
        hideLogin()
        
    } else {
        hideLogout()
        $('div.container').hide()
    }
    
}) 

function hideLogin() {
    //hide login and register
    $('.g-signin2').hide()
    $('#login-button').hide()
    $('#register-button').hide()
    $('.bgimg').hide()

    //show logout
    $('.g-signout2').show()
    $('div.container').show()
    
}

function hideLogout() {
    //hide logout
    $('.g-signout2').hide()
    $('div.container').hide()

    //show login and register
    $('.g-signin2').show()
    $('#login-button').show()
    $('#register-button').show()
    $('.bgimg').show()
}

function dateParser(date) {
    let month
    switch(date.getMonth()) {
        case 0: month="Jan"; break;
        case 1: month="Feb"; break;
        case 2: month="Mar"; break;
        case 3: month="Apr"; break;
        case 4: month="May"; break;
        case 5: month="Jun"; break;
        case 6: month="Jul"; break;
        case 7: month="Aug"; break;
        case 8: month="Sep"; break;
        case 9: month="Oct"; break;
        case 10: month="Nov"; break;
        case 11: month="Dec"; break;
        default: console.log('error date')
    }
    return date.getDate() +'-' + month + '-'+date.getFullYear()
}



function getTaskData() {
    $.ajax({
        url: "http://localhost:3000/task",
        method: "GET",
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        console.log(response)
        for(let i = 0; i < response.length; i++) {
            response[i].unique = `${i}`
            
            $('#task-list-table').append(
                `<tr id="table-unique-${response[i]._id}">
                <th scope="row">${i+1}</th>
                <td id="name-unique-${response[i]._id}">${response[i].name}</td>
                <td id="dueDate-unique-${response[i]._id}">${dateParser(new Date(response[i].dueDate))}</td>
                <td id="ddescription-unique-${response[i]._id}">${response[i].description}</td>
                <td id="status-unique-${response[i]._id}">${response[i].status}</td>
                <td><button onclick="updateStatus('${response[i]._id}')">Done</button>
                <td><button onclick="deleteTask('${response[i]._id}')">Del</button>
                </tr>`
            )
            localStorage.lastUnique = i+1
        }
        
        //save taskData in local storage
        localStorage.taskData = JSON.stringify(response)
    })
    .fail(err => {
        console.log(err)
    })
}

function updateStatus(input) {
    $.ajax({
        method:"PATCH",
        data: {
            _id: input,
            name: $(`#name-unique-${input}`).text(),
        },
        url:"http://localhost:3000/task"
    })
    .done(response => {
        //console.log(response)
        $(`#status-unique-${response.updated._id}`).text(response.updated.status)
    })
    .fail(error => {
        console.log(error)
    })
}

function deleteTask(input) {
    //console.log(input)
    $.ajax({
        method:"delete",
        url:"http://localhost:3000/task",
        data: {
            _id:input
        }
    })
    .done(response => {
        $(`#table-unique-${response._id}`).hide()
    })
    .fail(err => {
        
    })
}


//submit form data
$('#form-task').submit(event => {
    event.preventDefault()

    var $form = $('#form-task')
    url = $form.attr('action')

    data = {
        name:$('#task-name').val(),
        date:(new Date($('#task-date').val())).toISOString(),
        description:$('#task-description').val(),
    }
    //console.log('masuk submit')

    $.ajax({
        url:"http://localhost:3000/task",
        headers: {
            token: localStorage.token
        },
        data: data,
        method:"POST"
    })
    .done(response => {
        localStorage.lastUnique = localStorage.lastUnique || 0
        $('#task-list-table').append(
            `<tr id="table-unique-${Number(localStorage.lastUnique)+1}">
            <th scope="row">${Number(localStorage.lastUnique)+1}</th>
            <td id="name-unique-${response._id}">${response.name}</td>
            <td id="dueDate-unique-${response._id}">${dateParser(new Date(response.dueDate))}</td>
            <td id="description-unique-${response._id}">${response.description}</td>
            <td id="status-unique-${response._id}">${response.status}</td>
            <td><button onclick="updateStatus('${response._id}')">Done</button>
            <td><button onclick="deleteTask('${response._id}')">Del</button>
            </tr>`
        )
        localStorage.lastUnique = Number(localStorage.lastUnique)+ 1
    })
    .fail(err => {
        console.log({
            error: err,
            meesage: "gagal terima form balik untuk task"
        })
        swal("Pembuatan task gagal", {
            button: false,
        });
    })
})


function loginByEmail(e) {
    var obj_login = {
        email: $('#login-email').val(),
        password: $('#login-password').val()
    }

    $.ajax({
        url:"http://localhost:3000/login",
        method:"POST",
        data: obj_login
    })
    .done(response => {
        //console.log('response login')
        //console.log(response)
        getTaskData()
        localStorage.setItem('token', response.token)
        swal({
          title: "Login success!",
          text: `Welcome ${response.name} to Fancy Todo List!`,
          icon: "success"
        });
        hideLogin();
    })
    .fail(err => {
        swal("Error login, please try again", {
            button: false,
          });
    })
}


function registerByEmail() {
    var obj_register = {
        email: $('#register-email').val(),
        name: $('#register-name').val(),
        password: $('#register-password').val(),
        confirmPassword: $('#register-password-confirm').val()
    }
    //console.log(obj_register)

    if(obj_register.password !== obj_register.confirmPassword) {
        swal("Password tidak sesuai", {
            button: false,
          });
    } else {
        $.ajax({
            url:"http://localhost:3000/user",
            method:"POST",
            data: obj_register
        })
        .done(response => {
            swal({
                title: "Register success!",
                text: `Welcome ${response.name} to Fancy Todo List! Please login to use our service`,
                icon: "success"
            });
        })
        .fail(err => {
            swal("Gagal membuat akun", {
                button: false,
              });
        })
    }

}

  