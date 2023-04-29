import React from "react";
import DayListItem from "./DayListItem";
import useApplicationData from "hooks/useApplicationData";

export default function DayList(props) {
  const {setDay, state} = useApplicationData() 

  console.log(state)
  
  const dayItems = props.days.map((day) => (
    <DayListItem
      onChange = {props.handleChange}
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayItems}</ul>;
}