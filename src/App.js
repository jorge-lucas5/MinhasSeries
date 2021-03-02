import { Header } from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Generos } from "./components/Generos";
import { NovoGenero } from "./components/NovoGenero";
import { EditarGenero } from "./components/EditarGenero";

const Home = () => {
  return (
    <h1>Home</h1>
  );
}


function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    });
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/generos' exact component={Generos}></Route>
          <Route path='/generos/novo' exact component={NovoGenero}></Route>
          <Route path='/generos/:id' exact component={EditarGenero}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
