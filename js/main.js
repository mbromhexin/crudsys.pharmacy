var nameInput = document.getElementById('nameInput')
var companyInput = document.getElementById('companyInput')
var priceInput = document.getElementById('priceInput')
var discountInput = document.getElementById('discountInput')
var countInput = document.getElementById('countInput')
var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('updateBtn')
var tableBody = document.getElementById('tableBody')

//hide update btn
updateBtn.style.display = 'none'

//main Array

var drugContainer;
if(localStorage.getItem('drugContainer') != null)
{
    drugContainer = JSON.parse(localStorage.getItem('drugContainer'))
    displayAllDrugs(drugContainer)
}else{
    drugContainer = []
}

addBtn.onclick = function()
{
    var itemInfo = {
        name:nameInput.value,
        company:companyInput.value,
        price:priceInput.value,
        discount:discountInput.value,
        count:countInput.value,
    }
    drugContainer.push(itemInfo)
    saveIntoLocalStorge()
    clearInput()
    displayAllDrugs(drugContainer)
}

function saveIntoLocalStorge()
{
    localStorage.setItem('drugContainer',JSON.stringify(drugContainer))
}

var indexOfUpdatedItem;
function updateRow(index)
{
    alert(`update       """ ${drugContainer[index].name} """`)
    addBtn.style.display = 'none'
    updateBtn.style.display = 'block'
    nameInput.value =  drugContainer[index].name
    companyInput.value = drugContainer[index].company
    priceInput.value = drugContainer[index].price
    discountInput.value = drugContainer[index].discount
    countInput.value = drugContainer[index].count
    indexOfUpdatedItem = index
}

function updateDrug()
{
    var itemInfo = {
        name:nameInput.value,
        company:companyInput.value,
        price:priceInput.value,
        discount:discountInput.value,
        count:countInput.value,
    }
    drugContainer.splice(indexOfUpdatedItem,1,itemInfo)
    saveIntoLocalStorge()
    clearInput()
    displayAllDrugs(drugContainer)
    addBtn.style.display = 'block'
    updateBtn.style.display = 'none'

}

function deleteRow(index)
{
    var confirmed = confirm(`delete       """ ${drugContainer[index].name} """`)
    if(confirmed)
    {
        drugContainer.splice(index,1)
        saveIntoLocalStorge()
        displayAllDrugs(drugContainer)
    }
}

function calculateTotal(price,discount,count)
{
    var discountValue = (price/100)*discount;
    if(price > 0 && count > 0)
    {
        // alert("price = "+price+"discount =  "+discount+"count = "+count)
        // alert((price-discountValue)*count)
        return (price-discountValue)*count

    }else{
        alert("price must be > 0 and count must be > 0")
    }
}

function displayAllDrugs(arr)
{
    var html = ''
    for(var i=0; i<arr.length; i++)
    {
        html += 
        `
        <tr>
        <td>${i}</td>
        <td class="text-start">${arr[i].name}</td>
        <td>${arr[i].company}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].count}</td>
        <td>${calculateTotal(arr[i].price,arr[i].discount,arr[i].count)}</td>
        <td><button onclick="updateRow(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = html
}

function clearInput()
{
    nameInput.value = '';
    companyInput.value ='';
    priceInput.value = ''
    discountInput.value ='';
    countInput.value = ''
}

function search(word)
{
    var searchContainer = []
    for(var i=0; i<drugContainer.length; i++)
    {
        if(drugContainer[i].name.toLowerCase().includes(word.toLowerCase()))
        {
            searchContainer.push(drugContainer[i])
        }
    }
    displayAllDrugs(searchContainer)
}
