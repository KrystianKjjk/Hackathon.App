import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useTimeout = <T>(
    initialValue: T,
    timeout: number = 1000
): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timerHandler = setTimeout(() => setValue(initialValue), timeout);
        return () => clearTimeout(timerHandler);
    }, [value, timeout, initialValue]);
    return [value, setValue];
};

export default useTimeout;
