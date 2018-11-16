module.exports = {
    randomStringGenerator: function(length) {
      const chars =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }
  };