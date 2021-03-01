import { Header } from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = () => {
  return (
    <h1>Home</h1>
  );
}

const Generos = () => {
  return (
    <h1>Gêneros</h1>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}></Route>
        <Route path='/generos' component={Generos}></Route>
      </div>
    </Router>
  );
}

export default App;
