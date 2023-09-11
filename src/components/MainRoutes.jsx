import { Router, Route } from "wouter";
import ConfigurationsPage from "./ConfigurationsPage";
import Table from "./Table";

export default function MainRoutes() {
  return (
    <div>
      <Router>
        <Route path="/" component={ConfigurationsPage} />
        <Route path="/clock" component={Table} />
      </Router>
    </div>
  );
}
