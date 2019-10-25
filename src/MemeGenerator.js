import React, { Component } from "react";

export class MemeGenerator extends Component {
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes);
        this.setState({ allMemeImgs: memes });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };

    this.handleTopText = this.handleTopText.bind(this);
    this.handleBottomText = this.handleBottomText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTopText(event) {
    this.setState({ topText: event.target.value });
  }
  handleBottomText(event) {
    this.setState({ bottomText: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const len = this.state.allMemeImgs.length;
    const rand = Math.floor(Math.random() * len);
    const randMemeImg = this.state.allMemeImgs[rand].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div className="container">
        <form className="meme-form">
          <input
            placeholder="topText"
            name="topText"
            className="form-control"
            type="text"
            value={this.state.topText}
            onChange={this.handleTopText}
          ></input>
          <input
            name="bottomText"
            placeholder="bottomText"
            className="form-control"
            type="text"
            value={this.state.bottomText}
            onChange={this.handleBottomText}
          ></input>

          <button className="btn" onClick={this.handleSubmit}>
            Gen
          </button>
        </form>
        <div className="container imgHolder">
          <img className="meme" src={this.state.randomImg} alt="meme"></img>
          <div className="imgWrapperTop">
            <h2 className="top">{this.state.topText}</h2>
          </div>
          <div className="imgWrapperBottom">
            <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
