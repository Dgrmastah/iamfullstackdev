import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Home from './Home.jsx';
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./components/InputCreate.jsx";

const App = () => {
  const [data, setData] = useState(null);
  const urlApi = 'http://localhost:3000';

  const fetchData = async () => {
    try {
      const response = await fetch(urlApi);
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Nav />
      <div>
        {data === null 
          ? (<div>cargando...</div>) 
          : 
            <Routes>
              <Route path="/" element={<Home data={data} />} />
              <Route path="/create" element={<InputCreate />} />
              {data.map(item => (
                <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
              ))}
            </Routes>
        }
      </div>
    </Router>
  );
};


const Nav = () => {
  const location = useLocation(); 

  return (
    <nav style={{ display: 'flex', gap: '1rem' }}>
      <Link to="/">Inicio</Link>
      {location.pathname !== "/create" && (
        <Link to="/create">Crear Tarea</Link>
      )}
    </nav>
  );
};

export default App;
