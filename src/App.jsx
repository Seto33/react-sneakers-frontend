import "./style";
import {Suspense} from "react";
import {Header,Basket} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, Favorite, Shop, NotFound} from "./pages";

function App() {

     return (
    <Router>
    <>
    <Basket />
    <Header />
    <Suspense>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite/>} />
      <Route path="/shop" element={<Shop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
     </>
     </Router>
  )
}

export default App;
