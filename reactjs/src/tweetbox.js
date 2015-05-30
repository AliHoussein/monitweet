var TweetBox = React.createClass({
	render: function() {
		return (
			<div className="tweetBox">
          	<h1>Latests Tweets</h1>
          	<TweetList data={this.props.data} />
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

var data = [
  {author: "@AliHoussein", text: "This is one tweet"},
  {author: "@AliHoussein", text: "This is a *second* tweet"}
];


React.render(    
	<TweetBox data={data} />,
	document.getElementById('container')
);