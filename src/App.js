import { Route, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import ItemsView from "./pages/ItemsView";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={()=><ItemsView/>} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
