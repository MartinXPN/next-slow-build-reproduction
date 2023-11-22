'use client';

import {memo, useState} from "react";
import dynamic from "next/dynamic";

const Code = dynamic(() => import('./Code'), {ssr: false});

function CodePage() {
    const [theme, setTheme] = useState('tomorrow');
    const [language, setLanguage] = useState('javascript');

    return <>
        {language === 'javascript' && <Code theme={theme} language={language} />}
    </>
}

export default memo(CodePage);
