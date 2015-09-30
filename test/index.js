import assert from 'assert';
import fromNode from '../';

describe('fromnode', function() {
  it('creates a promise controlled by a callback', function() {
    const promise = fromNode(cb => cb());
    assert(promise instanceof Promise, 'return value should be a promise');
    return promise;
  });

  it('catches sync errors in top level callback', function() {
    return fromNode(() => {
      notAnObject.method(); // eslint-disable-line
    })
    .then(
      function() {
        assert(false, 'the promise should have rejected');
      },
      function() {
        assert(true);
      }
    );
  });

  it('rejects when an error passed', function() {
    const err = new Error();

    return fromNode(cb => {
      setTimeout(cb, 50, err);
    })
    .then(
      function() {
        assert(false, 'the promise should have rejected');
      },
      function(_err_) {
        assert(_err_ === err, _err_.message);
      }
    );
  });

  it('resolves to a single value when one is passed to the callback', async function() {
    const resp = await fromNode(cb => {
      cb(null, 1);
    });

    assert(resp === 1, 'promise should have resolved to 1');
  });

  it('resolves to an array when multiple response values are passed back', async function() {
    const resp = await fromNode(cb => {
      cb(null, 1, 2, 3);
    });

    assert(resp instanceof Array, 'response should be an array');
    assert(resp[0] === 1, 'promise should have resolved to 1,2,3');
    assert(resp[1] === 2, 'promise should have resolved to 1,2,3');
    assert(resp[2] === 3, 'promise should have resolved to 1,2,3');
  });
});
