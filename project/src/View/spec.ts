declare module IView {
  interface ClassName extends IClassNames {
    view: string;
  }
  
  type View = 'about' | 'works' | 'home';
  
  type AwaitFor = {
    [name in View]?: string;
  }
  
  type Paths = {
    [name in View]?: string;
  }
  
  interface Props {
  }
}

export default IView;
