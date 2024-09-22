/**
 * Check if the bidding has ended
 * @param {string} endsAt - The end time of the bidding in ISO format (e.g., "2020-01-01T00:00:00.000Z")
 * @returns {string} - Returns "Ended" if the bidding has ended, or "Active" if it's still ongoing
 */

export function checkBiddingStatus(endsAt) {
  const currentTime = new Date();
  const endTime = new Date(endsAt);

  return currentTime >= endTime ? "Ended" : "Active";
}
