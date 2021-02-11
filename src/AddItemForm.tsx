import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [inputTitle, setInputTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (inputTitle.trim() !== "") {
            props.addItem(inputTitle)
            setInputTitle("")
        } else {
            setError("Title is required")
        }

    }

    const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input value={inputTitle}
                   onChange={onChangHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )


}