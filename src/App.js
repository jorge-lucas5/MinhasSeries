import { Header } from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Generos } from "./components/Generos";
import { NovoGenero } from "./components/NovoGenero";
import { EditarGenero } from "./components/EditarGenero";
import { Series } from "./components/Series";

const Home = () => {
  return (
    <h1>Home</h1>
  );
}


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/generos' exact component={Generos}></Route>
          <Route path='/generos/novo' exact component={NovoGenero}></Route>
          <Route path='/generos/:id' exact component={EditarGenero}></Route>

          <Route path='/series' exact component={Series}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
