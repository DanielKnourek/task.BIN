// --- Core ---
import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, UseFormWatch } from "react-hook-form";
// --- react-datepicker ---
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cs from 'date-fns/locale/cs';

// --- custom ---
import { NewTask, FormUtilTypes, FormOperationResponse } from "../../types/interfaces/Task";
import apiFetch from "../../lib/apiFetch"
import useTasks, { useTasksContext } from "../../lib/hooks/useTasks";


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

type FormNewTaskParams = {
    defaultValues?: NewTask,
}

const FormNewTask = function ({ defaultValues }: FormNewTaskParams) {
    const { message, type: formType, form } = useTasksContext();
    const { onCreate, onUpdate } = useTasks();

    const onSubmitHandler = (formType == 'edit')  
        ? (FormReqData: NewTask) => {
            if (!!form?.defaultFormValues) {
                return onUpdate(FormReqData, form.defaultFormValues.id)
            }
            throw Error("Cannot update.")
        }
        : onCreate;
    
    const defaultFormValues: NewTask = !!defaultValues ? defaultValues : {
        status: {
            access: "private",
        },
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
        defaultValues: { ...defaultFormValues, allowDeadline: !!defaultValues?.exiprationTimestamp }
    });

    const uploadTask = async (data: NewTask & FormUtilTypes) => {
        setValue("responseStatus", undefined);
        if (data.allowDeadline == false) {
            data.exiprationTimestamp = new Date(0);
        }
        // const { allowDeadline, responseStatus, ...OnlyData } = data;
        const FormReqData: NewTask = {
            content: data.content,
            status: {
                access: data.status.access,
            },
            exiprationTimestamp: data.exiprationTimestamp,
        }

        await onSubmitHandler(FormReqData)
            .then(data => {
                // console.log(data) //TODO remove debug
                setValue("responseStatus", { status: 201, message: message.success });

            }).catch(err => {
                setValue("responseStatus", { status: 500, message: message.error })
            })


        // const res = await apiFetch<FormOperationResponse>('/api/task/create',
        //     {
        //         tasks: [FormReqData],
        //     })
        //     .then(data => {
        //         // console.log(data) //TODO remove debug
        //         setValue("responseStatus", { status: 201, message: "created" });

        //     }).catch(err => {
        //         setValue("responseStatus", { status: 500, message: "Something went wrong, try again." })
        //     })
    }

    useEffect(() => {
        if (isSubmitSuccessful && watch("responseStatus.status") == 201) {
            reset({ responseStatus: watch("responseStatus") }, { keepDefaultValues: true });
        }
    }, [isSubmitSuccessful, reset, watch])

    return (
        <form onSubmit={handleSubmit(uploadTask)} className="w-full" >
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
                            <div className="inline-flex justify-around w-full">
                                <label
                                    className={`${watch("status.access") == "public" ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                                >
                                    Public
                                    <input {...register("status.access", { required: true })}
                                        className="form-checkbox mx-2"
                                        type="radio"
                                        value="public"
                                    />
                                </label>
                                <div className="mx-2"></div>
                                <label
                                    className={`${watch("status.access") == "private" ? "bg-purple-600" : "bg-gray-600"} focus:ring text-white rounded-md p-1 mx-2`}
                                >
                                    Private
                                    <input {...register("status.access", { required: true })}
                                        className="form-checkbox mx-2"
                                        type="radio"
                                        value="private"
                                    />
                                </label>
                            </div>
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
                            <div className="w-full">
                                <Controller
                                    control={control}
                                    name="exiprationTimestamp"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DatePicker
                                            className={`${!watch("allowDeadline") ? "line-through bg-gray-400" : ""} text-center w-full`}
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
                                    ? <InfoComponent message={message.success} color="bg-green-500" />
                                    : watch("responseStatus.status")
                                        ? <InfoComponent message={`Error: ${watch("responseStatus.message")}`} color="bg-red-400" />
                                        : <InfoComponent message="default state" color="invisible" />
                        }
                    </div>
                </div>
                <button disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:ring text-white rounded-b-md p-1"
                    type="submit"
                >
                    {message.title}
                </button>
            </div>
        </form>
    )
}

export default FormNewTask;
