import { useState, useEffect } from "react";

type SelectionState = {
    index: number,
    hoveringIndex: number,
    selectedIndex: number
}

type FaceProp = {
    selected: boolean;
}

export type HappyProps = {
    onChange: Function;
    defaultValue: string;
    id: string;
}

function isSelected(selectionState: SelectionState): boolean {
    if (selectionState.hoveringIndex >= selectionState.index && selectionState.selectedIndex == 0) {
        return true;
    }
    if (selectionState.selectedIndex >= selectionState.index) {
        return true;
    }
    return false;
}

function Face(prop: FaceProp) {
    return (
        <svg className={prop.selected ? 'fill-current text-blue-700 bg-black-200' : ''} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.045 17.51h-.015c-2.285 0-4.469-1.189-6.153-3.349l.789-.614c1.489 1.911 3.394 2.963 5.364 2.963h.013c1.987-.004 3.907-1.078 5.408-3.021l.791.611c-1.693 2.194-3.894 3.405-6.197 3.41zm-3.468-10.01c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" /></svg>
    )
}

const happy = (props: HappyProps) => {
    const [hoveringIndex, setHoveringIndex] = useState(0);

    function determineValue(value: string) {
        const parsed = parseInt(value);
        const index = isNaN(parsed)? 0: parsed;
        return index;
    }
    const index = determineValue(props.defaultValue);
    const [selectedIndex, setSelectedIndex] = useState(index);
    function choose(index: number) {
        setSelectedIndex(() => index);
        props.onChange(index);
    }
    useEffect(() =>{
        const index = determineValue(props.defaultValue);
        setSelectedIndex(index);
    }, [props.defaultValue])

    return (
        <>
            <ul className="mt-4 pl-3 grid grid-cols-3">
                {[1, 2, 3, 4, 5, 7, 8, 9, 10].map((index: number) => (
                    <li className=""
                        key={index}
                        onMouseEnter={() => setHoveringIndex(index)}
                        onMouseLeave={() => setHoveringIndex(-1)}
                        onMouseUp={() => index == selectedIndex ? choose(0) : choose(index)}
                    >
                        <span className={index < 10? 'pl-2':'pl-1'}>{index}</span>
                        <Face selected={isSelected({index, hoveringIndex, selectedIndex})}></Face>
                    </li>
                ))}
            </ul>
            <input type='hidden' id={props.id} value={selectedIndex} ></input>
        </>)
}

export default happy;