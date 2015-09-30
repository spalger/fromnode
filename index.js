/* eslint no-var:0 */
module.exports = function fromnode(fn) {
  return new Promise(function fromnodePromiseBody(resolve, reject) {
    function done(err) {
      var rest = Array.prototype.slice.call(arguments, 1);

      if (err) reject(err);
      else if (rest.length > 1) resolve(rest);
      else resolve(rest[0]);
    }

    try {
      fn(done);
    } catch (err) {
      done(err);
    }
  });
};
