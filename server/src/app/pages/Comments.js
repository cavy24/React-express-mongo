import React from "react";
import CommentList from '../components/comment/CommentList';

import CommentActions from '../actions/CommentActions';
import store from '../stores/store';
import {connect} from 'react-redux';


class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.comments = [];
        this.newComments = this.newComments.bind(this);
    }
    

    render() {

        if(this.props.is_loading){
            return <p>Данные загружаются</p>;
        }

        return <div> 
            <ul className = 'pager'>
                <button className="btn btn-primary" onClick={this.newComments}>Добавить новый комментарий</button>
            </ul>
        {
            (!this.props.children) ?
            (<CommentList comments={this.props.comments}/>):
            (this.props.children)
        }
        </div>
    }

    newComments(){
        let userId =  this.props.comments[0]['userId'] + 1;
        console.log(this.props.comments[0]['userId']);
        let id = Math.floor(Math.random() * 1000 - 1 + 1) + 1;
        let title = prompt('Тема');
        let body = prompt('Текст');
        
        this.props.dispatch(CommentActions.addComment(userId, id, title, body));
    }


    componentDidMount()
    {
        let comments = CommentActions.getComments();
        this.props.dispatch(comments);
    }

}

function mapStateToProps(store) {
    return {
        comments: store.comments.comments,
        is_loading: store.comments.is_loading
    }
}

export default connect(mapStateToProps)(Comments);