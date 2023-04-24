import React from "react";
import classNames from "classnames";

function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer, interviewerId } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => setInterviewer(interviewerId)}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;

// import React from "react";
// import classNames from "classnames";


// function InterviewerListItem(props) {
//   const { name, avatar, selected, onClick } = props;

// return{
//   <li className="interviewers__item">
//   <img
//     className="interviewers__item-image"
//     src="https://i.imgur.com/LpaY82x.png"
//     alt="Sylvia Palmer"
//   />
//   Sylvia Palmer
// </li>

// }}

// export default InterviewerListItem;