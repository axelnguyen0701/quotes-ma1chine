import React from "react";
import axios from "axios";
import "./App.css";
class App extends React.Component {
  state = { quotes: [], currentQuote: 0 };

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async componentDidMount() {
    const link =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    const res = await axios.get(link);
    this.setState({
      quotes: res.data.quotes,
      currentQuote: this.getRandomIntInclusive(0, res.data.quotes.length - 1),
    });
  }

  renderQuote() {
    if (this.state.quotes.length > 0) {
      const { quote, author } = this.state.quotes[this.state.currentQuote];
      return (
        <>
          <div id="text" className="quote text-center">
            <p className="font-monospace text-muted fst-italic">{quote}</p>
          </div>
          <div className="text-end">
            <blockquote className="blockquote">
              <p id="author" className="text-end">
                {author}
              </p>
            </blockquote>
          </div>
          <div className="row text-center mt-3">
            <div className="col-6">
              <a
                href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${
                  this.state.quotes[this.state.currentQuote].quote
                }`}
                id="tweet-quote"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter-square"></i> <span>Tweet it</span>
              </a>
            </div>
            <div className="col-6">
              <button
                className="btn btn-info"
                id="new-quote"
                onClick={this.onNewQuote}
              >
                New quote
              </button>
            </div>
          </div>
        </>
      );
    }
    return "Loading";
  }

  onNewQuote = () => {
    this.setState({
      currentQuote: this.getRandomIntInclusive(0, this.state.quotes.length - 1),
    });
  };

  render() {
    return (
      <div
        id="quote-box"
        className="container bg-white shadow-lg d-flex flex-column align-items-center border rounded p-3"
      >
        <div className="row">{this.renderQuote()}</div>
      </div>
    );
  }
}

export default App;
