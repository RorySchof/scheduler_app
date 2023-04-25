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
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

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
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import Appointment from "components/Appointment/index.js";
// import DayList from "components/DayList";
// import "components/Application.scss";
// import { getAppointmentsForDay } from "helpers/selectors";
// import { getInterview } from "../helpers/selectors";

// export default function Application(props) {

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });

//   const setDay = day => setState({ ...state, day });

//   useEffect(() => {
//     Promise.all([
//       axios.get('http://localhost:8001/api/days'),
//       axios.get('http://localhost:8001/api/appointments'),
//       axios.get('http://localhost:8001/api/interviewers')
//     ])
//     .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
//       setState(prev => ({ ...prev, days: daysResponse.data, appointments: appointmentsResponse.data, interviewers: interviewersResponse.data }));
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   }, []);

//   const appointments = getAppointmentsForDay(state, state.day);

//   const schedule = appointments.map((appointment) => {
//     const interview = getInterview(state, appointment.interview);

//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}
//       />
//     );
//   });

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={state.days}
//             day={state.day}
//             setDay={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">{schedule}</section>
//     </main>
//   );
// }




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import Appointment from "components/Appointment/index.js";
// import DayList from "components/DayList";
// import "components/Application.scss";

// const state = { day: "Monday", days: [] };
// setState(Object.assign({}, state, { day: "Tuesday" });
// const setDay = day => setState({ ...state, day });
// const setDays = (days) => {
//   //... your code here ...
// }
// setState(prev => ({ ...prev, days }));



// const appointments = {
//   "1": {
//     id: "1",
//     time: "12pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   "2": {
//     id: "2",
//     time: "1pm",
//     interview: {
//       student: "Charlie Brown",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   }
// };

// export default function Application(props) {

//   // const [value, setValue] = useState("Monday");
//   // const [days, setDays] = useState([]);

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     // you may put the line below, but will have to remove/comment hardcoded appointments variable
//     appointments: {}
//   });

//   useEffect(() => {
//     axios.get('/api/days')
//       .then(response => {
//         setDays(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//                days={state.days}
//                day={state.day}
//                setDay={.....}
//                onChange={setValue}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {Object.values(appointments).map(appointment => (
//           <Appointment 
//             key={appointment.id} 
//             {...appointment}  
//           />
//         ))}
//       </section>
//     </main>
//   );
// }




