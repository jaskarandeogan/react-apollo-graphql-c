import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";

import { List } from "antd";
import CarsCard from "../listItenms/CarsCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

function Cars(props) {
  const [people, getPeople] = React.useState(props.people);

  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
//   console.log(data.cars);

  return (
    <List style={styles.list} grid={{ gutter: 16, column: 4 }}>
      {data.cars.map((car) => (
        <List.Item key={car.id}>
          <CarsCard car={car} people={people}/>
        </List.Item>
      ))}
    </List>
  );
}

export default Cars;
