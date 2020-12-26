import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
            Object.keys(this.props.emotions).map((e,i) => {
                    return <tr>
                      <td>{e}</td>
                      <td>{i}</td>
                    </tr>;
            })}
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
