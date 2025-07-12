module.exports = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  generateRandomString: (length = 8) => {
    return Math.random().toString(36).substr(2, length);
  }
};