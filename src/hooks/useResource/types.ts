type Load<OPTIONS> = (options: OPTIONS) => Promise<unknown>;
type CancelLoad = () => void;

type OnLoad<OPTIONS, RESPONSE> = (options: OPTIONS) => Promise<RESPONSE>;
type OnDataSelect<RESPONSE, RESOURCE> = (data: RESPONSE) => RESOURCE;
type OnRejected = <E extends Error>(e: E) => unknown;

export type UseResourceOptions<OPTIONS, RESPONSE, RESOURCE> = {
  loadImmediately?: boolean;
  initOptions?: Partial<OPTIONS>;
  onLoad: OnLoad<OPTIONS, RESPONSE>;
  onDataSelect: OnDataSelect<RESPONSE, RESOURCE>;
  onRejected?: OnRejected;
};

export type UseResourceReturnType<OPTIONS, RESOURCE> = {
  resource: RESOURCE | undefined;
  load: Load<OPTIONS>;
  cancelLoad: CancelLoad;
  isLoading: boolean;
};
