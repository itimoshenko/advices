export const NOOP = () => {};

export const throttle = <P, R>(func: (...params: P[]) => R, interval: number) => {
  let shouldFire = true;
  let timeout: number; 

  const f = (...args: P[]) => {
    if (shouldFire) {
        func(...args);

        shouldFire = false;

        timeout = window.setTimeout(() => {
          shouldFire = true;
        }, interval);
    }
  }

  f.cancel = () => clearTimeout(timeout);

  return f;
}