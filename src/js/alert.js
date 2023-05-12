import { convertToJson } from './utils.mjs';

/*
-- Example JSON --
{
  "text": "All items on the site are half off until 6/13!",
  "bgcolor": "#5555C5",
  "color": "#FFF"
}

-- To use the class --
import { AlertHeader } from './alert.js';
new Alertheader('json/alerts.json'); 
*/

export default class AlertHeader {
  constructor(alertFile) {
    this.alertFile = alertFile;
    this.createAlerts();
  }

  async createAlerts() {
    const alerts = await this.loadMessages();
    if (alerts.length) {
        const alertHeader = document.createElement('section');
        alertHeader.classList.add('alert-list');
        alerts.forEach (alert => alertHeader.appendChild(this.alertEle(alert)));
        document.getElementsByTagName('main')[0].before(alertHeader);
    }
  }

  loadMessages() {
    return fetch(this.alertFile)
        .then(convertToJson)
        .then((data) => data);
  }

  alertEle(alert) {
    const p = document.createElement('p');
    p.style.backgroundColor = alert.bgcolor;
    p.style.color = alert.color;
    p.innerText = alert.text;

    return p;
  }
}