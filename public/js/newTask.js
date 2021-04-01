/* ------------------------------ Create New Task (POST) ----------------------------- */
// When post is clicked in modal, log information to create new blog
const postNewTask = async (event) => {
    // Prevent Default
    event.preventDefault();
  
    // Define Items to Get and Manipulate
  
    // Get task title (task name) value
    const title = document.querySelector('#new-task-title').value.trim();
  
    // Get task description value
    const description = document
      .querySelector('#new-task-description')
      .value.trim();
  
    // Get task due date value
    const due_date = document.querySelector('#new-task-due-date').value.trim();
  
    // Validate due date
    const date_is_valid_format = validateDate(due_date);
  
    // Get task assignee
  
    // Define variable I will set with subfunction
    let user_assigned_id;
  
    // Invoke hoisted functoin I defined right below
    displayRadioValue();
  
    // Define sub-functoin for checking which button is selected
    function displayRadioValue() {
      // Get all choices by name (name is an attribute on the radio inputs)
      const options = document.getElementsByName('assigneeS');
      // Loop through the options and see if they are checked
      for (i = 0; i < options.length; i++) {
        // If an option is checked
        if (options[i].checked) {
          // Set its value to the user_assigned_id
          user_assigned_id = options[i].value;
          console.log(`Detected Radio Value is ${user_assigned_id}`);
          break;
        }
      }
    }
  
    // If content exists for all fields
    if (
      title &&
      description &&
      due_date &&
      user_assigned_id &&
      date_is_valid_format === true
    ) {
      // Post the information to the server at route newTask (note server checks who its created by)
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description, due_date, user_assigned_id }),
        headers: {
          'Content-Type': 'application/JSON',
        },
      });
      // If its an ok response refresh and load homepage again with new task
      if (response.ok) {
        document.location.replace('/');
      }
      // If it fails, notify them
      else {
        alert(
          'Failed to Create Task. Please make sure the date you have entered is a valid date'
        );
      }
    }
    // If no content exists when posting, alert them to fill it out first
    else if (date_is_valid_format === false) {
      alert(
        'Please make sure you enter the due date in the proper DD/MM/YYYY format'
      );
    } else {
      alert(
        'Please ensure you have entered informatoin in all fields before creating!'
      );
    }
  };
  
  /* ------------------------------ Post New Task ----------------------------- */
  
  // Add listner to "Create Task" Button that sits WITHIN the task modal
  document
    .querySelector('#create-new-task')
    .addEventListener('click', postNewTask);
  