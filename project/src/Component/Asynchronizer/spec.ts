declare module IAsynchronizer {
  interface ClassNames extends IClassNames {
    delay: string;
  }
  
  type IsLoading = boolean;
  type StillLoading = (isLoading: IsLoading) => void;
  type LoadingState = [IsLoading, StillLoading];
  
  type Data = any;
  type UpdateData = (Data: Data) => void;
  type DataState = [Data, UpdateData];
  
  type SpinnerRemoved = boolean;
  type removeSpinner = (remove: SpinnerRemoved) => void;
  type SpinnerState = [SpinnerRemoved, removeSpinner];
  
  type awaitFor = string;
  
  interface Props {
    awaitFor: awaitFor,
    children: (data: Data) => React.ReactNode
  }
}

export default IAsynchronizer;
