import { useState, useEffect } from "react";
import axios from "axios";

//Functionality

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const spotUpdate = (weekday, day, variable, id, appointments) => {
    let spot = day.spots;
    if (weekday ===
      day.name
      && variable === "REMOVE_SPOTS" && appointments[id].interview !== null) {
      return spot
    }
    if (weekday ===
      day.name
      && variable === "REMOVE_SPOT" && appointments[id].interview === null) {
      return spot - 1;
    }
    if (weekday ===
      day.name
      && variable === "ADD_SPOT" && appointments[id].interview !== null) {
      return spot + 1;
    }
    return spot;

  };

  const updateSpots = (weekday, days, variable, id, appointments) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray =
        days.map
          (day => {
            return {
              ...day,
              spots: spotUpdate(weekday, day, variable, id, appointments)
            };
          });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray =
        days.map
          (day => {
            return {
              ...day,
              spots: spotUpdate(weekday, day, variable, id, appointments)
            };
          });
      return updatedStateDayArray;
    }
  };

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })

      .then(() => {
        console.log("success")
        const spotUpdate = updateSpots(state.day, state.days, "REMOVE_SPOT", id, state.appointments);
        setState(prev => ({ ...prev, appointments, days: spotUpdate }));
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {

        const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT", id, state.appointments);
        setState(prev => ({ ...prev, appointments, days: spotUpdate }));
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

  return { state, setState, setDay, bookInterview, cancelInterview };
}
