import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useTasksContext } from "../../lib/hooks/useTasks"
import FormNewTask from "./FormNewTask"

// type DialogFormProps = {
//   message: string
// }

export const DialogForm = () => {
  // let [isOpen, setIsOpen] = useState(true)
  const { form, message } = useTasksContext();

  function closeModal() {
    form.setIsOpen(false)
  }

  function openModal() {
    form.setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={form.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-25"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div
                  className="flex justify-between items-center"
                >

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 px-2"
                  >
                    {message && message.title}
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                    </p>
                  </div> */}
                  <div className="">
                    <button
                      type="button"
                      className="z-10 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-t-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
                  <FormNewTask defaultValues={form?.defaultFormValues}/>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}