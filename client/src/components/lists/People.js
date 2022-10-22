import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import PeopleCard from '../listItenms/PeopleCard'

// import Person from
const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : (</p>;
  console.log("data", data.people);

  return (
    <List style={styles.list}>
      {data.people.map((person) => (
        <List.Item key={person.id}>
          <PeopleCard person={person} />
        </List.Item>
      ))}
    </List>
  );
};
export default People;
