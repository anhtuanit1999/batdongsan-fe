import axios from "axios";
import React, { Component } from "react";
import { webApiURL } from "../../constance/variable";

class Login extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const result = await axios({
        method: 'POST',
        url: `${webApiURL}/auth/login`,
        data: {
          email: data.get('username'),
          password: data.get('password')
        },
        responseType: 'json'
      })
      if(Math.floor(result.status / 100) === 2) {
         // set localStorage jwt
         localStorage.clear();
         localStorage.setItem('access_token', result.data.access_token);
         localStorage.setItem('email', result.data.email);
         localStorage.setItem('userId', result.data.userId);
         localStorage.setItem('isLogin', true);
         alert('Đăng nhập thành công!');
         setTimeout(() => {
          window.location.reload();
         }, 1000)
      }
    } catch (error) {
      alert('Đăng nhập thất bại!');
      console.log(error);
    }
    
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col colLogin">
            <button className="fb btnLogin">
              <i className="fa fa-facebook fa-fw"></i> Login with Facebook
            </button>
            <button className="twitter btnLogin">
              <i className="fa fa-twitter fa-fw"></i> Login with Twitter
            </button>
            <button className="google btnLogin">
              <i className="fa fa-google fa-fw"></i> Login with Google
            </button>
          </div>
          <form onSubmit={this.handleSubmit} className="col colLogin colLogin bg-login sp-login">
            <h3 className="text-center cl-login">
              <b>Login</b>
            </h3>
            <div className="input-container">
              <input
                className="input-field inputLogin"
                type="text"
                placeholder="Email/Phone Number"
                name="username"
              />
              <i className="fa fa-user iconLogin" />
            </div>
            <div className="input-container">
              <input
                className="inputLogin"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <i className="fa fa-key iconLogin"></i>
            </div>
            <div className="row">
              <label className="col-1 ">
                <input type="checkbox" />
              </label>
              <label className="col-6 remember ">Remember me</label>
            </div>

            <input
              className="space-bot inputLogin"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
