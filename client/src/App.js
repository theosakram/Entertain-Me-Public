import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Form, Home, Movies, Series } from "./pages";
import { Navbar } from "./components";
import client from "./config/graphql";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
