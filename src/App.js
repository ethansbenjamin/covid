import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';

// index files; can use the name of the function to import
import {fetchData} from "./api";


class App extends React.Component {
    state = {
        data: {},
        country: '',
    }
    // after the component is mounted, makes changes to the state
  async componentDidMount(){
        const fetchedData = await fetchData();

        // setting the state of the date when the component is rendered
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);

        this.setState({data, country: country});
        // fetch data and set the state
    }
    render(){
        // taking the data out the state
        const {data, country} = this.state;

        return (
            // styles.container is making sure the module is used in css
            <div className={styles.container}>
                <img className={styles.image} alt="logo" src={"https://www.diagnosticsolutionslab.com/sites/default/files/COVID19-NP-Logo.png"} />
              <Cards data={data} />
              <CountryPicker handleCountryChange={this.handleCountryChange} />
              <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;