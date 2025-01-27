"use client";

import React from "react";
import parse from "html-react-parser";
// import Prism from "prismjs";

// import "prismjs/components/prism-java";
// import "prismjs/components/prism-c";
// import "prismjs/components/prism-cpp";
// import "prismjs/components/prism-csharp";
// import "prismjs/components/prism-aspnet";
// import "prismjs/components/prism-sass";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-solidity";
// import "prismjs/components/prism-json";
// import "prismjs/components/prism-dart";
// import "prismjs/components/prism-ruby";
// import "prismjs/components/prism-rust";
// import "prismjs/components/prism-r";
// import "prismjs/components/prism-kotlin";
// import "prismjs/components/prism-go";
// import "prismjs/components/prism-bash";
// import "prismjs/components/prism-sql";
// import "prismjs/components/prism-mongodb";
// import "prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface IParsedHTMLProps {
    data: string;
}

const ParsedHTML = ({ data }: IParsedHTMLProps) => {
    // useEffect(() => {
    //     setTimeout(() => {
    //         Prism.highlightAll();
    //     });
    // }, [data]);

    return (
        <div className="text-dark100_light900 markdown w-full min-w-full">
            {parse(data)}
        </div>
    );
};

export default ParsedHTML;
