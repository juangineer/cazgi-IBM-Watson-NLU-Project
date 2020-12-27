import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      var emotions = this.props.emotions;
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
            Object.keys(emotions).map((e,i) => {
                    return <tr>
                      <td>{e}</td>
                      <td>{emotions[e]}</td>
                    </tr>;
            })}
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
