var TweetBox = React.createClass({displayName: "TweetBox",
	loadTweetsFromServer: function() {

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
      		error: function(xhr, status, err) {
		        console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		this.loadTweetsFromServer();
		setInterval(this.loadTweetsFromServer, this.props.pollInterval);
	},

	handleTweetSubmit: function(tweet) {

		var tweets = this.state.data;
		var newTweets = tweets.concat([tweet]);
		this.setState({data: newTweets});

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: tweet,
			success: function(data) {
				this.setState({data: data});
		  	}.bind(this),
		  	error: function(xhr, status, err) {
		    	console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {
		return (
			React.createElement("div", {className: "tweetBox"}, 
			React.createElement(TweetForm, {onTweetSubmit: this.handleTweetSubmit}), 
          	React.createElement("h1", null, "Latests Tweets"), 
          	React.createElement(TweetList, {data: this.state.data})
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

var TweetForm = React.createClass({displayName: "TweetForm",
	handleSubmit: function(e) {
		e.preventDefault(); //Call preventDefault() on the event to prevent the browser's default action of submitting the form.

		var text = React.findDOMNode(this.refs.text).value.trim();

		if (!text) {
			return;
		}
		this.props.onTweetSubmit({author: "@AliHoussein",text: text});
		React.findDOMNode(this.refs.text).value = '';
		return;
	},


	render: function() {
	    return (
	      React.createElement("form", {className: "tweetForm", onSubmit: this.handleSubmit}, 
	    	React.createElement("input", {type: "text", placeholder: "Tweet something new...", ref: "text"}), 
			React.createElement("input", {type: "submit", value: "Post"})
	      )
	    );
	  }
});

React.render(    
	React.createElement(TweetBox, {url: "tweets.json", pollInterval: 200000}),
	document.getElementById('tweetstream')
);