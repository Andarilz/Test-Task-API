import React, {Component} from 'react'
import './App.css';
import axios from 'axios';
import ModalImage from './Modal';

export default class App extends Component{ 

  state = {
    users: [],
    usersForSave: [],
    pageNum: 1,
    id: 0,
  }

  fetch = async () => {
    let users = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNum}&_limit=12`)
    this.setState({users: users.data, usersForSave: users.data})
  }

  async componentDidMount(){
    this.fetch()
  }

   fetchData = async data => {
    this.setState({pageNum: this.state.pageNum + data}, () => this.fetch())
  }

  deleteElem = identificator => {

    let users = this.state.users.filter(elem => elem.id !== identificator)

    let usersForSave = this.state.usersForSave.filter(elem => elem.id !== identificator)
    
    this.setState({
      users,
      usersForSave
    })
  }

  findById = event => {
    let id = event.target.value
    setTimeout(() => {
            if(id){
              this.setState({
                users: this.state.usersForSave
              }, () => {
                this.setState({id}, () => {
                  let users = this.state.users.filter(card => Number(card.id) === Number(this.state.id))
                  if(users){
                    this.setState({
                      users,
                      id: 0
                  })
                }
              }
            )
        })
      } else {
        this.setState({
          users: this.state.usersForSave
        })
      }
    }, 100)
  }
  

  render() {
    return (
      <div className='contain'>

        <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <i className="material-icons prefix">mode_edit</i>
                  <textarea id="icon_prefix2" className="materialize-textarea" onChange={this.findById}></textarea>
                  <label>Find by ID</label>
                </div>
              </div>
            </form>
        </div>

        <button className='btn success m1' onClick={this.fetch}>Upload images from server</button>

        <div className="row">
          
            {
                this.state.users.map(user => (
                    <div className="col s12 m2">
                        <div className="card small" key={user.id}>
                          <div className="card-image">
                            <img src={user.thumbnailUrl} alt={user.id} />
                              <div className='card-action'>
                                <ModalImage title={user.title} image={user.url} description={user} />
                                <button className='btn m3' onClick={() => this.deleteElem(user.id)}>Delete Image</button>
                              </div>
                          </div>
                          <div className="card-content">
                            <p className="card-title">Id number: {user.id}</p>
                          </div>
                        </div>
                    </div>
                )
              )
            }

        </div>

        <div>
            {this.state.users.length ? <h3 className='flex'>Page {this.state.pageNum}</h3> : <h2 className='flex'>Empty :((</h2>}
              <button className="waves-effect waves-light btn-large m1" onClick={() => this.fetchData(1)}> Forward
              </button>
              {this.state.pageNum > 1 ? <button className="waves-effect waves-light btn-large m4" onClick={() => this.fetchData(-1)}> Back
            </button> : null}
        </div>

      </div>
    );
  }
}

