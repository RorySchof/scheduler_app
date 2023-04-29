import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "./Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || props.value || null);

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

//  TESTING BELOW. CHECK IF WORKS.

// import React, { useState } from "react";
// import InterviewerList from "../InterviewerList";
// import Button from "./Button";

// export default function Form(props) {
//   const [name, setName] = useState(props.name || "");
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);
//   const [error, setError] = useState("");

//   const reset = () => {
//     setName("");
//     setInterviewer(null);
//   };

//   const cancel = () => {
//     reset();
//     props.onCancel();
//   };

//   function validate() {
//     if (name === "") {
//       setError("Student name cannot be blank");
//       return;
//     }

//     if (interviewer === null) {
//       setError("Please select an interviewer");
//       return;
//     }

//     setError("");
//     props.onSave(name, interviewer);
//   }

//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off">
//           <input
//             data-testid="student-name-input"
//             className="appointment__create-input text--semi-bold"
//             name="name"
//             type="text"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             placeholder="Enter Student Name"
//           />
//           <section className="appointment__validation">{error}</section>
//         </form>
//         <InterviewerList
//           interviewers={props.interviewers}
//           value={interviewer}
//           onChange={setInterviewer}
//         />
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           <Button danger onClick={cancel}>
//             Cancel
//           </Button>
//           <Button confirm onClick={validate}>
//             Save
//           </Button>
//         </section>
//       </section>
//     </main>
//   );
// }