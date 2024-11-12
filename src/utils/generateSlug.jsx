export function generateSlug(title) {
    return title
      .toLowerCase()               // Convert to lowercase
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/^-+|-+$/g, '');    // Remove leading and trailing dashes
  }