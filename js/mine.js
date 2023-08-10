let inputName = document.querySelector(".name")
let inputPrice = document.querySelector(".price")
let inputDisc = document.querySelector(".disc") 
let inputAmount = document.querySelector(".amount")
let inputCategory = document.querySelector(".category")
let displayPro = document.getElementById("displayPro")
let search = document.querySelector(".search")
let btnAdd = document.getElementById("addProducts")
let alertAmount = document.querySelector("#alertAmount")
let alertPrice =document.querySelector("#alertPrice")
let alertName = document.querySelector("#alertName")
let alertCategory = document.querySelector("#alertCategory")
let regexNum = /[0-9]/
let pDice;

inputDisc.value = 0+"%"



let = storageDataProudct = [];

if(localStorage.getItem("dataProdctS") != null)
{
    storageDataProudct = JSON.parse(localStorage.getItem("dataProdctS"))
    displayProudcts()   
}
else{
    storageDataProudct = [];
    diplayArea.innerHTML = `<h2 class="text-center py-5">Empty</h2>`;
}



btnAdd.addEventListener("click" , addProducts )
function addProducts(){
    pDice = inputDisc.value.includes("%") ? inputDisc.value.slice(0, inputDisc.value.length - 1) : inputDisc.value
    if(matchAmount() == false && matchPrice() == false  && emptyName() == false){
        let dataProudct ={
            pName: inputName.value,
            pPrice: inputPrice.value,
            pDice: pDice,
            PTotal: Number((inputPrice.value * inputAmount.value) - ((inputPrice.value * inputAmount.value) * (pDice / 100))).toFixed(2),
            pAmount: inputAmount.value,
            pCate: inputCategory.value,
        }
            
        storageDataProudct.push(dataProudct)
        displayProudcts()
        removeInput()
        localStorage.setItem("dataProdctS" , JSON.stringify(storageDataProudct))
        if(storageDataProudct.length == 1){
                window.location.reload()
        }
    }
}




function displayProudcts(){
    let displayP = ``;
    for(let i = 0; i < storageDataProudct.length; i++)
    {
        displayP += `<tr>
                        <td class="border-bottom py-2 ">${storageDataProudct[i].pName.charAt(0).toUpperCase()+storageDataProudct[i].pName.slice(1).toLowerCase()}</td>
                        <td class="border-bottom py-2">${storageDataProudct[i].pPrice}</td>
                        <td class="border-bottom py-2">${storageDataProudct[i].pDice+"%"}</td>
                        <td class="border-bottom py-2">${storageDataProudct[i].PTotal}</td>
                        <td class="border-bottom py-2">${storageDataProudct[i].pCate.charAt(0).toUpperCase()+storageDataProudct[i].pCate.slice(1).toLowerCase()}</td>
                        <td class="border-bottom py-2">${storageDataProudct[i].pAmount}</td>
                        <td class="border-bottom py-2"><i onclick="btnUpData(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="updata fa-regular fa-pen-to-square me-1"></i> <i onclick="btnDelet(${i})"  class="delete fa-regular fa-trash-can ms-1"></i></td>
                     </tr>`
    }
    displayPro.innerHTML = displayP;
}


function removeInput(){
    inputName.value = ""
    inputPrice.value = ""
    inputDisc.value =""
    inputAmount.value = ""
    inputCategory.value =""
}

function btnUpData(index){
    inputName.value = storageDataProudct[index].pName
    inputPrice.value = storageDataProudct[index].pPrice
    inputDisc.value = storageDataProudct[index].pDice
    inputAmount.value = storageDataProudct[index].pAmount
    inputCategory.value = storageDataProudct[index].pCate
    btnarea.innerHTML = `<button  onclick="displayUpdata(${index})" type="button" data-bs-dismiss="modal" class="btn btn-primary">Add Updata</button>`
}

function displayUpdata(index){
    pDice = inputDisc.value.includes("%") ? inputDisc.value.slice(0, inputDisc.value.length - 1) : inputDisc.value
    storageDataProudct[index].pName = inputName.value
    storageDataProudct[index].pPrice = inputPrice.value
    storageDataProudct[index].pDice = pDice
    storageDataProudct[index].PTotal =  Number((inputPrice.value * inputAmount.value) - ((inputPrice.value * inputAmount.value) * (pDice / 100))).toFixed(2)
    storageDataProudct[index].pAmount = inputAmount.value
    storageDataProudct[index].pCate =inputCategory.value
    localStorage.setItem("dataProdctS" , JSON.stringify(storageDataProudct))
    displayProudcts()
    removeInput()
    btnarea.innerHTML = `<button id="addProducts" onclick="addProducts()" class="btn btn-primary">Add Proudct</button>`
}

function btnDelet(index){
    storageDataProudct.splice(index, 1)
    localStorage.setItem("dataProdctS" , JSON.stringify(storageDataProudct))
    displayProudcts()
    if(localStorage.getItem("dataProdctS").includes(storageDataProudct))
    {
        localStorage.removeItem("dataProdctS")
        window.location.reload()
    }
}


search.addEventListener("keyup" ,function(){
    let dSearch = ``;
    for(let i = 0; i < storageDataProudct.length; i++)
    {
        if(storageDataProudct[i].pName.toLowerCase().includes(this.value.toLowerCase()))
        {
            dSearch += `<tr>
            <td class="border-bottom py-2 ">${storageDataProudct[i].pName.charAt(0).toUpperCase()+storageDataProudct[i].pName.slice(1).toLowerCase()}</td>
            <td class="border-bottom py-2">${storageDataProudct[i].pPrice}</td>
            <td class="border-bottom py-2">${storageDataProudct[i].pDice+""}</td>
            <td class="border-bottom py-2">${storageDataProudct[i].PTotal}</td>
            <td class="border-bottom py-2">${storageDataProudct[i].pCate.charAt(0).toUpperCase()+storageDataProudct[i].pCate.slice(1).toLowerCase()}</td>
            <td class="border-bottom py-2">${storageDataProudct[i].pAmount}</td>
            <td class="border-bottom py-2"><i onclick="btnUpData(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="updata fa-regular fa-pen-to-square me-1"></i> <i onclick="btnDelet(${i})"  class="delete fa-regular fa-trash-can ms-1"></i></td>
         </tr>`
        }
    }
    displayPro.innerHTML = dSearch;
})




inputName.addEventListener("keyup",emptyName)
function emptyName(){
    if(inputName.value == ""){
        alertName.classList.remove("d-none")
        alertName.classList.add("d-block")
        return true
    }
    else{
        alertName.classList.remove("d-block")
        alertName.classList.add("d-none")
        return false
    }
}

inputName.addEventListener("blur",emptyName)
function emptyName(){
    if(inputName.value == ""){
        alertName.classList.remove("d-none")
        alertName.classList.add("d-block")
        return true
    }
    else{
        alertName.classList.remove("d-block")
        alertName.classList.add("d-none")
        return false
    }
}

inputAmount.addEventListener("keyup",matchAmount)
function matchAmount(){
    if(regexNum.test(inputAmount.value))
    {
        alertAmount.classList.remove("d-block")
        alertAmount.classList.add("d-none")
        return false
    }
    else{
        alertAmount.classList.remove("d-none")
        alertAmount.classList.add("d-block")
    }
}

inputAmount.addEventListener("blur",emptyAmount)
function emptyAmount(){
    if(inputAmount.value ==""){
        alertAmount.classList.remove("d-none")
        alertAmount.classList.add("d-block")
        return true
    }
    else
    {
        alertAmount.classList.remove("d-block")
        alertAmount.classList.add("d-none")
        return false
    }
}

inputPrice.addEventListener("keyup", matchPrice )
function matchPrice(){
    if(regexNum.test(inputPrice.value)){

        alertPrice.classList.remove("d-block")
        alertPrice.classList.add("d-none")
        return false
    }
    else{
        alertPrice.classList.remove("d-none")
        alertPrice.classList.add("d-block")
    }
}

inputPrice.addEventListener("blur",emptyPrice)
function emptyPrice(){
    if(inputPrice.value == "")
    {
        alertPrice.classList.remove("d-none")
        alertPrice.classList.add("d-block")
        return true
    }
    else
    {
        alertPrice.classList.remove("d-block")
        alertPrice.classList.add("d-none")
        return false
    }
}



inputCategory.addEventListener("keyup",emptyCategory)
function emptyCategory(){
    if(inputCategory.value == ""){
        alertCategory.classList.remove("d-none")
        alertCategory.classList.add("d-block")
        return true
    }
    else{
        alertCategory.classList.remove("d-block")
        alertCategory.classList.add("d-none")
        return false
    }
}

inputCategory.addEventListener("blur",emptyCategory)
function emptyCategory(){
    if(inputCategory.value == ""){
        alertCategory.classList.remove("d-none")
        alertCategory.classList.add("d-block")
        return true
    }
    else{
        alertCategory.classList.remove("d-block")
        alertCategory.classList.add("d-none")
        return false
    }
}
