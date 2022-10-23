import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";

import { UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [id] = React.useState(props.id);
  const [year, setYear] = React.useState(props.year);
  const [make, setMake] = React.useState(props.make);
  const [model, setModel] = React.useState(props.model);
  const [price, setPrice] = React.useState(props.price);
  const [personId, setPersonId] = React.useState(props.personId);

  //   console.log("UpdateCar props", props);

  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState(); // To disable submit button at the beginning.

  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { make, model, year, price, personId } = values;
    updateCar({
      variables: {
        id,
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        personId,
      },
    });
    props.onButtonClick();
  };
  const updateStates = (state, value) => {
    props.updateStates(state, value);
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

  return (
    <Form
      form={form}
      name="updateCar"
      onFinish={onFinish}
      layout="inline"
      style={{ marginBottom: "20px" }}
      initialValues={{
        make,
        model,
        year,
        price,
        personId,
      }}
    >
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please input car make!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input
          placeholder="i.e Audi"
          value={make}
          onChange={(e) => updateStates("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input car model!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input
          placeholder="i.e A4"
          value={model}
          onChange={(e) => updateStates("model", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please input car year!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input
          placeholder="i.e 2019"
          value={year}
          onChange={(e) => updateStates("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input car price!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input
          placeholder="i.e 20000"
          value={price}
          onChange={(e) => updateStates("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        label="Person"
        rules={[{ required: true, message: "Please input car person!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select
          placeholder="Select a person"
          value={personId}
          onChange={(value) => updateStates("personId", value)}
        >
          {props.people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={() => props.onButtonClick()}>
        Cancel
      </Button>
    </Form>
  );
};
export default UpdateCar;
