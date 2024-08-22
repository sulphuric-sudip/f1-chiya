import React from "react";

export default function useIdentity(names) {
    const [identity, setIdentity] = React.useState(window.localStorage.getItem("identity") || names[0]);

    React.useEffect(() => {
        if (!window.localStorage.getItem("identity")) {
            window.localStorage.setItem("identity", names[0]);
        }
        setIdentity(window.localStorage.getItem("identity"));
    }, []);
    const changeIdentity = (value) => {
        window.localStorage.setItem("identity", value);
        setIdentity(value);
    }

    return [identity, changeIdentity];
}
