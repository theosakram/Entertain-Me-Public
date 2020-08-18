import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Details, Edit, Form, Home, Movies, Series } from "./pages";
import { Navbar } from "./components";
import client from "./config/graphql";
import "./App.css";

export const context = React.createContext();

function App() {
  const [useTheme, changeUseTheme] = useState("light");
  return (
    <ApolloProvider client={client}>
      <context.Provider
        value={{ theme: useTheme, changeTheme: (data) => changeUseTheme(data) }}
      >
        <div
          className="App"
          style={{
            background: `${useTheme === "dark" ? "#37383F" : "#FFF"}`,
          }}
        >
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/movies">
                <Movies />
              </Route>
              <Route exact path="/series">
                <Series />
              </Route>
              <Route exact path="/edit/:id" children={<Edit />} />
              <Route exact path="/:type/:id" children={<Details />} />
              <Route exact path="/form">
                <Form />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </context.Provider>
    </ApolloProvider>
  );
}

export default App;
