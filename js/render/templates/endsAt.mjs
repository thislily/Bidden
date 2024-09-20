/**
 * Renders the ends at template
 * @param {string} endTime - the end time of the listing
 * @returns {HTMLParagraphElement} - the ends at template
 */


 
export function formatTimeRemaining(endTime) {
    const endDate = new Date(endTime);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const timeDifference = endDate - now;
    
    // If the bidding has ended
    if (timeDifference <= 0) {
      return "";
    }
  
    // Calculate time in days and hours
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Create the string output
    let timeRemaining = "Bidding ends in ";
    if (days > 0) {
      timeRemaining += `${days} day${days > 1 ? 's' : ''} `;
    }
    timeRemaining += `${hours} hour${hours !== 1 ? 's' : ''}`;
  
    return timeRemaining.trim();
  }
  
