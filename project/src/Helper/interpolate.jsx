const interpolate = (text, props) => text.replace(/\{\{([^}]+)?\}\}/g, ($1, $2) => props[$2]);

export default interpolate;
