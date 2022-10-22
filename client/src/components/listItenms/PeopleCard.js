import React, { useEffect } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";

const getStyles = () => ({
  card: {
    width: 300,
  },
});

const PeopleCard = ({ person }) => {
  const styles = getStyles();
  const { id, firstName, lastName } = person;
  const [update, setUpdate] = React.useState(false);

  useEffect(() => {}, [update]);

  const handleButtonClick = () => setUpdate(!update);

  const RenderForms = () => {
    return (
      <>
        {update ? (
          <UpdatePerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleButtonClick}
          />
        ) : (
          <Card
            style={styles.card}
            actions={[
              <EditOutlined key="edit" onClick={handleButtonClick} />,
              <RemovePerson id={id} />,
            ]}
          >
            {firstName} {lastName}
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <RenderForms />
    </>
  );
};

export default PeopleCard;
