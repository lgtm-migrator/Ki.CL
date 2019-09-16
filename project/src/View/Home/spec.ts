import {RouteComponentProps} from 'react-router';

declare module IHome {
  interface ClassNames extends IClassNames {
    backgroundImage: string;
  }
  
  interface Props extends RouteComponentProps {
  }
  
  interface Component {
  }
}

export default IHome;
