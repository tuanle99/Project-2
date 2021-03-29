/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

const loginFormHandler = async (event) => {

  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  // Execute login logic
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page and notify them they are signed in
      alert(`Sign in successful. Welcome!`);
      document.location.replace('/');
    } 
    else {
      alert(`${response.statusText} \n Please make sure you have entered the correct crendentials. If you have not signed up before, please use the link provided below the signin window to register.`);
    }
  }
};
         

/* -------------------------------------------------------------------------- */
/*                            Define Event Handlers                           */
/* -------------------------------------------------------------------------- */

document
  // get the button I gave the sign-up-button id and listen for a click
  .querySelector('#log-in-button')
  // when clicked, run the function I defined above to send info to server and get response
  .addEventListener('click', loginFormHandler);
