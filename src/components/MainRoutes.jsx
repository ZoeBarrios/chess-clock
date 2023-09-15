import { Router, Route } from "wouter";
import ConfigurationsPage from "./ConfigurationsPage";
import Table from "./Table";
import StateProvider from "./StateProvider";
import PreferencesProvider from "./PreferencesProvider";

export default function MainRoutes() {
  return (
    <StateProvider>
      <PreferencesProvider>
        <Router>
          <Route path="/" component={ConfigurationsPage} />
          <Route path="/clock" component={Table} />
        </Router>
      </PreferencesProvider>
    </StateProvider>
  );
}
