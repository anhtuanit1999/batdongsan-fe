import React from "react";

function News() {
  return (
    <div>
      <h2 className="mt-5 pt-5">Share your news with us</h2>
      <form onSubmit={this.handleSubmit} className="container">
        <div className="form-groups sm-12">
          <label>
            <h4>Title:</h4>
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter title here"
          />
        </div>

        <div className="form-groups sm-12">
          <label>
            <h4>Description:</h4>
          </label>
          <textarea class="form-control" name="description" rows="3"></textarea>
        </div>

        <div className="form-groups sm-12">
          <label>
            <h4>Image:</h4>
          </label>
          <input type="file" className="form-control" name="file" />
        </div>
        <div className="container justify-content-center text-center">
          <button
            style={{ "font-size": "30px" }}
            type="submit"
            class="btn btn-primary my-5"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default News;
