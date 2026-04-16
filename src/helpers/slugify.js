import React from "react";

const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

export default slugify;