import React from "react";
import { BrowserRouter} from "react-router-dom";

import Index from './pages/index'

function AppRouter() {
  return (
      <BrowserRouter>
        <Index/>
      </BrowserRouter>
  );
}

export default AppRouter;
