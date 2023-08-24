import { createContext, } from "react";


const SerachContext = createContext();

const SearchProvider = ({ children }) => {
  

const data = {}

  return <SearchProvider value={data}>{children}</SearchProvider>;
};

export { SearchProvider, SerachContext };
