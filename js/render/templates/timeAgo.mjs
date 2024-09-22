/**
 * function that returns the "time ago" from a date string, rounded to the nearest minute, hour, day, month, or year.
 * @param {string} dateString - the date string from the post
 * @returns {string} - the time ago string
 */

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.44); // average month length
  const years = Math.round(days / 365);

  //statements to return the time ago in the most appropriate unit of time
  if (seconds < 60) {
    return "just now";
  } else if (minutes === 1) {
    return "a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return "an hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return "yesterday";
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months === 1) {
    return "a month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years === 1) {
    return "a year ago";
  } else {
    return `${years} years ago`;
  }
}
