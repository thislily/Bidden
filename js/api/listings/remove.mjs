import { headers, LISTINGS_URL } from "../auth/constants.mjs";

/**
 * Function to remove a listing
 * @param {string} id - the listing ID
 * @throws {Error} - if the listing is not removed
 */

export async function removeListing(id) {
  try {
    const response = await fetch(`${LISTINGS_URL}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    // Handle 204 No Content response
    if (response.status === 204) {
      return;
    }

    // If status is not 204, check for possible error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete listing.");
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}
