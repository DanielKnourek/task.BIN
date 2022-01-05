// --- Core ---
import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, UseFormWatch } from "react-hook-form";
// --- react-datepicker ---
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cs from 'date-fns/locale/cs';

// --- custom ---
import { NewTask, FormUtilTypes } from "../../types/interfaces/Task";


type InfoComponentProps = {
    message?: string,
    color: string,
}

const InfoComponent = ({ message, color }: InfoComponentProps) => {

    return (
        <div className={`${color} text-white rounded-t-md mt-2 p-1 w-full text-center`}>
            <p> {message} </p>
        </div>
    )
}

const FormNewTask = function () {

    const defaultFormValues: NewTask = {

        public: "private",
        exiprationTimestamp: (() => {
            const today = new Date();
            const defaultDate = new Date(today);
            defaultDate.setDate(today.getDate() + 1);
            defaultDate.setHours(23, 55, 0, 0);
            return defaultDate;
        })(),
        content: {
            headline: "",
            content: "",
            tags: [],
        }
    }

    const { register, handleSubmit, watch, control, setValue, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<NewTask & FormUtilTypes>({
        defaultValues: { ...defaultFormValues, allowDeadline: false }
    });

    // console.log(errors);

    // console.log(watch("public"))

    const uploadTask = async (data: NewTask & FormUtilTypes) => {
        if (data.allowDeadline == false) {
            data.exiprationTimestamp = new Date(0);
            delete data.allowDeadline;
        }
        // console.log(data);

        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const res = await fetch('/api/test/echo', {
            body: JSON.stringify({
                tasks: [data]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const status = res.status;
        // console.log(status);
        
        await sleep(2000);
        setValue("responseStatus", { status: 500, message: "Error, please try again." })
        // setValue("responseStatus", { status: 201, message: "created" });

        console.log(res)
        await res.json().then(res => {
            console.log(res);
        })

        // console.log(result);
    }

    useEffect(() => {
        if (isSubmitSuccessful && watch("responseStatus.status") == 201) {
            reset({responseStatus: watch("responseStatus")}, {keepDefaultValues: true});
        }
    }, [isSubmitSuccessful, reset, watch])

    return (
        <form onSubmit={handleSubmit(uploadTask)} className="m-5 flex justify-center" >
            <div className="w-auto flex flex-col">
                <div className="bg-gray-200 border-2 border-gray-400 w-auto flex flex-col space-y-2 rounded-sm">
                    <div className="p-2">
                        <div>
                            <label
                                className="bg-purple-600 text-white rounded-t-md my-2 p-1 pb-10;"
                                htmlFor="headline"
                            >
                                Headline
                            </label>
                            <div
                                className="p-1 bg-purple-600 flex justify-center"
                            >
                                <input {...register("content.headline", { required: "Tato položka je vyžadována", maxLength: { value: 100, message: "Maximum znaků je 100" }, minLength: { value: 5, message: "Minium znaků je 5" } })}
                                    className="w-full"
                                    type="text"
                                    id="headline"
                                    autoComplete="headline"
                                />
                            </div>
                            <p className="text-red-600">{errors.content?.headline?.message && `• ${errors.content?.headline?.message}`}</p>
                        </div>
                        <div className="my-5">
                            <label
                                className="bg-purple-600 text-white rounded-t-md p-1 my-2 pb-2"
                                htmlFor="content"
                            >
                                Description
                            </label>
                            <div
                                className="p-1 bg-purple-600 flex justify-center"
                            >
                                <textarea {...register("content.content", { disabled: false })}
                                    className="flex justify-center w-full"
                                    id="content"
                                    autoComplete="description"
                                    autoCorrect="on"
                                />
                            </div>
                            <p className="text-red-600">{errors.content?.content?.message && `• ${errors.content?.content?.message}`}</p>

                        </div>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <label
                                    className={`${watch("public") == "public" ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                                >
                                    Public
                                    <input {...register("public", { required: true })}
                                        className="form-checkbox mx-2"
                                        type="radio"
                                        value="public"
                                    />
                                </label>
                                <div className="mx-2"></div>
                                <label
                                    className={`${watch("public") == "private" ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
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
                        <div className="mt-2"></div>
                        <label className="inline-flex items-center bg-purple-600 text-white rounded-t-md p-1">
                            <input {...register("allowDeadline")}
                                className="form-checkbox"
                                type="checkbox"
                            />
                            <span className="ml-2">Deadline</span>
                        </label>
                        <div
                            className="p-1 bg-purple-600 flex justify-center"
                        >
                            <div>
                                <Controller
                                    control={control}
                                    name="exiprationTimestamp"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DatePicker
                                            className={!watch("allowDeadline") ? "line-through bg-gray-400 text-center" : "text-center w-full"}
                                            disabled={!watch("allowDeadline")}
                                            locale={cs}
                                            showTimeSelect
                                            timeFormat="p"
                                            timeIntervals={30}
                                            dateFormat="Pp"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            selected={value}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 inline-flex">
                        {
                            isSubmitting
                                ? <InfoComponent message="Uploading" color="bg-blue-400" />
                                : watch("responseStatus.status") == 201
                                    ? <InfoComponent message="Successfully created" color="bg-green-500" />
                                    : watch("responseStatus.status")
                                        ? <InfoComponent message={watch("responseStatus.message")} color="bg-red-400" />
                                        : <InfoComponent message="default state" color="invisible" />
                        }
                    </div>
                </div>
                <button disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:ring text-white rounded-b-md p-1"
                    type="submit"
                >
                    Create new Task
                </button>
            </div>
        </form>
    )
}

export default FormNewTask;