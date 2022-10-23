import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { GET_CARS, ADD_CAR } from "../../queries";

const AddCar = (props) => {
  const [form] = Form.useForm();
  const { people } = props;
  console.log("AddCar people", people);
  const [, forceUpdate] = React.useState(); // To disable submit button at the beginning.

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { make, model, year, price, personId } = values;

    addCar({
      variables: {
        id: uuidv4(),
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="addCar"
      onFinish={onFinish}
      layout="inline"
      style={{ marginBottom: "20px" }}
    >
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please input car make!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="i.e Audi" />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input car model!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="i.e A4" />
      </Form.Item>
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please input car year!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="i.e 2019" type={"number"} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input car price!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input placeholder="i.e 20000" type={"number"} />
      </Form.Item>
      <Form.Item
        name="personId"
        label="Person"
        rules={[{ required: true, message: "Please input car person!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select placeholder="Select a person">
          {people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true} style={{ marginBottom: "20px" }}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
export default AddCar;
