import { Form, Input, Button } from "antd";
import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";
import { v4 as uuidv4 } from "uuid";

function AddPerson() {
  const [id] = React.useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState();

  // To disable submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="addPerson"
      size="large"
      style={{ alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e8e8e8", paddingBottom: "40px" }}
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        label="First Name:"
        name="firstName"
        rules={[{ required: true, message: "please input your first name" }]}
      >
        <Input placeholder="i.e Leonardo" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "please input your first name" }]}
      >
        <Input placeholder="i.e Dicap" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}

export default AddPerson;
