declare module IView {
  interface ClassName extends IClassNames {
    view: string;
  }
  
  interface AwaitFor {
    [name: string]: string;
  }
  
  interface Props {
  }
}

export default IView;
