const createProjectHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#new-project-title').value.trim();

  const user_id = document.querySelector('#create-new-project').value.trim();

  const date_created = moment().format('YYYY-MM-DD');

  if (title && user_id && date_created) {
    const response = await fetch('/api/project/create', {
      method: 'POST',
      body: JSON.stringify({ title, user_id, date_created }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const deleteProjectHandler = async (event) => {
  event.preventDefault();

  let deleteButton;
  let id;

  deleteButton = event.currentTarget;
  id = deleteButton.getAttribute('value');

  if (id) {
    const response = await fetch('/api/project/delete', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const deleteProject = document.querySelectorAll('.delete-project');

deleteProject.forEach(function (el) {
  el.addEventListener('click', deleteProjectHandler);
});

document
  .querySelector('#create-new-project')
  .addEventListener('click', createProjectHandler);
