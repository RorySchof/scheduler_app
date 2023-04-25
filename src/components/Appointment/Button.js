import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
 

// export default function Button(props) {
//    return <button>{props.children}</button>;
//  }

//  export default function Button(props) {
//    let buttonClass = "button";
 
//    if (props.confirm) {
//      buttonClass += " button--confirm";
//    }
 
//    return <button className={buttonClass}>{props.children}</button>;
//  }

//  export default function Button(props) {
//    let buttonClass = "button";
 
//    if (props.confirm) {
//      buttonClass += " button--confirm";
//    }
 
//    if (props.danger) {
//      buttonClass += " button--danger";
//    }
 
//    return <button className={buttonClass}>{props.children}</button>;
//  }

//  export default function Button(props) {
//    let buttonClass = "button";
 
//    if (props.confirm) {
//      buttonClass += " button--confirm";
//    }
 
//    if (props.danger) {
//      buttonClass += " button--danger";
//    }
 
//    return (
//      <button
//        className={buttonClass}
//        onClick={props.onClick}
//        disabled={props.disabled}
//      >
//        {props.children}
//      </button>
//    );
//  }