import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../Routes/Routes";

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  )    
}

export default App;
