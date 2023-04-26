import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";

export default function Application() {
  const { state, setDay, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={() => cancelInterview(appointment.id)}
      />
    );
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({
    //   ...state,
    //   appointments
    // });
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}








// import React from "react";

// import "components/Appointment/styles.scss";

// import Confirm from "components/Appointment/Confirm";


// import Header from "components/Appointment//Header";
// import Show from "components/Appointment//Show";
// import Empty from "components/Appointment/Empty";
// import Form from "components/Appointment/Form";
// import useVisualMode from "hooks/useVisualMode";
// import Status from "components/Appointment//Status";


// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const SAVING = "SAVING";
// const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
// const EDIT = "EDIT"; 

// export default function Appointment(props) {
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   function save(name, interviewer) {
//     const interview = {
//       student: name,
//       interviewer
//     };
//     transition(SAVING);
//     props.bookInterview(props.id, interview)
//       .then(() => {
//         transition(SHOW);
//       })
//   }

//   function deleteAppointment() {
//     transition(CONFIRM);
//   }

//   function confirmDeleteAppointment() {
//     transition(DELETING, true);
//     props.cancelInterview(props.id)
//       .then(() => {
//         transition(EMPTY);
//       })
//   }

//   function edit() { 
//     transition(EDIT);
//   }

//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={deleteAppointment}
//           onEdit={edit} 
//         />
//       )}
//       {mode === CREATE && (
//         <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
//       )}
//       {mode === EDIT && (
//         <Form
//           onSave={save}
//           interviewers={props.interviewers}
//           onCancel={back}
//           name={props.interview.student} 
//           interviewer={props.interview.interviewer.id} 
//           buttonText="Save Changes" 
//         />
//       )}
//       {mode === SAVING && <Status message="Saving"/>}
//       {mode === DELETING && <Status message="Deleting"/>}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you would like to delete?"
//           onCancel={back}
//           onConfirm={confirmDeleteAppointment}
//         />
//       )}
//     </article>
//   );
// }








// import React, { useState, useEffect } from "react";

// import DayList from "./DayList";
// import Appointment from "./Appointment";
// import {
//   getAppointmentsForDay,
//   getInterviewersForDay,
//   getInterview
// } from "../helpers/selectors";
// import useApplicationData from "../hooks/useApplicationData";

// import "components/Application.scss";




// export default function Application() {
//   const { state, setDay, cancelInterview } = useApplicationData();

//   const dailyAppointments = getAppointmentsForDay(state, state.day);
//   const interviewers = getInterviewersForDay(state, state.day);

//   const appointments = dailyAppointments.map(appointment => {
//     const interview = getInterview(state, appointment.interview);
//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview={cancelInterview}
//       />
//     );
//   });

//   function bookInterview(id, interview) {
    
//       console.log(id, interview);
   
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//       } ;


//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     // setState({
//     //   ...state,
//     //   appointments
//     // });
  
//   }

    
//     // console.log(id, interview);
  
//     // function save(name, interviewer) {
//     //   const interview = {
//     //     student: name,
//     //     interviewer
//     //   };
//     // }

//   // function save(name, interviewer) {
//   //   const interview = {
//   //     student: name,
//   //     interviewer
//   //   };
//   //   bookInterview(id, interview);
//   //   console.log(id, interview);
//   // }

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={state.days}
//             day={state.day}
//             setDay={setDay}
//           />
//         </nav>
//         <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
//       </section>
//       <section className="schedule">
//         {appointments}
//         <Appointment key="last" time="5pm" bookInterview={bookInterview} />
//       </section>
//     </main>
//   );
// }







