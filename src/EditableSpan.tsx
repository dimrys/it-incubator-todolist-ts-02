import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.value)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}