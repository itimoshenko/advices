import { searchAdvices } from "../../api/advices";
import { selectAdvices } from "../../selectors";

import { useResource } from "../useResource";

export const useAdvicesSearch = () =>
  useResource({
    onLoad: searchAdvices,
    onDataSelect: selectAdvices
  });
