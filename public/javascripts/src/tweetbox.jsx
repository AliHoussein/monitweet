var TweetBox = React.createClass({
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
			<div className="tweetBox">
			<TweetForm onTweetSubmit={this.handleTweetSubmit} />
          	<h1>Latests Tweets</h1>
          	<TweetList data={this.state.data} />
			</div>
		);
	}
});

var TweetList = React.createClass({
  render: function() {
  	var tweetNodes = this.props.data.map( function(tweet) {
	    return (
	      	<Tweet author={tweet.author}>
	      	  {tweet.text}
      	  	</Tweet> 
	    );
    });

    return (
	    <div className="tweetList">
	    {tweetNodes}
	    </div>
	);
  }
});	


var Tweet = React.createClass({
	render: function() {
	    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

		return (
			<div className="author">
				<h2 className="tweetAuthor">
				  {this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

var TweetForm = React.createClass({
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
	      <form className="tweetForm" onSubmit={this.handleSubmit} >
	    	<input type="text" placeholder="Tweet something new..." ref="text" />
			<input type="submit" value="Post" />
	      </form>
	    );
	  }
});

React.render(    
	<TweetBox url="/json/tweets.json" pollInterval={20000} />,
	document.getElementById('tweetstream')
);