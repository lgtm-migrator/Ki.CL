declare module IView {
  interface ClassName extends IClassNames {
    view: string;
  }
  
  type View = 'about' | 'works' | '';
  
  type AwaitFor = {
    [name in View]?: string;
  }
  
  type Paths = {
    [name in View]?: string;
  }
  
  interface Routes {
    view: View
  }
  
  interface Props {
    routes: Routes
  }
}

export default IView;
