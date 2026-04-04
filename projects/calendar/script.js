/* ============================================
   CALENDAR APP - JavaScript Functionality
   ============================================ */

// Store the currently displayed month/year
let currentDate = new Date();

// Get references to HTML elements
const monthYear = document.getElementById('monthYear');     // Month/year display
const daysContainer = document.getElementById('daysContainer'); // Grid of days
const prevBtn = document.getElementById('prevBtn');         // Previous month button
const nextBtn = document.getElementById('nextBtn');         // Next month button
const todayBtn = document.getElementById('todayBtn');       // Today button

// Array of month names for display
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/* Main function to render/redraw the calendar grid
   Called whenever the month changes */
function renderCalendar() {
    // Extract year and month from currentDate
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11 (Jan-Dec)
    
    // Update the header with current month and year
    monthYear.textContent = `${monthNames[month]} ${year}`;  // Display: "April 2026"
    
    // Remove all previously rendered day cells from the container
    daysContainer.innerHTML = ''; // Clear all children
    
    // Calculate which day of the week the month starts on (0=Sunday, 6=Saturday)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Calculate how many days are in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Calculate how many days are in the previous month (used to fill empty spaces)
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Fill in the empty grid cells at the start with days from the previous month
    // This creates a full first week row
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');     // Create empty cell
        day.classList.add('day', 'other-month');       // Style it as "other month"
        day.textContent = daysInPrevMonth - i;         // Show prev month's dates
        daysContainer.appendChild(day);                 // Add to calendar grid
    }
    
    // Add all the days of the current month
    // Get today's actual date to highlight it
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');       // Create cell
        day.classList.add('day');                        // Add base styling
        day.textContent = i;                             // Show the date number
        
        // Check if this cell represents today's date
        // Highlight today with special styling
        if (i === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            day.classList.add('today');  // Apply purple gradient style
        }
        
        daysContainer.appendChild(day);   // Add to calendar grid
    }
    
    // Fill remaining grid cells at the end with days from the next month
    // This creates a full last week row
    // Calculate empty cells needed to complete the grid
    const totalCells = daysContainer.children.length; // How many cells we have
    const remainingCells = 42 - totalCells;           // Need 42 total (6 weeks × 7 days)
    
    // Add filler cells with dates from next month
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');     // Create cell
        day.classList.add('day', 'other-month');       // Style as "other month"
        day.textContent = i;                           // Show next month's dates
        daysContainer.appendChild(day);                 // Add to grid
    }
}

/* ============================================
   EVENT LISTENERS - Handle button clicks
   ============================================ */

// Previous month button - Go back one month
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // Subtract 1 month
    renderCalendar();                                   // Redraw calendar
});

// Next month button - Go forward one month
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // Add 1 month
    renderCalendar();                                   // Redraw calendar
});

// Today button - Jump back to current date
todayBtn.addEventListener('click', () => {
    currentDate = new Date();  // Reset to today's date
    renderCalendar();          // Redraw calendar
});

/* ============================================
   INITIALIZATION - Display calendar on page load
   ============================================ */
renderCalendar(); // Draw the calendar when page first loads
