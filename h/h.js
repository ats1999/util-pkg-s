import {customHTMLRenderer,getHTMLRenderConvertors} from "./util/customHTMLRenderer";
import { Parser, createRenderHTML } from '@toast-ui/toastmark';
const parser = new Parser();
const renderHTML = createRenderHTML({ 
    gfm: true,
    convertors:getHTMLRenderConvertors(null,customHTMLRenderer)
});

const h=(md)=>{
    const root = parser.parse(md);
    const html = renderHTML(root);
    return html
}

export default = h;
