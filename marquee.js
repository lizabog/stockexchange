class Marqueeitem {
  constructor(data, marqueeArea) {
    this.symbol = data.symbol;
    this.price = data.price;
    this.marqueeArea=marqueeArea;
  }
  // static marquee = document.getElementById("marquee");
  renderMarquee() {
    const li = document.createElement("li");
    li.innerText += `${this.symbol} ${this.price}$`;
    marquee.appendChild(li);
  }
}

class Marquee {
  constructor(marqueeArea) {
    this.marqueeArea = marqueeArea
  }
  async getStockPrices() {

    try {
      const response = await fetch(
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/NASDAQ"
      );
      const realTimeData = await response.json();
      return realTimeData.slice(0, 100);
    } catch (e) {
      console.log(e);
    }
  }
  async populateMarquee() {
    try {
      const scrollinData = await this.getStockPrices();
      scrollinData.forEach((element) => {
        const li = new Marqueeitem(element,this.marqueeArea);
        
        li.renderMarquee();
      });
    } 
    catch (e) {
      console.error(e);
    }
  }
}
