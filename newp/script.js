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
let fetchBtn2 = document.getElementById("fetch-btn2")
let fetchBox = document.getElementById("fetch-box")
const runawayBtn = document.getElementById("runaway-btn")

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
    document.getElementById("output").textContent = `Showing results for '${event.target.value}'`

}

const debounceUpdate = debounce(updateText,500)
document.getElementById("search").addEventListener("input",debounceUpdate)

//Fetch example



fetchBtn.addEventListener("click",() => fetchData(1) )
fetchBtn2.addEventListener("click",() => fetchData(2) )

async function fetchData(n) {
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${n}`)
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

runawayBtn.addEventListener("mouseover",() => {
    const newX = Math.random()*(window.innerWidth-runawayBtn.clientWidth)
    const newY = Math.random()*(window.innerHeight-runawayBtn.clientHeight)
    runawayBtn.style.left = `${newX}px`
    runawayBtn.style.top = `${newY}px`
})

window.onscroll = function() {updateProgressBar();};

function updateProgressBar() {
    let scrollTop = document.documentElement.scrollTop
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop/scrollHeight)*100;
    document.getElementById(`scroll-bar`).style.width = progress +"%";
}

document.querySelectorAll(".ripple-btn").forEach(button => {
    button.addEventListener("click",function(e){
        let x = e.clientX - this.getBoundingClientRect().left;
        let y = e.clientY - this.getBoundingClientRect().top;

        let ripple = document.createElement("span")
        ripple.classList.add('ripple')
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`

        this.appendChild(ripple)

        setTimeout(()=> {
            ripple.remove()
        },600)

    })
})

let factorNum = parseInt(document.getElementById("factor").textContent)
let multiplierNum = parseInt(document.getElementById("multiplier").textContent)
let resultBtn = document.getElementById("result")

resultBtn.addEventListener("click",() => {

    console.log(powCaluculate(factorNum,multiplierNum))

})

function powCaluculate(a, b){

    let count = b;
    if(b!=0){
        a*a
        b--
        return(powCaluculate(a,b))
    }else{
        return a
    }
    
}