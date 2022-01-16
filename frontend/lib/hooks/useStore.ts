import { useContext } from "react";
import { ListFilters } from "../store";


const useStore = () => {
    const listFiltersDispatch = useContext(ListFilters.Dispatch)
    const listFiltersState = useContext(ListFilters.State)

    return {
        listFilters: listFiltersState,
        setListFilters: listFiltersDispatch,
    }
}

export default useStore;