/* -------------------------------------------------------------------------- */
/*                     Define Helpers Within Module Export                    */
/* -------------------------------------------------------------------------- */

module.exports = {

    /* ------------------------------- Date Format ------------------------------ */
    
        format_date: (date) => {
          // Format date as MM/DD/YYYY
          return date.toLocaleDateString();
        }
    
    }