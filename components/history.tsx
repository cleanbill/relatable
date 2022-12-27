import { useState } from "react";
import { useEffect } from "react";
import { TitleData } from "../app/page";
import { showDate } from "../utils/renderHelper";

interface HistoryState { titleData: TitleData, keys: Array<string>, selected: string };
interface HistoryProps { titleData: TitleData, overrideFields: Function, updateTitleData: Function };

const History = (props:HistoryProps) =>{

    useEffect(() =>{
        resetState(props);
    }, [props])

    const [state, setState] = useState({
        titleData: { titleName: 'No History', sessions: {} },
        keys: new Array(),
        selected: ''
    } as HistoryState);

   const resetState = (props: HistoryProps) => {
        const sessions = props.titleData.sessions;
        if (!sessions) {
            return;
        }
        const keys = Object.keys(sessions) as Array<string>;
        setState(() => ({ titleData: props.titleData, keys, selected: '' }));
    }

    const show = (key: string) => {
        const selected = (key == state.selected) ? "" : key;
        setState((pre: HistoryState) => ({ titleData: pre.titleData, keys: pre.keys, selected }));
        const fieldDefs = state.titleData.sessions[key].fields;
        props.overrideFields(fieldDefs,  key);
    }

    const del = (key: string) => {
        delete state.titleData.sessions[key];
        Object.keys(state.titleData.sessions).filter(mark => mark != key);
        props.updateTitleData(key);
    }

    return (
        <div >
            {state?.keys && state.keys.map((key: string) => (
                <div className="w-100 mt-4" key={key}>

                    <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">

                        <div onClick={() => show(key)} className="flex-1 ml-3 w-8 whitespace-nowrap">{showDate(key)}</div>
                        <div onClick={() => del(key)} className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-900 text-white  bg-red-100 hover:bg-red-800">X</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default History;