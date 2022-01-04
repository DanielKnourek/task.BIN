import { useForm } from "react-hook-form";
import { NewTask } from "../../types/interfaces/Task";
import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";
// import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import cs from 'date-fns/locale/cs';

import "react-datepicker/dist/react-datepicker.css";

const FormNewTask = function () {
    const [startDate, setStartDate] = useState(new Date());
    const [useDeadline, setUseDeadline] = useState(false);

    //   const { data: session, status } = useSession();
    //   let displayName = "{user}";

    //   if (status === "authenticated" && session) {
    //     displayName = (session.user.name === undefined) ? displayName : session.user.name;
    //     return (
    //       <>
    //         <br />
    //         Signed in as {displayName}<br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //       </>
    //     )
    //   }
    //   return (
    //     <>
    //       Not signed in <br />
    //       <button onClick={() => signIn()}>Sign in</button>
    //     </>
    //   )
    const defaultFormValues: NewTask = {
        public: false,
        exiprationTimestamp: new Date(0),
        content: {
            headline: "",
            content: "",
            tags: [],
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<NewTask>({
        defaultValues: defaultFormValues
    });
    // const onSubmit = data => console.log(data);

    console.log(errors);


    const registerUser = async (data: NewTask) => {
        // const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        // event.preventDefault()
        data.exiprationTimestamp = startDate
        console.log(data);


        // const foo = event.target as any;
        // const boo : EventTarget = {

        // }
        const res = await fetch('/api/test/echo', {
            body: JSON.stringify({
                foo: "dsa",
                name: data
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json().then(res => {
            console.log(res);
        })
        // result.user => 'Ada Lovelace'
        console.log(result);
    }
    return (
        <form onSubmit={handleSubmit(registerUser)} className="m-5 flex justify-center" >
            <div className="bg-gray-200 border-2 border-gray-400 py-2 pr-2 w-auto flex flex-col space-y-2 rounded-sm">
                <div className="p-2">
                    <div>
                        <label
                            className="bg-purple-600 text-white rounded-md my-2 p-1 pb-2 z-20"
                            htmlFor="headline"
                        >
                            Headline
                        </label>
                        <div
                            className="z-10"
                        >

                            <input {...register("content.headline", { required: "This field is required.", maxLength: 100, minLength: 5 })}
                                className="flex justify-center z-10 w-max"
                                type="text" required
                                id="headline" 
                                autoComplete="headline" 
                            />
                        </div>
                    </div>
                    <div className="my-5">
                        <label
                            className="bg-purple-600 text-white rounded-md my-2 p-1 pb-2"
                            htmlFor="content"
                        >
                            Description
                        </label>
                        <textarea {...register("content.content", { disabled: false })}
                            className="flex justify-center z-10 w-max"
                            id="content" 
                            autoComplete="description"
                            autoCorrect="on"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <label
                                className="mx-2"
                            >
                                Public
                                <input {...register("public")}
                                    className="form-checkbox mx-2"
                                    type="radio" defaultChecked
                                    value="public"
                                />
                            </label>
                            <div className="mx-2"></div>
                            <label
                                className="mx-2"
                            >
                                Private
                                <input {...register("public", { required: true })}
                                    className="form-checkbox mx-2"
                                    type="radio"
                                    value="private"
                                />
                            </label>
                        </label>
                    </div>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                className="form-checkbox"
                                type="checkbox"
                                checked={useDeadline}
                                onChange={e => setUseDeadline(e.target.checked)}
                            />
                            <span className="ml-2">Deadline</span>
                        </label>
                    </div>
                    <div>
                        <DatePicker {...register("exiprationTimestamp")}
                            selected={startDate}
                            onChange={(date) => date && setStartDate(date)}
                            locale={cs}
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="Pp"
                            disabled={!useDeadline}
                        />
                    </div>
                </div>
            </div>
            <button
                className="bg-blue-500 text-white rounded-md m-2 p-1"
                type="submit"
            >
                Register
            </button>
        </form>
    )
}

export default FormNewTask;