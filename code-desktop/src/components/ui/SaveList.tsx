import React from "react";
import { SaveListProps } from "../../types/pause";

function SaveList({ saves }: SaveListProps) {

    return (
        <div>
            {
                saves.map((save) => <div>
                    {save.uuid} - {save.saveName}
                </div>)
            }
        </div>
    )
}

export default SaveList;