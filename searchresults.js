class SearchResult {
  constructor(company, compProfile,term) {
    this.image = compProfile.image;
    this.name = company.name;
    this.symbol = company.symbol;
    this.percent = compProfile.changesPercentage;
    this.term=term;
    
      }

  static listArea = document.getElementById("listResult");

  addToList() {
    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.classList.add("valign-wrapper");
    li.classList.add("avatar");
    listArea.appendChild(li);
    const img = document.createElement("img");
    img.classList.add("circle");
    img.src = `${this.image}`;
    img.width = "30";
    img.height = "30";
    li.appendChild(img);
    
  const a=document.createElement("a")
  a.href= `./company.html?symbol=${this.symbol}`;
  a.innerText += `${this.name} (${this.symbol})`;
  li.appendChild(a)
  const reg = new RegExp(this.term, "gi")
  const newres = a.innerText.replaceAll(reg, (match) => `<mark>${match}</mark>`);
  a.innerHTML = newres;

    const span = document.createElement("span");
    if (this.percent > 0) {
      span.classList.add("light-green-text");
    } else {
      span.classList.add("red-text");
    }
    span.innerText += `(${this.percent}%)`;
    li.appendChild(span);
  }
}
