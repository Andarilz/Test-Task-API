import React, {Component} from 'react'
import './App.css';
import axios from 'axios';
import ModalImage from './Modal';

export default class App extends Component{ 

  state = {
    photos: [],
    photosForSave: [],
    pageNum: 1,
    id: 0,
  }

  fetch = async () => {
    let photos = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNum}&_limit=12`)
    this.setState({photos: photos.data, photosForSave: photos.data})
  }

  async componentDidMount(){
    this.fetch()
  }

   fetchData = async data => {
    this.setState({pageNum: this.state.pageNum + data}, () => this.fetch())
  }

  deleteElem = identificator => {

    let photos = this.state.photos.filter(elem => elem.id !== identificator)

    let photosForSave = this.state.photosForSave.filter(elem => elem.id !== identificator)
    
    this.setState({
      photos,
      photosForSave
    })
  }

  findById = event => {
    let id = event.target.value
    setTimeout(() => {
            if(id){
              this.setState({
                photos: this.state.photosForSave
              }, () => {
                this.setState({id}, () => {
                  let photos = this.state.photos.filter(card => Number(card.id) === Number(this.state.id))
                  if(photos){
                    this.setState({
                      photos,
                      id: 0
                  })
                }
              }
            )
        })
      } else {
        this.setState({
          photos: this.state.photosForSave
        })
      }
    }, 100)
  }
  

  render() {
    return (
      <div>

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
                this.state.photos.map(photo => (
                    <div className="col s12 m2">
                        <div className="card small" key={photo.id}>
                          <div className="card-image">
                            <img src={photo.thumbnailUrl} alt={photo.id} />
                              <div className='card-action'>
                                <ModalImage 
                                title={photo.title} 
                                image={photo.url} 
                                description={photo} 
                                />
                                <button 
                                className='btn' 
                                onClick={() => this.deleteElem(photo.id)}
                                >Delete Image</button>
                              </div>
                          </div>
                          <div className="card-content">
                            <p className="card-title">
                              Id number: {photo.id}
                              </p>
                          </div>
                        </div>
                    </div>
                )
              )
            }

        </div>


          <div>
              
            {this.state.photos.length 
            ? <h3 className='flex'>Page {this.state.pageNum}</h3> 
            : <h2 className='flex'>Empty :((</h2>}

              <button className="waves-effect waves-light btn-large m1" onClick={() => this.fetchData(1)}> Forward</button>

              {this.state.pageNum > 1 
              && <button className="waves-effect waves-light btn-large m4" onClick={() => this.fetchData(-1)}> Back</button>}
              
          </div>

      </div>
    );
                  
  }

}

