/* -------------------------------------------------------------------------- */
/*                          Define Handler Functions                          */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Post (Create) New Task ----------------------------- */
    // When post is clicked in modal, log information to create new blog
    const postNewTask = async(event) => {

        // Prevent Default
        event.preventDefault();

        // Define Items to Get and Manipulate

            // Get task title (task name) value
            const title = document.querySelector('#new-task-title').value.trim();
                console.log(`task title detected as ${title}`);

            // Get task description value
            const descripton = document.querySelector('#new-task-description').value.trim();
                console.log(`task description detected as ${descripton}`);

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
        if (title && descripton && due_date && user_assigned_id && created_by) {

            // Post the information to the server at route newTask
            const response = await fetch('/newTask', {
                method: 'POST',
                body: JSON.stringify({title, descripton, due_date, user_assigned_id, created_by}),
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

/* -------------------------------- Edit Task ------------------------------- */
    
/* ------------------------------- Delete Task ------------------------------ */

/* ------------------------------ Post Comments ------------------------------ */

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
     
/* -------------------------------- Edit Blog ------------------------------- */
 
    // Enter when ready
  
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


