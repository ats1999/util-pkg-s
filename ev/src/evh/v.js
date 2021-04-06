import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
// import editor plugin
import chart from '@toast-ui/editor-plugin-chart';
import uml from '@toast-ui/editor-plugin-uml';
// colorSyntaxPlugin css file
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import tableMergeCell from '@toast-ui/editor-plugin-table-merged-cell';

// custom
import {customHTMLRenderer} from "./util/customHTMLRenderer";
import iframe from "./util/iframe";
import yt from "./util/youtubePlugin";
import linkButton from "./util/LinkButton";

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
            plugins={[[chart,chartOptions],colorSyntaxPlugin,tableMergeCell,[uml,umlOptions],linkButton,iframe,yt,...pluginsArray]}
            // custom html renderer
            customHTMLRenderer={customHTMLRenderer}
        />
}
E.defaultProps = {
    md:"# Hello",
    pluginsArray:[]
}