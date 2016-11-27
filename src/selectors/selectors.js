export function authorsFormattedForDropdown(authors) {
  return authors.map(a => {
    return {
      value: a.id,
      text:  `${a.firstName} ${a.lastName}`
    };
  });
}
