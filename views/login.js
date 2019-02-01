var dataString2;

$(function() {
    $(".error").hide();
    $("#loginFormBtn").click(function() {
        $(".error").hide();
        var username = $("input#usernameLogin").val();
        if (username == "") {
            $("label#usernameLoginError").show();
            $("input#usernameLogin").focus();
            return false;
        }

        var password = $("input#passwordLogin").val();
        if (password == "") {
            $("label#passwordLoginError").show();
            $("input#passwordLogin").focus();
            return false;
        }
        dataString2 = "username=" + username + "&password=" + password;
        Login(dataString2);
        return false;
    });
});

$("input").keypress(function(){
    $(".error").hide();
  });