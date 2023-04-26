import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "./Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="studentName"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form >
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}



// import React, { useState } from "react";
// import InterviewerList from "../InterviewerList";
// import Button from "./Button";

// export default function Form(props) {
//   console.log("FORM",props)
//   const [student, setStudent] = useState(props.student || "");
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);

//   const reset = () => {
//     setStudent("");
//     setInterviewer(null);
//   };

//   const cancel = () => {
//     reset();
//     props.onCancel();
//   };

  

//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off">
//           <input
//             data-testid="student-name-input"
//             className="appointment__create-input text--semi-bold"
//             name="studentName"
//             type="text"
//             value={student}
//             onChange={(event) => setStudent(event.target.value)}
//             placeholder="Enter Student Name"
//           />
//         </form >
//         <InterviewerList
//           interviewers={props.interviewers}
//           interviewer={interviewer}
//           setInterviewer={setInterviewer}
//         />
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           <Button danger onClick={cancel}>
//             Cancel
//           </Button>
//           <Button confirm onClick={() => props.onSave(student, interviewer)}>
//             Save
//           </Button>
//         </section>
//       </section>
//     </main>
//   );
// }