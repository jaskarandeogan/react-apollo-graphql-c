import React from "react";
import { Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client";

import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState();

  // To disable submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="updatePerson"
      size="large"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
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
        <Input placeholder="i.e Da Vinci" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Conatct
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdatePerson;
