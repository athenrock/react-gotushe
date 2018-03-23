import React,{Component} from 'react'

import Clock from '../clock'

class Home extends Component{

    render(){
        return(<div><p>Welcome!</p>
            <p>this is a new World!!!!</p>
            <Clock/>
        </div>);
    }
}

export default Home;