import React from "react";

const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
}

export default cn;