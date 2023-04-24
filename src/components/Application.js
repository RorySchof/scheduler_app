import React, { useState, useEffect } from "react";
import axios from "axios";

import Appointment from "components/Appointment/index.js";
import DayList from "components/DayList";
import "components/Application.scss";

const [days, setDays] = useState([]);


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = {
  "1": {
    id: "1",
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  "2": {
    id: "2",
    time: "1pm",
    interview: {
      student: "Charlie Brown",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
};

export default function Application(props) {
  const [value, setValue] = useState("Monday");
  const [days, setDays] = useState([]);


  useEffect(() => {
    axios.get('/api/days')
      .then(response => {
        setDays(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);


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
          <DayList
            days={days}
            value={value}
            onChange={setValue}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(appointments).map(appointment => (
          <Appointment 
            key={appointment.id} 
            {...appointment}  
          />
        ))}
      </section>
    </main>
  );
}




