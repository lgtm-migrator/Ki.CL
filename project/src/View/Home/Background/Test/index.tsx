import autobind from "autobind-decorator";
import React from 'react';
import {Node} from '@/Component/WebGL';
import ITest from './spec';
import Shader from './Shader';

class Index extends React.PureComponent<ITest.Props, ITest.State> {
  public state: ITest.State = {
    increment: true,
    time: 0
  };
  
  private setBlueFrame: number;
  
  @autobind
  private updateBlue() {
    this.setState(
      ({time, increment}: ITest.State) => ({
        time: time + (increment? 1 : -1) / 100
      }),
      this.shouldIncrement
    );
    
    this.setBlueFrame = window.requestAnimationFrame(this.updateBlue);
  }
  
  private shouldIncrement() {
    const {time} = this.state;
    
    if (time <= 0) {
      this.setState({increment: true});
    }
    
    if (time >= 1000) {
      this.setState({increment: false});
    }
  }
  
  public componentDidMount(): void {
    this.updateBlue();
  }
  
  public componentWillUnmount(): void {
    window.cancelAnimationFrame(this.setBlueFrame);
  }
  
  public render() {
    const {time} = this.state;
    
    return (
      <Node
        shader={Shader.gradients}
        uniforms={{time}}
      />
    );
  }
}

export default Index;
