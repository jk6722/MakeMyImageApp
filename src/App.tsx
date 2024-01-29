import { RouterProvider } from "react-router-dom";
import { route } from "./routes/Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={route} />
    </RecoilRoot>
  );
}

export default App;
