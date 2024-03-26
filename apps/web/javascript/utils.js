/**
 * Creates delay using Promises
 *
 * @param {*} n Delay time in milliseconds
 * @returns Promise object
 */
export function Delay(n = 2000) {
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}
