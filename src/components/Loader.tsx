import React, { FC, memo, ReactNode } from "react";

export type LoaderProps = {
  isLoading?: boolean;
  renderLoader?: () => ReactNode;
};

const LOADING_TEXT = "loading...";

export const Loader: FC<LoaderProps> = memo(
  ({ isLoading, renderLoader = () => LOADING_TEXT, children }) => (
    <React.Fragment>{isLoading ? renderLoader() : children}</React.Fragment>
  )
);
