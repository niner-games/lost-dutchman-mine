import React from "react";
import { SaveListProps } from "../../types/pause";

function SaveList({ saves, setChosenGame }: SaveListProps) {

    return (
        <div>
            {
                saves.map((save) => <div key={save.uuid} onClick={() => {
                    setChosenGame(save.uuid)
                }} style={{
                    cursor: 'pointer',
                    color: '#ff0000',
                }}>
                    {save.uuid} - {save.saveName}
                </div>)
            }
        </div>
    )
}

export default SaveList;