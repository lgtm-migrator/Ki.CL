// @flow
import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import classnames from 'classnames';

import './style.scss';

type Props = {
    children: React.Node,
    className: string,
    component: string,
    to: string,
    text: string
};

const activeClassName = 'isActive';

const Link = ({ children, className, component, to, text }: Props) => {
    const Wrapper = component;

    className = classnames(className);

    const Element = () => (
        <NavLink
            exact
            {...{
                activeClassName,
                to,
                className: !Wrapper ? className : null
            }}
        >
            {text ? <span>{text}</span> : children}
        </NavLink>
    );

    return (
        <Router>
            {Wrapper ? (
                <Wrapper {...{ className }}>
                    <Element />
                </Wrapper>
            ) : (
                <Element />
            )}
        </Router>
    );
};

export default Link;
