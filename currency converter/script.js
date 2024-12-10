let drop=document.querySelectorAll(".drop select");
let btn=document.querySelector("button");
let baseURL="https://latest.currency-api.pages.dev/v1/currencies"
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for (let select of drop){
    for (let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if (select.name==="from" && code==="USD") newOption.selected="selected";
        if (select.name==="to" && code==="INR") newOption.selected="selected";
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
};

let updateFlag=(ele)=>{
    let code=ele.value;
    let country=countryList[code];
    let newSrc=`https://flagsapi.com/${country}/flat/32.png`;
    let img= ele.parentElement.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if (amtVal==""|| amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    console.log(fromCurr);
    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let a=data[fromCurr.value.toLowerCase()];
    let rate=a[toCurr.value.toLowerCase()];
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;
})
