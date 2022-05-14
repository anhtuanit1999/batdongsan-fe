import React, { Component } from "react";
import data1 from "../SIMULATION_DATABASE/data_BlockNews.json";
import data2 from "../SIMULATION_DATABASE/data_NewsQuickView.json";
import data3 from "../SIMULATION_DATABASE/data_NewsFullView.json";

class New_Topic extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data1.push({ 
      id: "", 
      imgsrc: "media/news/thumbail6.jpg", 
      title: data.get('title'),
      description: data.get('description'),
      linkTopic: Date.now()
    })
    data2.push({
      content: data.get('description')
    })
    data3.push({
      title: data.get('title'),
      image: "media/news/thumbail6.jpg", 
      description: data.get('description')
    })
  }

  render() {
    return (
      <div >
        <div id="align-top"></div>
        <div id="align-top"></div>
        <ul id="breadcrumb">
          <li>
            <a href="/">
              <span class="fas fa-globe"> </span>
            </a>
          </li>
          <li>
            <a className="disabledHoverBC">Post</a>
          </li>
          <li></li>
        </ul>
        {/* ////// end breadcrumb /////////// */}

        <h2 className="mt-5 pt-5">Share your news with us</h2>
        <form onSubmit={this.handleSubmit} className="container">
          <div className="form-groups sm-12">
            <label ><h4>Title:</h4></label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter title here"
            />
          </div>

          <div className="form-groups sm-12">
            <label ><h4>Description:</h4></label>
            <textarea 
              class="form-control" 
              name="description"
              rows="3"></textarea>
          </div>

          <div className="form-groups sm-12">
            <label ><h4>Image:</h4></label>
            <input
              type="file"
              className="form-control"
              name="file"
            />
          </div>
          <div className="container justify-content-center text-center">
            <button style={{ "font-size": "30px" }} type="submit" class="btn btn-primary my-5">Create</button>
          </div>
        </form>
        
      </div>
    );
  }
}

export default New_Topic;
