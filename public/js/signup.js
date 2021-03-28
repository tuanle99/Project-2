/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

const signUpFormHandler = async (event) => {

    console.log('button clicked')

    event.preventDefault();

    // Collect values from the signup form
    const email = document.querySelector("#inputNewEmail").value.trim();
    const user_name = document.querySelector("#inputNewUserName").value.trim();
    const password = document.querySelector("#inputNewPassword").value.trim();

    console.log("values captured as vairables are" + email + user_name + password)

    // If there are values present for all when button was pressed...
    if (email && password.length > 7 && user_name) {

        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If successful, alert them and then redirect them to the dashboard page
        if (response.ok) {
            alert(`Your now signed up! Click ok to view blogs, create and edit your own blogs, and leave comments!`)
            document.location.replace('/');
        } 
        else {
            alert(response.statusText);
        }
    }
    else {
        alert (`please ensure your password is at least 8 characters long`)
    }
};

/* -------------------------------------------------------------------------- */
/*                            Define Event Handlers                           */
/* -------------------------------------------------------------------------- */

document
    // get the button I gave the sign-up-button id and listen for a click
    .querySelector('#sign-up-button')
    // when clicked, run the function I defined above to send info to server and get response
    .addEventListener('click', signUpFormHandler);