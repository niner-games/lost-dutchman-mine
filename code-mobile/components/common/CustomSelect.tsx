import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { CustomSelectProps, Option } from "../../types/menu";

// CustomSelect component
const CustomSelect = ({ placeHolder, options, onChange, selected, align }: CustomSelectProps) => {
    // State variables using React hooks
    const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState(selected); // Stores the selected value(s)
    const inputRef: any = useRef(); // Reference to the custom select input element

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    const handleInputClick = () => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue) {
            return placeHolder;
        }

        return options.map((el) => el.value === selectedValue ? <div key={el.value}>{el.label}</div> : null)
    };

    const onItemClick = (option: Option) => {
        const newValue = option.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option: Option) => {
        if (!selectedValue) {
            return false;
        }

        return selectedValue === option.value;
    };

    return (
        <div className="custom--dropdown-container">

            <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
                <div className={`dropdown-selected-value ${!selectedValue ? 'placeholder' : ''}`}>{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {
                showMenu && (
                    <div className={`dropdown-menu alignment--${align || 'auto'}`}>
                        {
                            options.map((option, idx) => (
                                <div key={`${option.label}-${idx}`} onClick={() => onItemClick(option)} className={`dropdown-item ${isSelected(option) && "selected"}`} >
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default CustomSelect;