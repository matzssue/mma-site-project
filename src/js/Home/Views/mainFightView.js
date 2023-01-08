import { getFighterInfo, state } from "../../apis.js";
import View from "./View.js";
import fighterView from "../../Fighter/Views/fighterView.js";
class mainFightView extends View {
  _parentElement = document.querySelector(".main-event");
  _data = state;
  _names = document.querySelectorAll(".fighter-name");

  async _generateMarkup() {
    this.renderSpinner();

    const fighterOne = await getFighterInfo(this._data.mainFight[0].id);

    const fighterTwo = await getFighterInfo(this._data.mainFight[1].id);
    const date = this._data.currentEvent.date;
    const convertedDate = new Date(date);

    const markup = `

        <div class="main-event-info">
          <h2>${this._data.currentEvent.name}</h2>
          <span class="main-event-place"
            >Date: ${convertedDate} </br> Watch on EWPA.tv </span
          >
          </div>
          <div class="main-event-fighters-container">
          <div class="main-event-fighter-info left-container">
            <span class="main-event-fighter-name fighter-name">${fighterOne[0].name}</span>
            <img
              class="main-event-fighter-img"
              src="/src/img/fighters/1.jpg"
              alt=""
            />
            <span class="main-event-fighter-results"
              >${fighterOne[0].fighterResults}<br />(win-loss-draw)</span
            >
          </div>
          <div class="center-container">
            <h3 class="center-text">VS</h3>
            <h4 class="center-info-time">TIME LEFT:</h4>
          </div>
          <div class="main-event-fighter-info right-container">
            <span class="main-event-fighter-name fighter-name">${fighterTwo[0].name}</span>
            <img
              class="main-event-fighter-img"
              src="/src/img/fighters/2.jpg"
              alt=""
            />
            <span class="main-event-fighter-results"
              >${fighterTwo[0].fighterResults} <br />(win-loss-draw)</span
            >
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  setFighterName() {
    const fightersButtons = document.querySelectorAll(".fighter-name");
    fightersButtons.forEach((name) =>
      name.addEventListener("click", function (e) {
        console.log(e.target);
        const name = e.target.innerHTML;
        state.fighterName = name;
        console.log(window.location.hash);
        document.location.href = "http://127.0.0.1:5500/fighter.html";
        fighterView._generateMarkup(e, state.fighterName);
      })
    );
  }
}
export default new mainFightView();
