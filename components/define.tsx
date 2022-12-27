import { Component, useEffect, useState } from "react";
import { Field, TitleData } from "../app/page";

interface DefineDefState { fields: Array<Field>, group: string, title: string };
interface DefineProps {
    fields: Array<Field>, group: string, title: string,
    setGroup: Function,
    setTitle: Function,
    add: Function,
    take: Function,
    updateField: Function
};

const Define = (props: DefineProps) => {

    const [state, setState] = useState({ fields: props.fields, group: props.group, title: props.title } as DefineDefState);

    useEffect(() => {
        setState(() => ({ fields: props.fields, group: props.group, title: props.title }));
    }, [props])

    return (
        <>
            <h5 className="mb-2 pt-4 pl-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Define</h5>
            <div className="font-normal p-12 text-gray-700 dark:text-gray-400">
                <form >
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Group</label>
                        <input defaultValue={state.group} onChange={e => props.setGroup(e.target.value)} type="text" id="group" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input onChange={e => props.setTitle(e.target.value)} defaultValue={state.title} type="text" id="group" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className='grid grid-cols-3 gap-10'>

                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Field name</label>
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Field Type </label>
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
                    </div>

                    {state.fields.map((field, index: number) => (
                        <div key={index} className='grid grid-cols-3 gap-10'>
                            <div className="w-full ">
                                <input onChange={e => props.updateField(index)} defaultValue={field.fieldName} type="text" id={"fieldName-" + index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                                <select defaultValue={field.fieldType} onChange={e => props.updateField(index)} id={"fieldType-" + index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="text">Text</option>
                                    <option value="checkbox">Tick Box</option>
                                    <option value="color">Colour</option>
                                    <option value="email">Email</option>
                                    <option value="image">Image</option>
                                    <option value="month">Month</option>
                                    <option value="number">Number</option>
                                    <option value="range">Range</option>
                                    <option value="tel">Telephone</option>
                                    <option value="time">Time</option>
                                    <option value="url">URL</option>
                                    <option value="week">Week</option>
                                    <option value="date">Date</option>
                                    <option value="happy">Happy</option>
                                </select>
                            </div>
                            <button type="button" onClick={() => props.take(index)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 w-10 h-10  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </form>
                <div className='float-right' style={{ float: 'right' }}>
                    <button type="button" onClick={() => props.add()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium float-right rounded-lg text-sm w-8 p-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Icon description</span></button>

                </div>
            </div>

        </>
    )

}

export default Define;