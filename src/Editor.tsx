import {useEffect, useState, useRef } from 'react';
import { Story as ParsedStory } from "inkjs/compiler/Parser/ParsedHierarchy/Story";

import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useCompiler } from './Editor/useCompiler';
import { Knot } from 'inkjs/compiler/Parser/ParsedHierarchy/Knot';
import { isKnot, languageSuggestions } from './Editor/ink-language';
import { ActionBar } from './Editor/ActionBar';
import { FileManager } from './Editor/FileManager';


export const Editor: React.FC<{
    setStory: any;
}> = ({setStory}) => {

    const defaultPrompt = `LIST letters = a,b,c
    Once upon a time...
    -(opts)
    + Choice A.
    + Choice B.
    + Choice C.
        ->knot
   
   - They lived happily ever after {opts}.
       -> opts

== knot ==
Another castle
->END
   `

    const monaco = useMonaco();
    const editorRef = useRef<any>(null);

    const [ink, setInk] = useState<string>(defaultPrompt)
    const [parsedStory, setParsedStory] = useState<ParsedStory>()
    const [parseErrors, setParseErrors] = useState<Issue[]>()

    const [decorations, setDecorations] = useState([])

    const [showFileManager, setFileManager] = useState(false);

    const toggleFileManager = () => {
      setFileManager(!showFileManager);
    }

    /*
     * Decorate gutter and lines on error
     */
    useEffect(() => {
      if (monaco && editorRef.current && parseErrors) {
        const editor = editorRef.current;
        let newDecorations = parseErrors.map(e => {
          return {
            range: new monaco.Range(e.lineNumber, 1, e.lineNumber, 1),
            options: {
              isWholeLine: true,
              // glyphMarginClassName: e.type.includes("ERROR") ? 'errorIcon' 
              //                     : e.type.includes("WARNING") ? 'warningIcon' 
              //                     : 'infoIcon',
              // linesDecorationsClassName: e.type.includes("ERROR") ? 'errorLineDecoration' 
              //                          : e.type.includes("WARNING") ? 'warningLineDecoration' 
              //                          : 'infoLineDecoration',
              // hoverMessage: {value: e.msg}
            }
          }
        })
        setDecorations(editor.deltaDecorations(decorations, newDecorations))
      }
    }, [monaco, editorRef, parseErrors]);

    /*
     *    Fold the knots at the toplevel
     */
    useEffect(() => {
      if(monaco && parsedStory){
        const registeredProvider = monaco.languages.registerFoldingRangeProvider('ink', {
          provideFoldingRanges: function () {
            return parsedStory.content
                      .filter(c => c.debugMetadata !== null)
                      .map(c => ({
                            start: c.debugMetadata!.startLineNumber,
                            end: Math.max(c.debugMetadata!.startLineNumber, c.debugMetadata!.endLineNumber - 1),
                            kind: monaco.languages.FoldingRangeKind.Region
              }))
          }
        })
        return () => {
          registeredProvider.dispose()
        }
      }

    }, [monaco, parsedStory])

    /*
     *    Provide autocompletion
     */
    useEffect(() => {
      if(monaco && parsedStory){
        const registeredProvider = monaco.languages.registerCompletionItemProvider('ink', {
          provideCompletionItems: function () {
            const knotSuggestions = parsedStory.content
                      .filter(c => c.debugMetadata !== null)
                      .filter(isKnot)
                      .map( c => ({
                          label: c.name,
                          kind: monaco.languages.CompletionItemKind.Text,
                          insertText: `-> ${c.name}`
                      }))
            
            const languageSugg = languageSuggestions(monaco)


            return { suggestions: knotSuggestions.concat(languageSugg) }
          }
        })
        return () => {
          registeredProvider.dispose()
        }
      }

    }, [monaco, parsedStory])

    useEffect(() => {
        const {story, parsedStory, parseErrors}  = useCompiler(ink)
        if(story) setStory(story);
        setParsedStory(parsedStory);
        setParseErrors(parseErrors);
    }, [ink, monaco, editorRef])

    const onChange = (value: string | undefined) => {
      if(value) setInk(value);
    }
    const handleEditorDidMount = (editor: any, monaco: any) => {
      editorRef.current = editor; 
      monaco.languages.register({
        id: 'ink'
      });
    }
    
    const editorLeft = 48 + (showFileManager ? 120 : 0)
    return (
      <div className="monaco-split-view2" style={{padding: 0}}>
        <div className="monaco-scrollable-element">
          <div className="split-view-container">
            <ActionBar 
                toggleFileManager={toggleFileManager} 
            />
            <FileManager visible={showFileManager} />

            <div className="split-view-view visible"
              style={{
                left: `${editorLeft}px`, 
                width: `calc( 100% - ${editorLeft}px )`,
                height: '100%'
              }}
            >
              <MonacoEditor
                className="editor"
                theme="vs-dark"
                height="100%"
                width="auto"
                defaultValue={ink}
                language="ink"
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                  glyphMargin: true
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )

}