import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import Show from "./components/views/ShowMore";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<Show />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
