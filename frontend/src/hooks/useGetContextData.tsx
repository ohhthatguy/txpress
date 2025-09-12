import {useContext} from 'react';
import { GlobalContext } from '../lib/context';

const useGetContextData = () => {
    
   const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("MyComponent must be used within a GlobalContextProvider");
    }
    return context;
}

export default useGetContextData;



