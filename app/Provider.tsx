"use client"
import { Provider } from "react-redux";
import { store } from "../GlobalStore/store";

interface IAppProvider {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;