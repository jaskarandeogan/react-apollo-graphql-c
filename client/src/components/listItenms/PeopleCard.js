import { Card } from "antd";

const getStyles = () => ({
  card: {
    width: 300,
  },
});

const PeopleCard = ({ person }) => {
  const { firstName, lastName } = person;
  const styles = getStyles();
  return (
    <Card style={styles.card}>
      {firstName} {lastName}
    </Card>
  );
};

export default PeopleCard;
