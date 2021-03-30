/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

/* --- Check Task Status and Set Class Accordingly (Each time page loads) --- */

    // When data is retrieved from DB, loop through all tasks and check completion status

        // Define a variable that holds all instances of checkmark buttons (these keep data state)
        const checkmarkButtons= document.querySelectorAll('.set-complete-incomplete');

        // Loop through teh array and set approrpriate colors
        checkmarkButtons.forEach(function(el) {

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
            if (currentCompleteStatus==='true') {

                // Set the button to solid green
                    // Remove outline class
                    checkmarkButton.classList.remove('btn-outline-success');
                    // Add solit class
                    checkmarkButton.classList.add('btn-success');
                
                // Set the input to light green
                taskInputField.classList.add('bg-success', 'text-white');
            };
        });

/* ------------------------------ Create New Task (POST) ----------------------------- */
    // When post is clicked in modal, log information to create new blog
    const postNewTask = async(event) => {

        // Prevent Default
        event.preventDefault();

        // Define Items to Get and Manipulate

            // Get task title (task name) value
            const title = document.querySelector('#new-task-title').value.trim();
                console.log(`task title detected as ${title}`);

            // Get task description value
            const description = document.querySelector('#new-task-description').value.trim();
                console.log(`task description detected as ${description}`);

            // Get task description value
            const due_date = document.querySelector('#new-task-due-date').value.trim();
            console.log(`task dueDate detected as ${due_date}`);

            // Get task assignee

                // Define variable I will set with subfunction
                let user_assigned_id;

                // Invoke hoisted functoin I defined right below
                displayRadioValue();

                // Define sub-functoin for checking which button is selected
                function displayRadioValue () {
                    // Get all choices by name (name is an attribute on the radio inputs)
                    const options = document.getElementsByName('assigneeS');
                    // Loop through the options and see if they are checked
                    for (i = 0; i<options.length; i++) {
                        // If an option is checked
                        if (options[i].checked) {
                            // Set its value to the user_assigned_id
                            user_assigned_id = options[i].value;
                                console.log(`Detected Radio Value is ${user_assigned_id}`);
                            break;
                        };
                    };
                };

            // Get the id for who is creating the task (task created by)
                // Get the modal I put an attribute on
                const creatorModal = document.querySelector('.modal-content');
                // Get the data-user-id attribute I created
                const created_by = creatorModal.getAttribute('data-created-by-user');
                    console.log(`Task Creator is ${created_by}`);
        
        // If content exists for all fields
        if (title && description && due_date && user_assigned_id && created_by) {

            // Post the information to the server at route newTask
            const response = await fetch('/newTask', {
                method: 'POST',
                body: JSON.stringify({title, description, due_date, user_assigned_id, created_by}),
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
                alert('Failed to Create Task');
            }
        }
        // If no content exists when posting, alert them to fill it out first
        else {
            alert('Please ensure you have populated all required fields!');
        }
    };

/* -------------------- Mark Task Complete or Incomplete (PUT) -------------------- */

    // When post is clicked in modal, log information to create new blog
    const updateCompletionStatus = async(event) => {

    // Prevent Default
    event.preventDefault();

    // Define Elements That Need to Be Manipulated or Read

        // Get the button that was clicked
        const checkmarkButton = event.currentTarget;
            console.log(checkmarkButton)

        // Get the task input field
            // Traverse up one div
            const checkmarkButtonDiv = checkmarkButton.parentElement;
                console.log(checkmarkButtonDiv);

            // Go down to next sibling div
            const taskInputDiv = checkmarkButtonDiv.nextElementSibling;
                console.log(taskInputDiv);

            // Go down one child to the input (find the class below with what I specified)
            const taskInputField = taskInputDiv.querySelector('.task-input-field');
                console.log(taskInputField);

         // Get the id of the task of interest
         const id = taskInputField.id;
            console.log(`task id detected as ${id}`);

    // Determine the current is_completed Status of the task by checking it's attribute
            const currentCompleteStatus = checkmarkButton.getAttribute('data-complete-state');
                console.log(currentCompleteStatus);
    
    // If task is currently incomplete, set it to complte
    if (currentCompleteStatus==='false') {

        // Set the button to solid green
            // Remove outline class
            checkmarkButton.classList.remove('btn-outline-success');
            // Add solit class
            checkmarkButton.classList.add('btn-success');
        
        // Set the input to light green
        taskInputField.classList.add('bg-success', 'text-white');

        // Set its status attribute to completed
        checkmarkButton.setAttribute('data-complete-state', 'true');

        // // Update the db with the change in task status
        // const response = await fetch('/updateTaskStatus', {
        //     method: 'PUT',
        //     body: JSON.stringify({is_complete, id}),
        //     headers: {
        //         'Content-Type': 'application/JSON',
        //     }
        // });
        // // If its an ok response refresh and load homepage again with new task
        // if (response.ok) {
        //     document.location.replace('/');
        // }
        // // If it fails, notify them
        // else {
        //     alert('Failed to update Task Status');
        // }
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

        // // Update the db with the change in task status
        // const response = await fetch('/updateTaskStatus', {
        //     method: 'PUT',
        //     body: JSON.stringify({is_complete, id}),
        //     headers: {
        //         'Content-Type': 'application/JSON',
        //     }
        // });
        // // If its an ok response refresh and load homepage again with new task
        // if (response.ok) {
        //     document.location.replace('/');
        // }
        // // If it fails, notify them
        // else {
        //     alert('Failed to update Task Status');
        // }
    }
};

/* -------------------------------- Edit Task (PUT) ------------------------------- */
    // Edit button renders when pencil is clicked in handlebars, then update task button from modal triggers this...
    const updateTask = async(event) => {

        // Prevent Default
        event.preventDefault();

        // Define Items to Get and Manipulate

            // Call out the button clicked
            updateButton = event.currentTarget;

            // Get to the parent Div to scope query selector for finding items within it by classname
            const editTaskModal = updateButton.parentElement.parentElement.parentElement.parentElement;

            // Get the latest title
            const title = editTaskModal.querySelector('.updated-task-title').value.trim();
                console.log(title);
            
            // Get latest descriptoin
            const description = editTaskModal.querySelector('.updated-task-description').value.trim();
                console.log(description)

            // Get latest due_date
            const due_date = editTaskModal.querySelector('.updated-task-due_date').value.trim();
                console.log(due_date);

            // Get latest assignee (get their user id)

                // Get the select element by its id
                const latestAssigneeSelectElement = editTaskModal.querySelector('.current-assignee');
                   
                // Get the data attribute of the selected option within the options list
                const user_assigned_id = latestAssigneeSelectElement.value.trim();
                    console.log(user_assigned_id);
                
        // If content exists for all fields
        if (title &&  description && due_date && user_assigned_id) {

            // Post the information to the server at route newTask
            const response = await fetch('/updatedTask', {
                method: 'PUT',
                body: JSON.stringify({title, description, due_date, user_assigned_id}),
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
                alert('Failed to Create Task');
            }
        }
        // If no content exists when posting, alert them to fill it out first
        else {
            alert('Please ensure all required fields have content existing prior to making an update!');
        }
    };

    
/* ------------------------------- Delete Task (DELETE) ------------------------------ */

/* ------------------------------ Post Comments (POST) ------------------------------ */

    // When edit button is clicked, pull of modal with initial text populated (then re-use post) adding stuff
    /*

    const postComment = async(event) => {

        // Prevent Default
        event.preventDefault();

        // Get the comment, blog id and user id to post

            // Get comment by traversing dom from event target with vanilla js
                // Call out the button clicked
                const postCommentButton = event.target
                    console.log(postCommentButton);
                // Go up a parent
                const upFromButton = postCommentButton.parentElement;
                    console.log(upFromButton);
                // Go to prior sibling
                const form = upFromButton.previousElementSibling;
                    console.log(form);
                // Find within prior sibling element, the class of element holing our comment
                const textArea = form.querySelector('.new-comment');
                    console.log(textArea);
                // Get the trimmed value of the text area (the comment)
                const comment = textArea.value.trim();
                    console.log(comment);
                
                
            // Get the blog id
                // Go up one element from form
                const modalDiv = form.parentElement;
                // Get the blog id
                const blog_id = modalDiv.getAttribute('data-blog-id');
                    console.log(blog_id);
                

            // Get user id for who is submitting blog (who is logged in)
             const user_id = modalDiv.getAttribute('data-currentuser-id');
                console.log(user_id);
    
            // If content exists, Put it to the server...
            if (comment) {
                // Post the information
                const response = await fetch(`/api/dash/comment`, {
                    method: 'POST',
                    body: JSON.stringify({comment,blog_id,user_id}),
                    headers: {
                        'Content-Type': 'application/JSON',
                    }
                });
                // If its an ok response load the latest dash again
                if (response.ok) {
                    document.location.replace('/api/dash');
                }
                // If it fails, notify them
                else {
                    alert('Failed to update')
                }
            }
            
            // If no content exists when posting, alert them to fill it out first
            else {
                alert('Please ensure you have content filled out to update. Content cannot be blank.');
            }

        

    };

    */

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
      checkmarkButtons.forEach(function(el) {
          el.addEventListener('click', updateCompletionStatus)
      })
     
/* -------------------------------- Edit Blog ------------------------------- */
 
    // Define a variable that holds all instances of Update Blog Buttons (within edit modals)
    const updateButtons = document.querySelectorAll('.update-task-button');

    // Loop through this array of buttons and add an event listner to each of them to run edit blog function
    updateButtons.forEach(function(el) {
        el.addEventListener('click', updateTask)
    })
  
/* ------------------------------- Delete Blog ------------------------------ */

    // Not a priority but define here if needed

/* ------------------------------ Post Comment ------------------------------ */
/*
     // Define a variable that holds all instances of buttons with class delete-blog
     const taskCommentButtons = document.querySelectorAll('.ENTERCLASS');

     // Loop through this array of buttons and add an event listner to each of them to run edit blog function
     taskCommentButtons.forEach(function(el) {
         el.addEventListener('click', ENTER FUNCTION)
     });
*/


