import React from "react";
import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import People from "../lists/People";
import Cars from "../lists/Cars";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import AddCar from "../forms/AddCar";

function Home() {
  const header = "GraphQL with Apollo Client";
  const { loading, error, data } = useQuery(GET_PEOPLE);

  const RenderCars = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data)
      return (
        <>
          <AddCar people={data.people} />
          <Cars people={data.people} />
        </>
      );
  };

  return (
    <div>
      <Title title={header} />
      <Title title={"People"} />
      <AddPerson />
      <People />
      <Title title={"Cars"} />
      <RenderCars />
    </div>
  );
}

export default Home;
