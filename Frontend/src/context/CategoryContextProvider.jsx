import { CategoryContext } from "./CategoryContext";
import { useState } from "react";


export const CategoryContextProvider = ({children}) =>{
    const [category, setCategory] = useState("");
    return (
      <>
        <CategoryContext.Provider value={{category, setCategory}}>{children}</CategoryContext.Provider>
      </>
    );
}