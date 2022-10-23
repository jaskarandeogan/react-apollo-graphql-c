import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_CARS } from "../../queries";
import { Card } from "antd";
import Title from "../layout/Title";
import Home from "./Home";

const getStyles = () => ({
  card: {
    width: 600,
    margin: 10,
  },
});

const ShowMore = (props) => {
  const { id } = useParams();
  const styles = getStyles();
  // console.log(id);
  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  const formatCurency = (price) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    });
    return formatter.format(price);
  };

  const RenderPersonCars = () => {
    if (data) {
      return (
        <>
          <Title
            title={`Cars owned by ${data.person.firstName} ${data.person.lastName}`}
          />
          {data.carsByPersonId.map((car) => {
            return (
              <Card key={car.id} style={styles.card}>
                <b>{car.personName}</b> has {car.year} {car.make} {car.model}{" "}
                which costs <b>{formatCurency(car.price)}</b>
              </Card>
            );
          })}
          <Link to={{ pathname: `/` }} element={<Home />}>
            Go Back Home
          </Link>
        </>
      );
    }
  };

  return <RenderPersonCars />;
};

export default ShowMore;
