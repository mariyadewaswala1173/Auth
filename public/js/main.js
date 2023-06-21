document.getElementById("loginForm").addEventListener("submit", function (event) {
    // event.preventDefault(); // Prevent form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Here, you can perform validation and further processing
    // such as making an API call to validate the email and password

    // For this example, let's just display an alert with the entered values
    // alert("Email: " + email + "\nPassword: " + password);

    // Reset the form
    document.getElementById("loginForm").reset();
});

document.getElementById("signupForm").addEventListener("submit", function (event) {
    // event.preventDefault(); // Prevent form submission

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Here, you can perform validation and further processing
    // such as making an API call
}); 