'use client';

import {memo, useState} from "react";
import {themesByName} from 'ace-builds/src-noconflict/ext-themelist';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";
import useAsyncEffect from "use-async-effect";


const Code = function Code({theme, language}: {
    theme: keyof typeof themesByName,
    language: string,
}) {
    const [code, setCode] = useState('');
    const [loadedTheme, setLoadedTheme] = useState('');
    const [loadedLanguage, setLoadedLanguage] = useState('');

    // load the language styles
    useAsyncEffect(async () => {
        console.log('Loading modes for Ace:', language);
        await import(`ace-builds/src-noconflict/mode-${language}`);
        await import(`ace-builds/src-noconflict/snippets/${language}`);
        setLoadedLanguage(language);
    }, [language]);

    // load the theme styles
    useAsyncEffect(async () => {
        const themeName = String(theme);
        await import(`ace-builds/src-noconflict/theme-${themeName}`);
        setLoadedTheme(themeName);
    }, [theme]);

    return <>
        <AceEditor
            placeholder="Start typing your code..."
            mode={loadedLanguage}
            theme={loadedTheme}
            value={code}
            width='100%'
            height='100%'
            fontSize={14}
            onChange={value => {
                // console.log('editor-set-code', value);
                setCode(value);
            }}
            showPrintMargin
            showGutter
            highlightActiveLine

            name="editor_div"
            setOptions={{
                useWorker: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            }}
            editorProps={{ $blockScrolling: true }}
            onLoad={editorInstance => {
                editorInstance.container.style.resize = "both";
                // mouseup = css resize end
                document.addEventListener('mouseup', _e => editorInstance.resize());
            }}
        />
    </>
};

export default memo(Code);