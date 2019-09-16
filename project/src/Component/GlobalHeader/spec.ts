declare module IGlobalHeader {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  interface Props {
    transitionIn: boolean;
  }
}
export default IGlobalHeader;
