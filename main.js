let title =document.getElementById("title");
let price =document.getElementById("price");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("create");
let mood="create";
let tmp;


// Start Get Total 

function getTotal(){
    if(price.value != ""){
        let element = +price.value + +ads.value - discount.value;
        total.innerHTML=element;
        total.style.backgroundColor="#13b045";
    }
else{
    total.innerHTML="";
    total.style.backgroundColor="red"
}
}
//Create Product 
let dataPro;
if(localStorage.Product != null){
    dataPro = JSON.parse(localStorage.Product);
}
else{
    dataPro=[]
}
submit.onclick=function(){
    let obj = {
        title :     title.value.toLowerCase(),
        price :     price.value,
        ads :       ads.value,
        discount : discount.value,
        total :     total.innerHTML,
        count :     count.value,
        category : category.value.toLowerCase(),
                
    }
if(title.value!="" && price.value!="" ){

    if(mood==="create"){
        if(obj.count > 1){
            for(let i=0; i< obj.count; i++){
                dataPro.push(obj);
            }
        }
        else{
            dataPro.push(obj);
        }
    }else{
        mood="create";
        count.style.display="block"
        dataPro[tmp]=obj;
        submit.innerHTML="إنشاء"

        
    }
    clearInputs()
}
   
    localStorage.setItem("Product",JSON.stringify(dataPro))

console.log(dataPro)

showData()
}


// Clear inputs
function clearInputs(){
    title.value="";
    price.value="";
    ads.value="";
    discount.value="";
    count.value="";
    category.value="";
    total.innerHTML="";
}
 
// Read 

function showData(){
    getTotal()
    let table ='';
    for(let i=0 ; i<dataPro.length ; i++){
        table += `
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td><button onclick="deleteElement(${i})" id="delete">حذف</button></td>
        <td><button onclick="updataElement(${i})" id="updata">تعديل</button></td>
    </tr>
        `}
        document.getElementById("tbody").innerHTML=table;

        let deleteAll=document.querySelector("#deleteAll")
        if(dataPro.length>0){
            deleteAll.innerHTML=`
            <button onclick=deleteAll() >حذف الكل ( ${dataPro.length} ) </button>
            `
        }else{
            deleteAll.innerHTML=""
        }

   
}

showData()

// delete element 

function deleteElement(i){
    dataPro.splice(i,1);
    localStorage.Product=JSON.stringify(dataPro)
    showData()
}


// delete all 
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData()
}

//count 

//for loop under push


//Updata
function updataElement(i){
title.value=dataPro[i].title;
category.value=dataPro[i].category;
price.value=dataPro[i].price;
ads.value=dataPro[i].ads;
discount.value=dataPro[i].discount;
getTotal()
count.style.display="none";
mood="updata";
tmp=i;
submit.innerHTML="تعديل"
scroll({
    top:0,
    behavior:"smooth",
})

}

// Search
let searchMood="title"
let search=document.querySelector("#search-i")
function searchby(id){
    if(id==="searchbytitle"){
        searchMood="title"
        search.placeholder="بحث بالأسم"
    }else{
        searchMood="category"
        search.placeholder="بحث بالنوع"
    }
    search.focus();
    search.value=''
    showData()
}


function searchData(value){


let table ='';
for(let i=0 ; i<dataPro.length ; i++){
        if(searchMood==="title"){
            if(dataPro[i].title.includes(value.toLowerCase())){
              
                    table += `
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td><button onclick="deleteElement(${i})" id="delete">حذف</button></td>
                    <td><button onclick="updataElement(${i})" id="updata">تعديل</button></td>
                </tr>
                    `
            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase()))
         
                table += `
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td><button onclick="deleteElement(${i})" id="delete">حذف</button></td>
                <td><button onclick="updataElement(${i})" id="updata">تعديل</button></td>
            </tr>
                `

        }

}

        document.getElementById("tbody").innerHTML=table;
        
}