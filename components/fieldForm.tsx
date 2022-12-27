import { useEffect, useState } from "react";
import { ComponentType, Field } from "../app/page";
import { showDate } from "../utils/renderHelper";
import Happy from "./happy";

interface FieldFormState { title: string, fields: Array<Field>, mark: string };
interface FieldFormProps {
    title: string, fields: Array<Field>, mark: string,
    updateFieldData: Function,
    saveData: Function
};

const FieldForm = (props:FieldFormProps) => {

    const [state, setState] = useState({ title: props.title, fields: props.fields, mark: props.mark } as FieldFormState );

    const clearAllData = () => {
        for (var index = 0; index < state.fields.length; index++) {
            props.updateFieldData(index, "");
            const fieldElement = document.getElementById('fieldData-' + index) as HTMLInputElement;
            fieldElement.value = '';
            fieldElement.defaultValue = '';
            const event = new Event("change");
            fieldElement.dispatchEvent(event);
        }
        setState(old => ({ title: old.title, fields: [... old.fields], mark: old.mark }));

    }

    useEffect(() =>{
        setState(() => ({ title: props.title, fields: [... props.fields], mark: props.mark }));
    }, [props])

    return (
        <>
            {!state.title || (
                <><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Fill {state.title} <span className="text-sm">- {showDate(state.mark)}</span></h5>
                    <div className="font-normal text-gray-700 dark:text-gray-400">
                        {state.fields.map((field, index: number) => (
                            <div key={index} className="mb-6">
                                <label title={field.value} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{field.fieldName} </label>
                                {field.componentType == ComponentType.NONE &&
                                    <input onChange={e => props.updateFieldData(index, e.target)}
                                        id={"fieldData-" + index}
                                        defaultValue={field.value}
                                        type={field.fieldType}
                                        checked={field.value == 'true'}
                                        className="b)g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                }
                                {field.componentType == ComponentType.HAPPY &&
                                    <Happy id={"fieldData-" + index} onChange={(value: string) => props.updateFieldData(index, value)}
                                        defaultValue={field.value}
                                    ></Happy>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3">
                        <button type="submit" onClick={e => clearAllData()} className=" text-white bg-blue-700 float-right hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset</button>
                        <div></div>
                        <button type="submit" onClick={e => props.saveData()} className="w-50 text-white bg-blue-700 float-right hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    </div>
                </>)}
        </>
    )

}

export default FieldForm;