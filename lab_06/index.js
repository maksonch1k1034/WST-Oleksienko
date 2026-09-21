import { QuotesFetch } from "./api.js";

import './components/table.js';
import './components/popup.js';
import './components/favorites.js';


const quotes = await QuotesFetch();

document.querySelector('quote-table').setData(quotes);