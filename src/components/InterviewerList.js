import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {

  <InterviewerList
  interviewers={interviewers}
  interviewer={interviewer}
  setInterviewer={setInterviewer}
/>

  const { interviewers, interviewer, setInterviewer } = props;

  

  const interviewerListItems = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === interviewer}
      // onClick={() => setInterviewer(interviewerItem.id)}
      // setInterviewer={() => onChange(interviewer.id)}
      onClick={() => setInterviewer(interviewerItem.id)}

      
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

export default InterviewerList;