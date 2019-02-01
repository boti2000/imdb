$(function () {
    $(".error").hide();
    $("#registerFormBtn").click(function (event) {
        event.preventDefault();
        $(".error").hide();
        var username = $("input#usernameRegister").val();
        if (username == "") {
            $("label#usernameRegisterError").show();
            $("input#usernameRegister").focus();
            return false;
        }

        var email = $("input#email").val();
        if (email == "") {
            $("label#emailError").show();
            $("input#email").focus();
            return false;
        }
        else {
            if (email) {
                var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRE.test(email)) {
                    $("label#emailValidError").show();
                    $("input#email").focus();
                    return false;
                }
            }


        }
        var password = $("input#passwordRegister").val();
        if (password == "") {
            $("label#passwordRegisterError").show();
            $("input#passwordRegister").focus();
            return false;
        }

        var rPassword = $("input#rePasswordRegister").val();
        if (rPassword == "") {
            $("label#rePasswordRegisterError").show();
            $("input#rePasswordRegister").focus();
            return false;
        }

        if (password != rPassword) {
            $("label#passwordRegisterMatch").show();
            $("input#rePasswordRegister").focus();
            return false;
        }

        dataString = "username=" + username + "&email=" + email + "&password=" + password;
        Register(dataString);
        return false;
    });
});

$("input").keypress(function(){
    $(".error").hide();
  });
