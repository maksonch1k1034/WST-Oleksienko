import { actors } from "../js/usersList.js";

class UserCard extends HTMLElement {
    constructor() {
     super();
     this.attachShadow({mode: 'open'});
     this._data = null;   
    }

    set data(value){
        this._data = value;
        this.render();
    }
    render() {
        if (!this._data) return;
        const {name, birth, city, photo, country} = this._data;

        this.shadowRoot.innerHTML = `
        <style>
        
        :host{
            display:block;
            width:220px;
            margin:15px;
             }
        
        .card{
            border:1px solid #ddd;
            border-radius:10px;
            padding:15px;
            text-align:center;
            box-shadow:0 4px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s
            background:white;
            }

        .card:hover{
                transform: translateY(-8px);
                box-shadow:0 10px 25px rgba(4, 16, 250, 0.2);
            }
            
         img{
            width:120px;
            height:120px;
            border-radius:50%;
            object-fit:cover;
            margin-bottom:10px;
            }

         h3{
            margin:10px 0;
           }

         p{
            margin:4px 0;
            color:#555;
          }

    </style>

    <div class="card">
        <img src="${photo}">
        <h3>${name}</h3>
        <p>${birth}</p>
        <p>${city}, ${country}</p>
    </div>
    `;
    } 
}

customElements.define("user-card", UserCard);

const container = document.getElementById("actors-container");

actors.forEach(actors => {
    
    const card = document.createElement("user-card");

    card.data = actors;

    container.appendChild(card);
});
