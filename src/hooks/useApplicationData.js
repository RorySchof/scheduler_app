import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const dayIndex = state.days.findIndex(day => day.appointments.includes(id));
        const day = { ...state.days[dayIndex] };
        if (!state.appointments[id].interview) {
          day.spots--;
        }
        const days = [...state.days];
        days[dayIndex] = day;
        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const dayIndex = state.days.findIndex(day => day.appointments.includes(id));
        const day = { ...state.days[dayIndex] };
        if (!state.appointments[id].interview) {
          day.spots++;
        }
        const days = [...state.days];
        days[dayIndex] = day;
        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
// 
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function useApplicationData() {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

//   const setDay = day => setState(prev => ({ ...prev, day }));

//   const bookInterview = (id, interview) => {
//     return axios.put(`/api/appointments/${id}`, { interview })
//       .then(() => {
//         const appointment = {
//           ...state.appointments[id],
//           interview: { ...interview }
//         };
//         const appointments = {
//           ...state.appointments,
//           [id]: appointment
//         };
//         setState(prev => ({ ...prev, appointments }));
//       });
//   };

//   const cancelInterview = id => {
//     return axios.delete(`/api/appointments/${id}`)
//       .then(() => {
//         const appointment = {
//           ...state.appointments[id],
//           interview: null
//         };
//         const appointments = {
//           ...state.appointments,
//           [id]: appointment
//         };
//         setState(prev => ({ ...prev, appointments }));
//       });
//   };

//   useEffect(() => {
//     Promise.all([
//       axios.get('/api/days'),
//       axios.get('/api/appointments'),
//       axios.get('/api/interviewers')
//     ]).then(all => {
//       setState(prev => ({
//         ...prev,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data
//       }));
//     });
//   }, []);

//   return { state, setDay, bookInterview, cancelInterview };
// }