import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { filter } from "lodash";
import { GET_CARS, DELETE_CAR } from "../../queries";
import { useMutation } from "@apollo/client";

const RemoveCar = (props) => {
  const { id } = props;

  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (o) => {
            return o.id !== deleteCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    console.log("handleButtonClick");
    if (result) {
      deleteCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};
export default RemoveCar;
