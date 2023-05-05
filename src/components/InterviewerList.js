import PropTypes from 'prop-types';
import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

//Functions

function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerListItems = interviewers?.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === interviewer}
      setInterviewer={event => props.onChange(
        interviewerItem.id
        )} 
      interviewerId={interviewerItem.id}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired,
};

export default InterviewerList;


