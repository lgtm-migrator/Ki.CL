import {RouteComponentProps} from 'react-router';

declare module IAbout {
  interface Data {
    sections: {
      About: string
    }
  }
  
  interface Props extends RouteComponentProps {
  }
}

export default IAbout;
