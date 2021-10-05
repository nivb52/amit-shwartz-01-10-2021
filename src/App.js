import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import ItemsView from "./pages/itemsPurchase/ItemsView";
import StoreView from "./pages/storePurchase/StoreView";
import "./_inputs.scss";
import "./_utilities.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={() => <ItemsView />} />
        <Route exact path="/stores" component={() => <StoreView />} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
