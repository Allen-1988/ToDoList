const list = document.querySelector(".list");
const txtInput = document.querySelector(".txtInput");
const btnAdd = document.querySelector(".btn_add");
const listNum = document.querySelector(".list_footer p");
const cleanDone = document.querySelector(".list_footer a");

//全部資料(預設資料，最後可以註解掉)
let data =[];

//1.新增事項功能
btnAdd.addEventListener('click',addTodo);
function addTodo(){
    let obj = {
        txt:txtInput.value,
        id:new Date().getTime(),
        checked:''
    }
    if(obj.txt !=''){
        data.unshift(obj);

    }
    else{
        alert("請輸入代辦事項");
    }
    //renderData();
    updateList();
}

//2.初始化全部資料
function renderData(dataObj){
    let str = '';
    dataObj.forEach(function(item,index){
        str += `<li data-id="${item.id}">
            <label class="checkbox" for="">
                <input type="checkbox"  ${item.checked} />
                <span>${item.txt}</span>
            </label>
            <a href="#" class="delete" ></a>
            </li>`;
    })
    //console.log(str);
    list.innerHTML = str;
    listNum.textContent = `${data.length}個待處理件數`;
}

//3.tab切換
const tab = document.getElementById('tab');
let toggleStatus = 'all';
tab.addEventListener('click',tabChange);
function tabChange(e){    
     toggleStatus = e.target.dataset.tab;
     //console.log(toggleStatus);//確認有抓到值
     let tabs = document.querySelectorAll('#tab li');
    tabs.forEach(function(i){
        i.classList.remove('active');
    });
    e.target.classList.add('active');
    updateList();
}

//4.刪除 & 切換 checked 狀態功能
list.addEventListener('click',deleteAndChange);
function deleteAndChange(e){
    let Id = e.target.closest('li').dataset.id;
    //console.log(Id);
    if(e.target.classList.value =='delete' ){
        //console.log(Id);
        e.preventDefault();
        data = data.filter(function(i){
            return i.id != Id;
        });
    }
    else{
        //切換checked狀態功能 
        data.forEach(function(i,index){
            if(i.id == Id){
                if(data[index].checked == "checked"){
                    data[index].checked ="";
                }
                else{
                    data[index].checked= "checked";
                }
            }
        });
    }
    //renderData();
    updateList();
}

//5.更新待辦清單
function updateList(){
    let newData = [];
    if(toggleStatus =='all'){
        newData = data;
    }
    else if(toggleStatus =='work'){
        newData = data.filter(item => item.checked =="")
    }
    else{
        newData = data.filter(item => item.checked == "checked")
    }
    let workNum = document.querySelector(".workNum")
    let todoLength = data.filter(item =>  item.checked === "")
    // 計算代辦事項
    workNum.textContent = todoLength.length
    
    renderData(newData);
    console.log(newData);
}

//renderData();
updateList();

//6.刪除已完成
cleanDone.addEventListener('click',function(e){
    e.preventDefault();
    data = data.filter((i) => i.checked != 'checked');
    updateList();
});



