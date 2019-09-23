import {RouteComponentProps} from "react-router";

declare module IGlobalHeader {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props extends RouteComponentProps {
  }
}
export default IGlobalHeader;
