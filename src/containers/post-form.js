import React, { Component } from 'react'
import {Link, browserHistory} from 'react-router'
import {reduxForm} from 'redux-form'
import {createPost} from '../actions/index'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const formConfig = {
    form: "createPostForm",
    fields: ['title','content','author'],
    validate:  validate,
    initialValues: {author: "Moi"}
}

class PostForm extends Component {
    render () {
        const{fields:{title,content,author},handleSubmit,errors}=this.props
        console.log(errors)
        return (
            <div>
                <h1>Nouveau post</h1>
                <form onSubmit={handleSubmit(this.createPost.bind(this))}>
                    
                    <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                        <label>Titre</label>
                        <input className="form-control" typez="text" {...title}/>
                        <div>{title.touched && errors.title}</div>
                    </div>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <label>Description</label>
                        <input className="form-control" typez="textarea" {...content}/>
                        <div>{content.touched && errors.content}</div>
                    </div>
                    <div className={`form-group ${author.touched && author.invalid ? 'has-danger' : ''}`}>
                        <label>Auteur</label>
                        <input className="form-control" typez="text" {...author}/>
                        <div>{author.touched && errors.author}</div>

                    </div>
                    <Link to="/" className="button_space"><button className="btn btn-danger">Retour</button></Link>
                    <button type="submit" className="btn btn-primary" disabled={this.props.invalid}>Créer</button>
                </form>
            </div>
        )
    }
    createPost(post){
        this.props.createPost(post)
        browserHistory.push("/")
    }
}
function validate(values){
    const errors = {}
    if (!values.title){
        errors.title = "Veuillez remplir le titre"
    }
    if (!values.content){
        errors.content = "Veuillez remplir la description"
    }
    if (!values.author){
        errors.author = "Veuillez remplir le champ auteur"
    }

    return errors
}
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({createPost}, dispatch)
})    
export default connect(null,mapDispatchToProps)(reduxForm(formConfig)(PostForm))