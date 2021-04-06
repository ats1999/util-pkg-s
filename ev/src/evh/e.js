import React,{useEffect,useRef,useState} from 'react';
import { Editor } from '@toast-ui/react-editor';
import PropTypes from "prop-types";

// import editor plugin
import chart from '@toast-ui/editor-plugin-chart';
import fontSizePicker from 'tui-font-size-picker';
import uml from '@toast-ui/editor-plugin-uml';
// colorSyntaxPlugin css file
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import tableMergeCell from '@toast-ui/editor-plugin-table-merged-cell';

// custom
import toggleEditorFullScreen from "./util/toggleEditorFullScreen";
import {customHTMLRenderer} from "./util/customHTMLRenderer";
import iframe from "./util/iframe";
import yt from "./util/youtubePlugin";
import linkButton from "./util/LinkButton";

export default function E(props) {
    const {getMd,getDescription,getTitle,height} = props;
    const {initialEditType,initialValue,getHtml} = props;
    const {uploadImage,pluginsArray} = props;
        
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

    const editorRef = useRef(null);

    const [previewStyle, setPreviewStyle] = useState("vertical");
   

    const [editorHeight,setEditorHeight] = useState(null);
    const mdChange=()=>{
        getMd(editorRef.current.getInstance().getMarkdown());

        try{
            if(getTitle)
                getTitle(editorRef.current.getRootElement().getElementsByTagName('h1')[1].innerText);
            if(getDescription)
                getDescription(editorRef.current.getRootElement().getElementsByTagName('p')[1].innerText);
            if(getHtml)
                getHtml(editorRef.current.getRootElement().getElementsByClassName("tui-editor-contents")[0].innerHTML)
        }catch(e){
            console.log(e)
        }      
    }
    function createPreviewStyleButton(){
        const el = document.createElement("button");
        // src => https://res.cloudinary.com/bdevg/image/upload/v1610604323/tablet-ipad-svgrepo-com_jgw7ua.svg
        el.innerHTML = `<img src=${'https://res.cloudinary.com/bdevg/image/upload/v1610604323/tablet-ipad-svgrepo-com_jgw7ua.svg'} alt='preview style bbutton'></img>`;
        // make clouser flag, so we can update 
        // previewStyle
        var flag = true;
        el.onclick = (e)=>{
            flag=!flag
            setPreviewStyle(flag?"vertical":"tab");
        }
        return el;   
    }
    function createFullScreenButton() {
        const el = document.createElement("button");
        // src => https://res.cloudinary.com/bdevg/image/upload/v1610604323/expand-fullscreen-svgrepo-com_uok6le.svg
        el.innerHTML = `<img src=${'https://res.cloudinary.com/bdevg/image/upload/v1610604323/expand-fullscreen-svgrepo-com_uok6le.svg'} alt='full screen  button'></img>`;
        el.onclick = (e)=>{
            toggleEditorFullScreen(editorRef.current.getRootElement());
            setEditorHeight(!editorHeight ? "100vh":null)
        }
        return el;
    }
    useEffect(()=>{
        //create a full screen button
        if(editorRef.current){
            const toolbar = editorRef.current.getInstance().getUI().getToolbar();
            toolbar.insertItem(5, {
                type: 'button',
                options: {
                    className: "full-screen",
                    event:"onclick",
                    tooltip: "Full screen",
                    text: "",
                    el: createFullScreenButton(), // this
                    style: "color:black;",
                },
            });

            toolbar.insertItem(5, {
                type: 'button',
                options: {
                    className: "preview-style",
                    event:"onclick",
                    tooltip: "Preview Style",
                    text: "",
                    el: createPreviewStyleButton(), // this
                    style: "color:black;",
                },
            });
        }
    },[]);
    
    return <Editor
            previewStyle={previewStyle}
            height={editorHeight || height}
            initialEditType={initialEditType}
            initialValue={initialValue}                       
            usageStatistics={false}
            ref={editorRef}
            onChange={mdChange}
            language = "en"
            hooks={{
                addImageBlobHook: (blob, callback) => {
                  uploadImage(blob).then(url=>callback(url,"Put alt text here...")).catch(err=>{
                      console.log(err);
                      callback("Try again","Try again")
                  });
                  return false;
                }
            }}
            plugins={[[chart,chartOptions],colorSyntaxPlugin,tableMergeCell,fontSizePicker,[uml,umlOptions],linkButton,iframe,yt,...pluginsArray]}

            // custom html renderer
            customHTMLRenderer={customHTMLRenderer}
        />
}


E.protoTypes = {
    getMd:PropTypes.func.isRequired,
    getDescription:PropTypes.func,
    getTitle:PropTypes.func,
    height:PropTypes.number,
    initialEditType:PropTypes.string,
    initialValue:PropTypes.string,
    getHtml:PropTypes.func,
    pluginsArray:PropTypes.array,
    uploadImage:PropTypes.func
}
E.defaultProps = {
    height:"400px",
    //previewStyle:"vertical",
    initialEditType:"markdown",
    pluginsArray:[],
    initialValue:"# Edit Title and it's color \n\n Edit description and it's color \n\n > Click on *demo article button* to view the demo article \n\n # Clear all the text and start writing \n\n ## Happy learning \n\n   > Click on *WYSIWYG* button to switch *WYSIWYG* mode on the right side."
}