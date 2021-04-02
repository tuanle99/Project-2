/* -------------------------------------------------------------------------- */
/*                    Define script to run on each pageload                   */
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