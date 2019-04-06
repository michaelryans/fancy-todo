function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
    //successful login get user token --> server
    var id_token = googleUser.getAuthResponse().id_token;
    $.post('http://localhost:3000/google-login', {token:id_token})
    .done(function(user_jwt) {
        localStorage.setItem('token', user_jwt)
        console.log(user_jwt)
        console.log('user token jwt accepted')
    })
    .fail(err => {
        console.log(err)
        console.log("google login fail")
    })

}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

