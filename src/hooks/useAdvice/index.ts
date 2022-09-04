import { loadAdvice } from "../../api/advices";
import { selectAdvice } from "../../selectors";
import { LoadAdviceResponse } from "../../types/advices";

import { useResource } from "../useResource";

export const useAdvice = () =>
  useResource<void, LoadAdviceResponse, string>({
    loadImmediately: true,
    onLoad: loadAdvice,
    onDataSelect: selectAdvice
  });
