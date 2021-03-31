/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

/* -------------------------- Set Dates and Colors -------------------------- */

    /*
     RUNS ON EACH PAGE LOAD
    */

    // Define a variable that holds a list of all dates for tasks
    const taskDueDates = document.querySelectorAll('.task-due-dates');

    // Define today again
    const today = new Date();
        // Get rid of time details that throw off comparison to our string
        today.setHours(0,0,0,0)

    // Loop through those dates and set colors based on comparison to today
     taskDueDates.forEach(function (el) {
    
        // Get the data-complete-state from the span
        const is_complete = el.getAttribute('data-complete-state');

        // Parse the date of each elemenet into js readable format
        const elDueDate = Date.parse(el.innerHTML)
    
        // If date is prior to today (and the task is incomplete), set red
        if ((elDueDate < today) && (is_complete=='false')) {
            el.classList.add('text-danger');
        }
        // If date is prior to today (and task is complete), set green
        else if ((elDueDate < today) && (is_complete=='true')) {
            el.classList.add('text-success');
        }
        // If date is today, set to today
        else if(!(elDueDate<today) && !(elDueDate>today)) {
            el.classList.add('text-info', 'fw-bold');
            el.innerHTML='Today';
        }
        // Else do nothing... and restart the loop with the next iteration
     })

/* --------------------- Set Task Color and Data Status --------------------- */

    /*
     RUNS ON EACH PAGE LOAD
    */

    // Define a variable that holds all instances of checkmark buttons (these keep data state)
    const checkmarkButtons = document.querySelectorAll('.set-complete-incomplete');

    // Loop through teh array and set approrpriate colors
    checkmarkButtons.forEach(function (el) {

        // Define checkmark button in this particular iteratoin
        const checkmarkButton = el;

        // Get its associated task input field

            // Traverse up one div
            const checkmarkButtonDiv = checkmarkButton.parentElement;

            // Go down to next sibling div
            const taskInputDiv = checkmarkButtonDiv.nextElementSibling;

            // Go down one child to the input (find the class below with what I specified)
            const taskInputField = taskInputDiv.querySelector('.task-input-field');

        // Determine the current is_completed Status of the task by checking it's attribute
        const currentCompleteStatus = checkmarkButton.getAttribute('data-complete-state');

        // If task is currently complete already when it comes from the DB...
        if (currentCompleteStatus === 'true') {

            // Set the button to solid green
            // Remove outline class
            checkmarkButton.classList.remove('btn-outline-success');
            // Add solit class
            checkmarkButton.classList.add('btn-success');

            // Set the input to light green
            taskInputField.classList.add('bg-success', 'text-white');
        };
    });

/* --------- Define Date Format Validator For Use In Create and Edit -------- */

    /*
     RUNS WHEN CALLED IN CREATE OR EDIT TASK
    */

// Define date validation function
    const validateDate = dateInput => {
        if(dateInput.length < 10){
            // invalid date if dateInput length is less than 10
            return false;
        }
        // splitter will split the date and get the date seperator eg: /
        const splitter = dateInput.replace(/[0-9]/g, '')[0];
        
        // using splitter will get the parts of the date
        const parts = dateInput.split(splitter);
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];

        // creating date our of the year, month day
        const date = new Date(year, +month - 1, day);

        //validates leapyear and dates exceeding month limit
        const isValidDate = Boolean(+date) && date.getDate() == day;

        // isValid date is true if the date is valid else false
        return isValidDate;
    };

/* ------------------------------ Create New Task (POST) ----------------------------- */
// When post is clicked in modal, log information to create new blog
const postNewTask = async (event) => {

    // Prevent Default
    event.preventDefault();

    // Define Items to Get and Manipulate

        // Get task title (task name) value
        const title = document.querySelector('#new-task-title').value.trim();

        // Get task description value
        const description = document.querySelector('#new-task-description').value.trim();

        // Get task due date value
        const due_date = document.querySelector('#new-task-due-date').value.trim();

            // Validate due date
            const date_is_valid_format=validateDate(due_date);

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
                    };
                };
            };

   
    // If content exists for all fields
    if ((title && description && due_date && user_assigned_id) && (date_is_valid_format===true)) {

        // Post the information to the server at route newTask (note server checks who its created by)
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, description, due_date, user_assigned_id}),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Failed to Create Task. Please make sure the date you have entered is a valid date');
        }
    }
    // If no content exists when posting, alert them to fill it out first
    else if (date_is_valid_format===false) {
        
        alert ('Please make sure you enter the due date in the proper DD/MM/YYYY format'); 
    }
    else {
        alert ('Please ensure you have entered informatoin in all fields before creating!');
    }
};

/* -------------------- Mark Task Complete or Incomplete (PUT) -------------------- */

// When post is clicked in modal, log information to create new blog
const updateCompletionStatus = async (event) => {

    // Prevent Default
    event.preventDefault();

    // Define Elements That Need to Be Manipulated or Read

    // Default value is incomplete
    let is_complete = 0;
    // Get the button that was clicked
    const checkmarkButton = event.currentTarget;

    // Get the task input field
    // Traverse up one div
    const checkmarkButtonDiv = checkmarkButton.parentElement;

    // Go down to next sibling div
    const taskInputDiv = checkmarkButtonDiv.nextElementSibling;

    // Go down one child to the input (find the class below with what I specified)
    const taskInputField = taskInputDiv.querySelector('.task-input-field');

    // Get the id of the task of interest
    const id = taskInputField.id;

    // Determine the current is_completed Status of the task by checking it's attribute
    const currentCompleteStatus = checkmarkButton.getAttribute('data-complete-state');

    // If task is currently incomplete, set it to complte
    if (currentCompleteStatus === 'false') {

        // Set is_complete to true
        is_complete = 1;
        // Set the button to solid green
        // Remove outline class
        checkmarkButton.classList.remove('btn-outline-success');
        // Add solit class
        checkmarkButton.classList.add('btn-success');

        // Set the input to light green
        taskInputField.classList.add('bg-success', 'text-white');

        // Set its status attribute to completed
        checkmarkButton.setAttribute('data-complete-state', 'true');

        // Update the db with the change in task status
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({is_complete}),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Failed to update Task Status');
        }
    }

    // If the task is currently completed, set it back to incomplete and make needed changes
    else {
        // Set the button to outline green
        // Remove solid class
        checkmarkButton.classList.remove('btn-success');

        // Add the outline class
        checkmarkButton.classList.add('btn-outline-success');

        // Remove green background and white text class
        taskInputField.classList.remove('bg-success', 'text-white');

        // Set its status attribute to incomplete again
        checkmarkButton.setAttribute('data-complete-state', 'false');

        // Update the db with the change in task status
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({is_complete, id}),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Failed to update Task Status');
        }
    }
};

/* -------------------------------- Edit Task (PUT) ------------------------------- */
// Edit button renders when pencil is clicked in handlebars, then update task button from modal triggers this...
const updateTask = async (event) => {

    // Prevent Default
    event.preventDefault();

    // Define Items to Get and Manipulate

    // Call out the button clicked
    updateButton = event.currentTarget;

    // Get to the parent Div to scope query selector for finding items within it by classname
    const editTaskModal = updateButton.parentElement.parentElement.parentElement.parentElement;

    // Get the latest title
    const title = editTaskModal.querySelector('.updated-task-title').value.trim();

    // Get latest descriptoin
    const description = editTaskModal.querySelector('.updated-task-description').value.trim();
    
    // Get latest due_date
    const due_date = editTaskModal.querySelector('.updated-task-due_date').value.trim();
    
        // Validate Date Format
        const date_is_valid_format=validateDate(due_date);

    // Get latest assignee (get their user id)

    // Get the select element by its id
    const latestAssigneeSelectElement = editTaskModal.querySelector('.current-assignee');

    // Get the data attribute of the selected option within the options list
    const user_assigned_id = latestAssigneeSelectElement.value.trim();
    

    // Get the id for the task to delete
    const task_id = editTaskModal.getAttribute('data-task-id');
  

    // If content exists for all fields
    if ((title && description && due_date && user_assigned_id) && (date_is_valid_format===true)) {

        // Post the information to the server at route newTask
        const response = await fetch(`/api/tasks/${task_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description, due_date, user_assigned_id }),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Failed to Create Task. Please check that your date is a valid one.');
        }
    }
    // If no content exists when posting, alert them to fill it out first
    else if (date_is_valid_format===false) {
        alert('Please make sure you enter the due date in the proper DD/MM/YYYY Format');
    }
    else {
        alert('Please ensure all required fields have content existing prior to making an update!');
    }
};


/* ------------------------------- Delete Task (DELETE) ------------------------------ */

// When delete button is clicked, delete the task from the db
const deleteTask = async (event) => {

    // Prevent Default
    event.preventDefault();

    // clear variables in case of loops not closed ever somehow
    let deleteButton;
    let task_id;

    // Get the id for the task on which the delete button was clicked

    // Get the delete-id data attribute from this delete button

    // Call out the button clicked & get the id
    deleteButton = event.currentTarget
    task_id = deleteButton.getAttribute('data-delete-id');
   

    // delete the task by id
    try {
        // Post the information
        const response = await fetch(`/api/tasks/${task_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response load the latest dash again
        if (response.ok) {
            alert(`Task Deleted`);
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Failed to Delete Task')
            return;
        }
    }
    // If no content exists when posting, alert them to fill it out first
    catch {
        alert('Unable to delete task');
    }

};

/* ------------------------------ Post Comments (POST) ------------------------------ */

// When the comment button is clicked (from within the comment modal, not the little comment icon that renders the modal...)
const commentTask = async (event) => {

    // Prevent Default
    event.preventDefault();

    // Call out the button clicked
    const postCommentButton = event.currentTarget

    // Go to commant modal grandparent 
    const commentModal = postCommentButton.parentElement.parentElement.parentElement.parentElement;

    // Get the value of the comment from that modal div using qS scoped to comment modal
    const comment = commentModal.querySelector('.new-comment').value.trim();

    // Get the task id the comment is for
    const task_id = commentModal.getAttribute('data-task-id');

    // Get user id for who is submitting blog (who is logged in)
    // const user_id = commentModal.getAttribute('data-commenter-id');
    // console.log(user_id);

    // If content exists, Put it to the server...
    if (comment && task_id) {
        // Post the information
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, task_id }),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response load the latest dash again
        if (response.ok) {
            alert('Comment Posted!');
            document.location.replace('/');
        }
        // If it fails, notify them
        else {
            alert('Uh Ohhh... Failed to post comment. ')
        }
    }

    // If no content exists when posting, alert them to fill it out first
    else {
        alert('Please ensure you have content filled out to update. Content cannot be blank.');
    }
};

/* -------------------------------------------------------------------------- */
/*                            Define Event Handlers                           */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Post New Task ----------------------------- */

// Add listner to "Create Task" Button that sits WITHIN the task modal
document.querySelector('#create-new-task').addEventListener('click', postNewTask);

/* -------------------- Mark Task Complete or Incomplete -------------------- */

// Define a variable that holds all instances of checkmark button
    // This is done at top of script when I check if the come in from server

// Loop through this array of buttons and add an event listner to each of them to run edit blog function
checkmarkButtons.forEach(function (el) {
    el.addEventListener('click', updateCompletionStatus)
})


/* -------------------------------- Edit Task ------------------------------- */

// Define a variable that holds all instances of Update Blog Buttons (within edit modals)
const updateButtons = document.querySelectorAll('.update-task-button');

// Loop through this array of buttons and add an event listner to each of them to run edit blog function
updateButtons.forEach(function (el) {
    el.addEventListener('click', updateTask)
})

/* ------------------------------- Delete Task ------------------------------ */

// Define a variable that holds all instances of buttons with class delete-task
const deleteTaskButtons = document.querySelectorAll('.delete-task');

// Loop through this array of buttons and add an event listner to each of them to run deleteTask function
deleteTaskButtons.forEach(function (el) {
    el.addEventListener('click', deleteTask)
});

/* ------------------------------ Post Task Comment ------------------------------ */

// Define a variable that holds all instances of buttons with class delete-blog
const taskCommentButtons = document.querySelectorAll('.comment-task');

// Loop through this array of buttons and add an event listner to each of them to run edit blog function
taskCommentButtons.forEach(function (el) {
    el.addEventListener('click', commentTask)
});



