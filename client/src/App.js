import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import People from "./components/lists/People";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const header = "GraphQL with Apollo Client";
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title title={header} />
        <AddPerson />
        <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
