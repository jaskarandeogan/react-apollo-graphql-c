import React, { useEffect } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";

import { Link } from "react-router-dom";
import ShowMore from "../views/ShowMore";

const getStyles = () => ({
  card: {
    width: 400,
    justifyContent: "center",
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
              <Link
                to={{ pathname: `/card/${id}` }}
                element={<ShowMore  />}
              >
                Learn More
              </Link>,
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
