import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  componentDidMount() {
    document.title = 'Sentiment Analyzer';
  }

  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    let textinput = document.getElementById("textinput").value;
    console.log("Sending sentiment: " + textinput);

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+textinput;
    } else {
      url = url+"/text/sentiment?text="+textinput;
    }
    ret = axios.get(url);
    ret.then((response)=>{

      //Include code here to check the sentiment and fomrat the data accordingly
      console.log("Received sentiment: " + JSON.stringify(response.data));

      this.setState({sentimentOutput:response.data});
      let output = response.data;
      if(response.data === "positive") {
        output = <div style={{color:"green",fontSize:20}}>{response.data}</div>
      } else if (response.data === "negative"){
        output = <div style={{color:"red",fontSize:20}}>{response.data}</div>
      } else {
        output = <div style={{color:"orange",fontSize:20}}>{response.data}</div>
      }
      this.setState({sentimentOutput:output});
    }).catch(err => {
      console.log(err.toString())
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";

    let textinput = document.getElementById("textinput").value;
    console.log("Sending emotion: " + textinput);

    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+textinput;
    } else {
      url = url+"/text/emotion/?text="+textinput;
    }
    ret = axios.get(url);

    ret.then((response)=>{
      console.log("Received emotion: " + JSON.stringify(response.data));
      this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
    }).catch(err => {
        console.log(err.toString())
    });
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;
