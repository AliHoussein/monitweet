var TweetBox = React.createClass({displayName: "TweetBox",
	render: function() {
		return (
			React.createElement("div", {className: "tweetBox"}, 
          	React.createElement("h1", null, "Latests Tweets"), 
          	React.createElement(TweetList, {data: this.props.data})
			)
		);
	}
});

var TweetList = React.createClass({displayName: "TweetList",
  render: function() {
  	var tweetNodes = this.props.data.map( function(tweet) {
	    return (
	      	React.createElement(Tweet, {author: tweet.author}, 
	      	  tweet.text
      	  	) 
	    );
    });

    return (
	    React.createElement("div", {className: "tweetList"}, 
	    tweetNodes
	    )
	);
  }
});	


var Tweet = React.createClass({displayName: "Tweet",
	render: function() {
	    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

		return (
			React.createElement("div", {className: "author"}, 
				React.createElement("h2", {className: "tweetAuthor"}, 
				  this.props.author
				), 
				React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
			)
		);
	}
});

var data = [
  {author: "@AliHoussein", text: "This is one tweet"},
  {author: "@AliHoussein", text: "This is a *second* tweet"}
];


React.render(    
	React.createElement(TweetBox, {data: data}),
	document.getElementById('container')
);