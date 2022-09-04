import { DependencyList, useEffect, useMemo } from "react";

import { throttle } from "../../utils";

export const useThrottledCallback = <P, R>(
  callback: (...params: P[]) => R,
  interval: number,
  deps: DependencyList | undefined = []
): (...params: P[]) => void => {
  const memedThrottledCallback = useMemo(() => throttle(callback, interval), deps);

  useEffect(() => {
    return () => {
      memedThrottledCallback.cancel();
    }
  })

  return memedThrottledCallback;
};
