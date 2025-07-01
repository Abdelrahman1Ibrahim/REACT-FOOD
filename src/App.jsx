import GlobalCartConetxt from "./utilits/context/CartContext.jsx";

import Header from "./components/Header";
import Menue from "./components/Menue";

function App() {
  return (
    <GlobalCartConetxt>
      <Header />
      <Menue />
    </GlobalCartConetxt>
  );
}

export default App;
