import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; // <=== new constant

export default function Appointment(props) {
  console.log("index",props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // <=== transition to SAVING mode
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onSave = {save} interviewers={[]} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving"/>} 
    </article>
  );
}







// import React from "react";

// import "components/Appointment/styles.scss";

// import Header from "./Header";
// import Show from "./Show";
// import Empty from "./Empty";
// import Form from "./Form";
// import useVisualMode from "hooks/useVisualMode";

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";

// export default function Appointment(props) {
//   console.log("index",props)
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//      function save(name, interviewer) {
//       const interview = {
//         student: name,
//         interviewer
//       };
//       console.log(name, interviewer)
//       // props.bookInterview
//     }

//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//         />
//       )}
//       {mode === CREATE && <Form onSave = {save} interviewers={[]} onCancel={back} />}
//     </article>
//   );
// }