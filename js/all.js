const list = document.querySelector(".list");
const txtInput = document.querySelector(".txtInput");
const btnAdd = document.querySelector(".btn_add");
const listNum = document.querySelector(".list_footer p");
const listCleanFinished = document.querySelector(".list_footer a");

//全部資料(預設資料，最後可以註解掉)
let data =[
    {
        content:"事項一",
        checked:""        
    },
    {
        content:"事項二",
        checked:""
    },
    {
        content:"事項三",
        checked:""
    }
]

//清除已完成項目用的空資料
// let CleanData = [];

//1.初始化全部資料
function renderData(){
    let str = '';
    data.forEach(function(item,index){
        str += `<li>
            <label class="checkbox" for="">
            <input type="checkbox" id="checkbox" data-num="${index}" ${item.checked} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a></li>`
    })
    //console.log(str);
    list.innerHTML = str;
    listNum.textContent = `${data.length}個項目件數`;
}

//5.初始化"待處理"資料
function renderTodoData(){
    let str ='';
    const todoData = data.filter(function(item){
        return item.checked == "";
    })
    //console.log(todaData);

    todoData.forEach(function(item,index){
        str += `<li>
        <label class="checkbox" for="">
        <input type="checkbox" id="checkbox" data-num="${index}" ${item.checked}/>
        <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a></li>`
    })
    //console.log(str);
    list.innerHTML = str;
    listNum.textContent = `${todoData.length}個待處理件數`;
}

//4.初始化"已完成"資料
function renderFinshedData(){
    let str = '';
    const finshedData = data.filter(function(item){
        return item.checked == "checked";
    })
    //console.log(finshedData);

    finshedData.forEach(function(item,index){
        str += `<li>
        <label class="checkbox" for="">
        <input type="checkbox" id="checkbox" data-num="${index}" ${item.checked}/>
        <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a></li>`
    })
    //console.log(str);
    list.innerHTML = str;
    listNum.textContent = `${finshedData.length}個已完成件數`;
}

//初始化清除已完成項目
// function renderCleanFinishedData(){
//     let str = '';
//     CleanData.forEach(function(item,index){
//         str +=CleanData;
//     })
//     //console.log(str);
//     list.innerHTML = str;
//     listNum.textContent =`0個已完成件數`;    
// }

//3.點TAB選單切換全部、待處理、和已完成(搭配4.5.一起寫出)
const tab = document.querySelector(".tab");
tab.addEventListener('click',function(e){    
    //console.log(e.target.getAttribute("class"));
    if(e.target.getAttribute("class") ==='all active'){  
        renderData();      
        //console.log(e.target.getAttribute("class"));
        return;
    }   
    else if(e.target.getAttribute("class") ==='todo'){
        renderTodoData();  
        return;
    }
    else if(e.target.getAttribute("class") ==='finished'){
        //console.log(e.target.getAttribute("class"));
        renderFinshedData();
    }
    else{
        return;
    }
})

//2.判斷checkbox是否點擊到 true有點到寫入"checked"，  false沒點到寫入""
list.addEventListener('click',function(e){
    //console.log(e.target.checked);
    let num = e.target.getAttribute("data-num")   
    console.log(e.target.nodeName);
    //console.log(num);      
    if(e.target.checked === true){
        console.log("有打勾");        
        data[num].checked = "checked";
        console.log(data[num]);              
    }
    else if(e.target.checked === false){
        console.log("沒打勾");
        data[num].checked = "";
        console.log(data[num]);                
    }    
    else{
        return;
    } 
})

//6.新增事項功能
btnAdd.addEventListener('click',function(e){
    if(txtInput.value ==""){
        alert("請輸入文字!");
        return;
    }    
    let obj = {};
    obj.content = txtInput.value;
    obj.checked = "";
    //console.log(obj);
    data.push(obj);
    renderData();
})

//7.刪除事項功能
list.addEventListener('click',function(e){
    //console.log("有點到");
    if(e.target.nodeName ==="A"){
        //console.log("有點到A連結");
        let num = e.target.getAttribute("data-num");
        console.log(num);
        data.splice(num,1);
        renderData();
    }
})

//8.清除已完成項目
listCleanFinished.addEventListener('click',function(e){      
    //console.log("有點到清除鍵");
    const CleanData = data.filter(function(item){
        return item.checked == "checked";
    })
    //console.log(CleanData);
    CleanData.forEach(function(item){
        data.splice(data.findIndex(function(el){
            return el.checked == item.checked;
        }),1)
    })
    renderData();
})


renderData();
