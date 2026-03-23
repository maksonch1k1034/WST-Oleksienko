// - Варіант 1
export async function QuotesFetch(){
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();
    return data.quotes;
}
// - Варіант 2 
/*import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm';

export async function QuotesAxios(){
    const res = await axios("https://dummyjson.com/quotes");
    return res.quotes;
}*/