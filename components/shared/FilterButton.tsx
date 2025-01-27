import React from "react";
import { Button } from "../ui/button";

interface IFilterButtonProps<T extends unknown = string> {
    value: T;
    active: T;
    label: string;
    onSelectFilter: (v: T) => void;
}

function FilterButton<T>({
    active,
    label,
    value,
    onSelectFilter,
}: IFilterButtonProps<T>) {
    return (
        <Button
            onClick={() => onSelectFilter(value)}
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === value ? "bg-primary-100 text-primary-500" : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500"}`}
        >
            {label}
        </Button>
    );
}

export default FilterButton;
