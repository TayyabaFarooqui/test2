app.controller('checkStatusCtrl', function() {

  function testFunc() {

    if (window.localStorage.getItem("type") != null) {

      var type = window.localStorage.getItem("type");
      if (type.equals("Student")) { // ==
        // do student sdfjds
        if (window.localStorage.getItem("student_login_username") != null ) {

          //go to state that displays student's personalized homepage
        } else {
          // go to state that lets student log in
        }
      } else if (type === "Faculty") {
        // do teachejfds
      }
    } else {
      // go to the state that lets you choose type
        //setitem localstorage type according to user's selection in the next state

    }

    splashScreen.disappear();
  }

  testFunc();

})
