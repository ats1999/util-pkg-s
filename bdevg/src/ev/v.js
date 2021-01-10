import React,{useEffect,useRef,useState} from 'react';
import { Viewer } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
// import editor plugin
import chart from '@toast-ui/editor-plugin-chart';
import uml from '@toast-ui/editor-plugin-uml';
// colorSyntaxPlugin css file
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import tableMergeCell from '@toast-ui/editor-plugin-table-merged-cell';

// custom
import {customHTMLRenderer} from "./util/customHTMLRenderer";

export default function E(props) {
    const {md,pluginsArray} = props;
        
    // constants
    const chartOptions = {
        minWidth: 100,
        maxWidth: 600,
        minHeight: 100,
        maxHeight: 300
    };
    const umlOptions = {
        rendererURL:"https://www.plantuml.com/plantuml/svg/"
    }

   return <Viewer
            initialValue={md}                       
            plugins={[[chart,chartOptions],colorSyntaxPlugin,tableMergeCell,uml,...pluginsArray]}
            // custom html renderer
            customHTMLRenderer={customHTMLRenderer}
        />
}
E.defaultProps = {
    md:"# Hello",
    pluginsArray:[]
}