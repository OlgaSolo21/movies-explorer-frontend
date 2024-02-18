import PromoProject from "../Main/PromoProject/PromoProject";
import {Route, Routes} from "react-router-dom";
import AboutProject from "../Main/AboutProject/AboutProject";
import AboutTechs from "../Main/AboutTechs/AboutTechs";

function App() {
  return (
      <>
          <Routes>
              <Route path="/" element={<PromoProject/>}>
                  <Route path="aboutProject" element={<AboutProject/>} />
                  <Route path="aboutTechs" element={<AboutTechs/>} />
              </Route>
          </Routes>
      </>
  )
}

export default App;
