let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        if (leads[i].includes("http://") || leads[i].includes("https://")) {
            listItems += `<li>
                            <button class="delete-item-btn" id="${i}">
                            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
                            <span class="material-symbols-outlined">delete</span>
                            </button>
                          </li>`;
        } else {
            listItems += `<li>
                            <button class="delete-item-btn" id="${i}">
                            <span class="material-symbols-outlined">delete</span>
                            </button>
                             ${leads[i]}
                          </li>`;
        }
    }
    ulEl.innerHTML = listItems;

    let deleteButtons = document.getElementsByClassName("delete-item-btn");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function(){
            let id = this.getAttribute("id");
            myLeads.splice(id, 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        })
    }
}

deleteBtn.addEventListener("dblclick", function(){
    clear();
})

function clear() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
})