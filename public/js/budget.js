/* ------------------------------ Create New Expense (POST) ----------------------------- */
// When expense is clicked in modal, log information to create new blog
const postNewExpense = async (event) => {

    // Prevent Default
    event.preventDefault();

    // Define Items to Get and Manipulate

    // Get Expense Title value
    const category = document.querySelector('#new-budget-title').value.trim();

    // Get Expense description value
    const frequency = document.querySelector('#new-budget-frequency').value.trim();

    // Get Expense due date value
    const amount = document.querySelector('#new-budget-amount').value.trim();



    // If content exists for all fields
    if (category && frequency && amount) {

        // Post the information to the server at budget route (note server checks who its created by)
        const response = await fetch('/api/budget', {
            method: 'POST',
            body: JSON.stringify({ category, frequency, amount }),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            location.reload();
        }
        // If it fails, notify them
        else {
            alert('Failed to create new expense');
        }
    }

    else {
        alert('Please ensure you have entered information in all fields before creating!');
    }
};

/* ------------------------------- Delete Expense (DELETE) ------------------------------ */

// When delete button is clicked, delete the task from the db
const deleteExpense = async (event) => {

    // Prevent Default
    event.preventDefault();

    // clear variables in case of loops not closed ever somehow
    let deleteButton;
    let budget_id;

    // Get the id for the expense on which the delete button was clicked

    // Get the delete-id data attribute from this delete button

    // Call out the button clicked & get the id
    deleteButton = event.currentTarget
    budget_id = deleteButton.getAttribute('data-delete-id');


    // delete the task by id
    try {
        // Post the information
        const response = await fetch(`/api/budget/${budget_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/JSON',
            }
        });
        // If its an ok response load the latest dash again
        if (response.ok) {
            alert(`Expense Deleted`);
            location.reload();
        }
        // If it fails, notify them
        else {
            alert('Failed to Delete Expense')
            return;
        }
    }
    // If no content exists when posting, alert them to fill it out first
    catch {
        alert('Unable to delete Expense');
    }

};

/* -------------------------------- Edit Budget (PUT) ------------------------------- */
// Edit button renders when pencil is clicked in handlebars, then update budget button from modal triggers this...
const updateBudget = async (event) => {

    // Prevent Default
    event.preventDefault();

    let updateButton;

    // Call out the button clicked
    updateButton = event.currentTarget;

    // Get to the parent Div to scope query selector for finding items within it by classname
    const editBudgetModal = updateButton.parentElement.parentElement.parentElement.parentElement;

    // Get the latest category
    const category = editBudgetModal.querySelector('.updated-budget-category').value.trim();

    // Get latest frequency
    const frequency = editBudgetModal.querySelector('.updated-budget-frequency').value.trim();

    // Get latest amount
    const amount = editBudgetModal.querySelector('.updated-budget-amount').value.trim();

    const budget_id = editBudgetModal.getAttribute('data-budget-id');
    
    // If content exists for all fields
    if (category && frequency && amount) {

        // Post the information to the server at route newTask
        const response = await fetch(`/api/budget/${budget_id}`, {
            method: 'PUT',
            body: JSON.stringify({ category, frequency, amount }),
            headers: {
                'Content-Type': 'application/JSON',
            }
        });

        // If its an ok response refresh and load homepage again with new task
        if (response.ok) {
            location.reload();
        }

        // If it fails, notify them
        else {
            alert('Failed to Update Expense.');
        }
    }
    else {
        alert('Please ensure all required fields have content existing prior to making an update!');
    }
};


// POST NEW EXPENSE
// Grabbing newExpense button from document and calling post function when clicked
document.querySelector('#create-new-expense').addEventListener('click', postNewExpense);

// DELETE EXPENSE
// Grabbing deleteExpense buttons
const deleteExpenseButtons = document.querySelectorAll('.delete-expense');
// Loop through this array of buttons and add an event listner to each of them to run deleteEvent function
deleteExpenseButtons.forEach(function (el) {
    el.addEventListener('click', deleteExpense)
});

// UPDATE EXPENSE
// Define a variable that holds all instances of Update Blog Buttons (within edit modals)
const updateExpenseButtons = document.querySelectorAll('.update-expense-button');
// Loop through this array of buttons and add an event listner to each of them to run edit blog function
updateExpenseButtons.forEach(function (el) {
    el.addEventListener('click', updateBudget)
});