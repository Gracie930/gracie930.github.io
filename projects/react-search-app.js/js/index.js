"use strict";

var ListComp = React.createClass({
  displayName: "ListComp",

  getInitialState: function getInitialState() {
    return {
      search: '',
      data: []
    };
  },
  iterate: function iterate(array) {
    return array.map(function (arrayItem) {
      return React.createElement(
        "li",
        null,
        arrayItem
      );
    });
  },
  handleSearch: function handleSearch(e) {
    this.setState({ search: e.target.value });
  },
  render: function render() {

    var list = this.props.data;
    var searchStr = this.state.search.trim().toLowerCase();

    if (searchStr.length > 0) {
      list = list.filter(function (letter) {
        return letter.toLowerCase().match(searchStr);
      });
    }
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        null,
        "Search:"
      ),
      React.createElement("input", { type: "text", value: this.state.search, onChange: this.handleSearch, placeholder: "Search them here" }),
      React.createElement(
        "ul",
        null,
        this.iterate(list)
      )
    );
  }
});

var Content = React.createClass({
  displayName: "Content",

  getInitialState: function getInitialState() {
    return {
      data: []
    };
  },
  componentWillMount: function componentWillMount() {
    $.getJSON('https://gist.githubusercontent.com/Gracie930/baa6e210266858cb7045a4cb84ce7c63/raw/0e7b360dc93de10d0c520ccf4a2c1fa15de7a896/gistfile1.json', function (result) {
      console.log('json received');
      this.setState({ data: result.Staff });
    }.bind(this));
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "h1",
          null,
          "Meet Our Team!"
        ),
        React.createElement(
          "p",
          { className: "about" },
          "Here is a list of Cornerstone Staffs. Learn more about our team."
        )
      ),
      React.createElement(ListComp, { data: this.state.data })
    );
  }
});

ReactDOM.render(React.createElement(Content, null), document.getElementById('main'));