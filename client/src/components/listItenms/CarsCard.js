import React from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

const getStyles = () => ({
  card: {
    width: 400,
    margin: "auto",
    justifyContent: "center",
  },
});

const CarsCard = (props) => {
  const styles = getStyles();
  // const { car } = props;

  //people props
  const [people] = React.useState(props.people);
  //car props
  const [id] = React.useState(props.car.id);
  const [year, setYear] = React.useState(props.car.year);
  const [make, setMake] = React.useState(props.car.make);
  const [model, setModel] = React.useState(props.car.model);
  const [price, setPrice] = React.useState(props.car.price);
  const [personId, setPersonId] = React.useState(props.car.personId);
  const [update, setUpdate] = React.useState(false);

  const handleButtonClick = () => setUpdate(!update);

  const updateStates = (state, value) => {
    console.log("updateStates state");
    switch (state) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  const person = people.find((person) => person.id === personId);
  const personName = person
    ? `${person.firstName} ${person.lastName}`
    : "No Owner";
  //   console.log("person", person)


  const formatCurency = (price) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    });
    return formatter.format(price);
  };

  return (
    <>
    
      {update ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          people={people}
          onButtonClick={handleButtonClick}
          updateStates={updateStates}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
          style={styles.card}
        >
          {" "}
          <b>{personName}</b> has {year} {make} {model} which costs{" "}
          <b>{formatCurency(price)}</b>
        </Card>
      )}
    </>
  );
};

export default CarsCard;
