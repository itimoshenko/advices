import { useState, useCallback, useEffect, useRef, useMemo } from "react";

import { ApiClient } from "../../api/ApiClient";

import { UseResourceOptions, UseResourceReturnType } from "./types";

export const useResource = <OPTIONS, RESPONSE, RESOURCE>({
  loadImmediately = false,
  initOptions = {},
  onLoad,
  onDataSelect,
  onRejected = (e: Error) => {}
}: UseResourceOptions<OPTIONS, RESPONSE, RESOURCE>): UseResourceReturnType<
  OPTIONS,
  RESOURCE
> => {
  const [resource, setResource] = useState<RESOURCE | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const prevReq = useRef<Promise<unknown>>();

  const cancelLoad = useCallback(() => {
    if (prevReq.current) {
      ApiClient.cancelRequest(prevReq.current);
    }
  }, []);

  const load = useCallback(
    (options: OPTIONS) => {
      setIsLoading(true);

      cancelLoad();

      const req = onLoad({ ...initOptions, ...options });

      prevReq.current = req;

      return req
        .then(onDataSelect)
        .then(setResource)
        .catch(onRejected)
        .finally(() => setIsLoading(false));
    },
    [initOptions, cancelLoad, onLoad, onDataSelect, onRejected]
  );

  useEffect(() => {
    if (loadImmediately) {
      try {
        load(initOptions as OPTIONS);
      } catch (e) {}
    }

    return () => {
      cancelLoad();
    }
  }, []);

  const result = useMemo(() => {
    return {
      resource,
      load,
      cancelLoad,
      isLoading
    };
  }, [resource, load, cancelLoad, isLoading]);

  return result;
};
