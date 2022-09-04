import { LoadAdviceResponse, SearchAdvicesResponse } from "../types/advices";

export const selectAdvice = (data: LoadAdviceResponse) => data.slip.advice;
export const selectAdvices = (data: SearchAdvicesResponse) =>
  "slips" in data ? data.slips : [];
