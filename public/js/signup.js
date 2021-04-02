/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

const signUpFormHandler = async (event) => {

    console.log('button clicked')

    event.preventDefault();

    // Collect values from the signup form
    const email = document.querySelector("#email").value.trim();
    const name = document.querySelector("#name").value.trim();
    const birthday = document.querySelector("#birthday").value.trim();
    const role = document.querySelector("#role").value.trim();
    const password = document.querySelector("#password").value.trim();

    // For dev, check I get inputs for all these before sending to server..
    console.log(`Values captured for server are
        ${email} \n
        ${name} \n
        ${birthday} \n
        ${role} \n
        ${password}`);

    // If there are values present for all when button was pressed...
    if (email && name && birthday && role && password.length > 7) {

        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, role, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If successful, alert them and then redirect them to the dashboard page
        if (response.ok) {
            alert(`Your now signed up! Click ok to view tasks or projects, create and edit your own tasks and projects, and leave comments!`)
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