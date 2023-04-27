import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {

  const { interviewers, interviewer, setInterviewer } = props;

  console.log(interviewers)

  const interviewerListItems = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === interviewer}
      // onClick={() => setInterviewer(interviewerItem.id)}
     setInterviewer={setInterviewer}
     interviewerId={interviewerItem.id}
      

    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  )
};


export default InterviewerList;