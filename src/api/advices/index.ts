import { ApiClient } from "../ApiClient";

import { LoadAdviceResponse, SearchAdvicesResponse } from "../../types/advices";

import { SearchAdvicesOptions } from "./types";

const ADVICES_SERVICE_API_URL =
  process.env.REACT_APP_ADVICES_SERVICE_API_URL || "";

export const loadAdvice = (): Promise<LoadAdviceResponse> =>
  ApiClient.request(ADVICES_SERVICE_API_URL);

export const searchAdvices = ({
  search
}: SearchAdvicesOptions): Promise<SearchAdvicesResponse> =>
  ApiClient.request(`${ADVICES_SERVICE_API_URL}/search/` + search);
