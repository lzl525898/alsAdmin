import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.props.detail || EditorState.createEmpty(),
        };
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        },()=>{
            console.log(this.getDetail())
        });
    };
    getDetail = ()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }
    render() {
        const { editorState } = this.state;
        return (
            <div style={{flex:1,marginLeft:'20px'}}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorStyle={{border:'1px solid #eee',minHeight:'200px',paddingLeft:'20px'}}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>

        )
    }
}

RichTextEditor.propTypes = {
    detail: PropTypes.string.isRequired,
}
