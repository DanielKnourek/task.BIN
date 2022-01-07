// --- Core ---
import { useForm } from "react-hook-form";
// --- react-datepicker ---
import "react-datepicker/dist/react-datepicker.css";

// --- custom ---
import { Task } from "../../types/interfaces/Task";
import useStore from "../../lib/hooks/useStore";
import { FilterCompleted, method, OrderByDate } from "../../lib/store/listFilters";

export type FormFiltersData = {
    filterCompleted: FilterCompleted | 'all',
    filterAccess: Task['status']['access'] | 'all',

    sortByDate: OrderByDate,
}

type FormFiltersParams = {
}

const FormFilters = function ({ }: FormFiltersParams) {
    const { listFilters: { methods }, setListFilters } = useStore();

    // const have = (arr: method[], aMethod: method) => { return arr.find( e => e == aMethod)}
    const defaultFormValues: FormFiltersData = {
        filterCompleted: 'all',
        filterAccess: 'all',

        sortByDate: "byDateDesc",
    }

    //TODO reset to default
    const { register, handleSubmit, watch, reset, formState: { isDirty} } = useForm<FormFiltersData>({
        defaultValues: { ...defaultFormValues }
    });


    const setFilters = async (data: FormFiltersData) => {
        let filterArray: method[] = [];
        if (data.filterAccess != 'all') {
            filterArray.push(data.filterAccess)
        }
        if (data.filterCompleted != 'all') {
            filterArray.push(data.filterCompleted)
        }
            filterArray.push(data.sortByDate)
        setListFilters({type: 'set', data: filterArray})
        
    }

    return (
        <form onSubmit={handleSubmit(setFilters)} className="w-full" >
            <div className="w-auto flex flex-col">
                <div className="bg-gray-200 border-2 border-gray-400 w-auto flex flex-col space-y-2 rounded-sm">
                    <div className="p-2">

                        <h3 className="bg-purple-600 text-white rounded-md p-1 px-2 my-2 pb-2 w-min">
                            Filters:
                        </h3>

                        <div className="inline-flex justify-start w-full">
                            <label
                                className={`${watch("filterCompleted") == 'all' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                All
                                <input {...register("filterCompleted")}
                                    className="form-checkbox mx-2"
                                    name="filterCompleted" type="radio" value="all" />

                            </label>
                            <div className="mx-2"></div>
                            <label
                                className={`${watch("filterCompleted") == 'completed' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Completed
                                <input {...register("filterCompleted")}
                                    className="form-checkbox mx-2"
                                    name="filterCompleted" type="radio" value="completed" />

                            </label>
                            <div className="mx-2"></div>
                            <label
                                className={`${watch("filterCompleted") == 'incomplete' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Incomplete
                                <input {...register("filterCompleted")}
                                    className="form-checkbox mx-2"
                                    name="filterCompleted" type="radio" value="incomplete" />
                            </label>
                        </div>

                        <div className="my-4"></div>

                        <div className="inline-flex justify-start w-full">
                            <label
                                className={`${watch("filterAccess") == 'all' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                All
                                <input {...register("filterAccess")}
                                    className="form-checkbox mx-2"
                                    name="filterAccess" type="radio" value="all" />

                            </label>
                            <div className="mx-2"></div>
                            <label
                                className={`${watch("filterAccess") == 'public' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Public
                                <input {...register("filterAccess")}
                                    className="form-checkbox mx-2"
                                    name="filterAccess" type="radio" value="public" />

                            </label>
                            <div className="mx-2"></div>
                            <label
                                className={`${watch("filterAccess") == 'private' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Private
                                <input {...register("filterAccess")}
                                    className="form-checkbox mx-2"
                                    name="filterAccess" type="radio" value="private" />
                            </label>
                        </div>
                        <div className="my-4"></div>

                        
                        <h3 className="bg-purple-600 text-white rounded-md p-1 px-2 my-2 pb-2 w-min">
                            Order:
                        </h3>


                        <div className="inline-flex justify-start w-full">
                            <label
                                className={`${watch("sortByDate") == 'byDateDesc' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Ascending
                                <input {...register("sortByDate")}
                                    className="form-checkbox mx-2"
                                    name="sortByDate" type="radio" value="byDateDesc" />

                            </label>
                            <div className="mx-2"></div>
                            <label
                                className={`${watch("sortByDate") == 'byDateAsc' ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                            >
                                Descending
                                <input {...register("sortByDate")}
                                    className="form-checkbox mx-2"
                                    name="sortByDate" type="radio" value="byDateAsc" />

                            </label>
                        </div>
                    </div>
                </div>
                        <input 
                        className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:ring text-white rounded-b-md p-1"
                        type="submit"
                        value={"Change filters"}
                        />
            </div>
        </form>
    )
}

export default FormFilters;
