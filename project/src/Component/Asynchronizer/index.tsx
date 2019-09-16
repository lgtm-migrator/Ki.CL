import {CSSTransition} from "@/Component";
import {TransitionStyleName} from "@/Component/CSSTransition";
import Spinner from "@/Component/Spinner";
import {CSSUnit, Fetch} from "@/Helper";
import React, {useEffect, useState} from "react";
import IAsynchronizer from "./spec";
import Style from "./Style";

const delay = CSSUnit(Style.delay);

const Asynchronizer: React.FunctionComponent<IAsynchronizer.Props> = ({
  awaitFor,
  children
}) => {
  let awaitTimer: number;
  
  const [data, updateData]: IAsynchronizer.DataState = useState<IAsynchronizer.Data>(null);
  
  const awaitComplete = (data: any) => {
    return () => {
      updateData(data);
    }
  };
  
  useEffect(() => {
    if (!data) {
      const {cancel, promise} = Fetch(awaitFor);
      
      promise.then(data => {
        awaitTimer = window.setTimeout(awaitComplete(data), delay);
      });
      
      return () => {
        window.clearTimeout(awaitTimer);
        cancel();
      };
    }
  });
  
  return (
    <React.Fragment>
      <Spinner transitionIn={Boolean(!data)} />
      <CSSTransition
        transitionIn={Boolean(data)}
        transitionStyle={TransitionStyleName.fade}
      >
        {Boolean(data) ? children(data) : children}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Asynchronizer;
