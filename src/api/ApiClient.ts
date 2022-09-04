export class ApiClient {
  private constructor() {}

  private static pendingRequests = new Map<Promise<unknown>, AbortController>();

  private static toJSON = (response: Response) => response.json();

  private static handleError = (e: Error) => {
    console.error(e);

    return Promise.reject(e);
  };

  public static request = (
    input: RequestInfo,
    init: RequestInit = {},
    onFulfilled = ApiClient.toJSON,
    onRejected = ApiClient.handleError
  ) => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const req = fetch(input, { signal, ...init })
      .then(onFulfilled)
      .catch(onRejected)
      .finally(() => {
        ApiClient.pendingRequests.delete(req);
      });

    ApiClient.pendingRequests.set(req, abortController);

    return req;
  };

  public static cancelRequest = (req: Promise<unknown>) =>
    ApiClient.pendingRequests.get(req)?.abort();
}
