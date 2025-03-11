let header = document.getElementsByTagName('h1')[0]
let btn = document.getElementById("btnh1")
let txt = document.getElementById("txtbox")
let txtbtn = document.getElementById("txtbtn")
let txtp = document.getElementById("txtp")
let txtcont = document.getElementById('txtcont')
let theme = document.getElementById("theme")
let plus = document.getElementById("plus")
let minus = document.getElementById("minus")
let cnttxt = document.getElementById("countertxt")
let fetchBtn = document.getElementById("fetch-btn")
let fetchBox = document.getElementById("fetch-box")

btn.onclick = () => { 
header.textContent = 'hi, from javascript';
}

txtbtn.onclick = () => {
     console.log(txt.value)
     let str = txt.value
     txtp.textContent = str.split('').reverse().join('')
}
 
theme.onclick = () => {
    if(txtcont.classList.contains("light-mode")){
        txtcont.classList.replace("light-mode","dark-mode")
    }else{
        txtcont.classList.replace("dark-mode","light-mode")
    }
    
}
document.getElementById("toggle").onclick = () => {
    txtcont.classList.toggle("dark-mode")
    txtcont.classList.toggle("light-mode")
}

document.getElementById("hide").onclick = () =>{
    document.getElementById("redblock").style.display = "none";
}
 
txtp.style.color = 'blue';

plus.onclick = () => {
    cnttxt.textContent = parseInt(cnttxt.textContent)+1
}
minus.onclick = () => {
    cnttxt.textContent = parseInt(cnttxt.textContent)-1;
    cnttxt.textContent = Math.max(0,parseInt(cnttxt.textContent));
}
as.onclick = () => {
    console.log("hellow")
}

//debounce function

function debounce(func,delay){
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}

function updateText(event) {
    document.getElementById("output").textContent = `You've typed : ${event.target.value}`

}

const debounceUpdate = debounce(updateText,500)

//Fetch example

document.getElementById("search").addEventListener("input",debounceUpdate)

fetchBtn.addEventListener("click",fetchData )

async function fetchData() {
    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    if(!response.ok){
        throw new Error("Failed to Fetch")
    }
    const data = await response.json()
    fetchBox.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.body}</p>
     `;
    } catch(error) {
        console.error("error fetching the data",error)
    }

}