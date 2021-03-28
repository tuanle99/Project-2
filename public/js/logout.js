/* -------------------------------------------------------------------------- */
/*                           Define Handler Function                          */
/* -------------------------------------------------------------------------- */
const logout = async () => {
  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      });

  if (response.ok) {
  alert(`You have successfully logged out!`)
  document.location.replace('/');
  } else {
  alert(response.statusText);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Define Event Listner                            */
/* -------------------------------------------------------------------------- */

document.querySelector('#logout').addEventListener('click', logout);
