import { ISODateString } from "./common";

export type ShortAdvice = {
  id: number;
  advice: string;
};

export type FullAdvice = {
  id: number;
  advice: string;
  date: ISODateString;
};

export type LoadAdviceResponse = {
  slip: ShortAdvice;
};

export type SearchAdvicesResponse =
  | {
      total_results: string;
      query: string;
      slips: FullAdvice[];
    }
  | {
      message: {
        type: string;
        text: string;
      };
    };
