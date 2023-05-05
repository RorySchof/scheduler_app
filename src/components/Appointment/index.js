// Imports

import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//Variables

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const DELETING = "DELETE";
const CONFIRM = "CONFIRM"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//  Functions

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const edit = () => {
    transition(EDIT)
  };

  const cancel = () => {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      })
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);

      }).catch(error => {
        transition(ERROR_SAVE, true);
      })


  }

  return (
    <article className="appointment" data-testid="appointment"  >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          onEdit={edit}
          onDelete={() => transition(CONFIRM)}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}


      {mode === EDIT && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} name={
          props.name
            ?
            props.name
            : props.interview.student}
          value={props.value ? props.value :
            props.interview.interviewer.id
          } />

      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={cancel} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message="Error saving appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Error deleting appointment" onClose={back} />}

    </article>
  );
}

