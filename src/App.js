import React, { Component } from 'react'
import CardSection from './CardSection';
import Charts from './Charts';
import Header from './Header';

export class App extends Component {
  constructor(){
    super();
      this.state = {
        Id: "bitcoin",
        Data:{}
      }
  }

    fetchData = async() => {
     let response = await fetch('https://api.coingecko.com/api/v3/coins/'+this.state.Id)
     let data = await response.json();
      this.setState({Id:this.state.Id,Data:data})
    }

    componentDidMount(){
      this.fetchData()
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    handelSubmit = async (event) =>{
      console.log(event.target.value)
        await this.setState({Id:event.target.value,Data:this.state.Data})
        this.fetchData()
    }

  render() {
    return (
      <>
        <Header handle_Submit = {this.handelSubmit}/>
        <CardSection  coinName={this.state.Data.name} currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price["inr"] : ""}
          mCap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ""}
          ath={this.state.Data.market_data ? this.state.Data.market_data.ath.inr : ""} atl={this.state.Data.market_data ? this.state.Data.market_data.atl.inr : ""}
          Public_interest={this.state.Data.public_interest_score} high24={this.state.Data.market_data ? this.state.Data.market_data.high_24h["inr"] : ""}
          low24={this.state.Data.market_data ? this.state.Data.market_data.low_24h["inr"] : ""} />
          <Charts Id={this.state.Id} priceChange24={this.state.Data.market_data ? this.state.Data.market_data.price_change_24h_in_currency.inr : ""} 
        MarketCap={this.state.Data.market_data ? this.state.Data.market_data.market_cap.inr  : ""}
        TotVol={this.state.Data.market_data ? this.state.Data.market_data.total_volume.inr  : ""}
        Circulating= {this.state.Data.market_data ? this.state.Data.market_data["circulating_supply"] : ""}
        />
      </>
    )
  }
}

export default App