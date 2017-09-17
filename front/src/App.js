import React, { Component } from 'react'
import Post from './Post/component/Post'
import Navbar from './Navbar'
import Main from './Main'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.addPost = this.addPost.bind(this);
  	this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(this);
    this.state = {
      token: '',
      posts:[],
 	newPostBody:'',
    }
  }


addPost(){
		const newState = Objet.assign(newState, this.state);
		newState.posts.push(this.state.newPostBody);
		newState.newPostBody ='';
		this.setState(newState);
}

handlePostEditorInputChange(ev){
	this.setState({
	 newPostBody.ev.targe.value
})
}

  saveToken (token) {
    this.setState({token: token})
  }

  render () {
    return (
      <div>
        <Navbar />
        <Main token={this.state.token} saveToken={this.saveToken.bind(this)} />
      </div>

      <div>
      	{this.state.posts.map((postBody, idx )=> {
      		return(<Post key= {idx} postbody = {postBody} />)
      			})
      	}
      	
        <Navbar/>
        <Main />
        
       <div className="panel panel-default post-editor">
      		<div className = "panel-body">
      			<textarea className= "form-contro post-editor-input" value={this.state.newPostBody} onChange={this.handlePostEditorInputChange} />
      				<button className= "btn btn-success post-editor-button" onClick={this.addPost}>Post
      				</button>     		 	
      		</div>
      	</div>

      </div> 
    )
  }
}

export default App
