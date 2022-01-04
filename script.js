let arrListWidthItem;

/*{
    img:
    title:
    description:
    price
}*/

(function(){

    if(localStorage.getItem("todoList")){
        arrListWidthItem = JSON.parse(localStorage.getItem("todoList"));
    } else {
        arrListWidthItem = [];

        localStorage.setItem("todoList" , arrListWidthItem)
    }

    function createList () {
        let ul = document.createElement("ul");
        ul.setAttribute("class", "flex listWidthContent__ul");
        ul.setAttribute("id", "listWidthContent");

        return (ul);
    }

    function createButtonForFilter () {
        let btn = document.createElement("button");
        btn.setAttribute("class", "listWidthContent__button-filter");
        btn.textContent = "По умолчанию"

        return btn;
    }

    function createItem(arr) {
        let list = createList();


        for(let key in arr) {
            let li = document.createElement("li");
            li.setAttribute("class", "listWidthContent__item");
            li.setAttribute("onmouseover", `showDeleteButton(this)`)
            li.setAttribute("onmouseout", "notShowDeleteButton(this)");

            let img = document.createElement("img");
            img.setAttribute("src", `${arr[key]["img"]}`);
            img.setAttribute("alt", `Фотография товара`);
            img.setAttribute("class", "listWidthContent__img");

            let title = document.createElement("h2");
            title.textContent = `${arr[key]["title"]}`;
            title.setAttribute("class", "listWidthContent__title");

            let p = document.createElement("p");
            p.textContent = `${arr[key]["description"]}`;
            p.setAttribute("class", "listWidthContent__p")

            let span = document.createElement("span");
            span.textContent = `${arr[key]["price"]} руб.`; 
            span.setAttribute("class", "listWidthContent__span")

            let button = document.createElement("button");
            button.setAttribute("class", "delete");
            button.setAttribute("data-title", `${arr[key]["title"]}`);
            button.setAttribute("data-price", `${arr[key]["price"]}`);
            button.setAttribute("data-description", `${arr[key]["description"]}`);
            button.setAttribute("data-image", `${arr[key]["img"]}`);
            button.setAttribute("onclick", "del(this)");

            li.append(button);
            li.append(img);
            li.append(title);
            li.append(p);
            li.append(span);

            list.append(li);
        }        
        return (list)
    }
    let buttonForFilter = createButtonForFilter();
    let result = createItem(arrListWidthItem);

    document.getElementById("todo-list").append(buttonForFilter);
    document.getElementById("todo-list").append(result);

    window.createItem = createItem;

})();


document.getElementById("form").addEventListener("submit", function (el) {
    el.preventDefault();

    let title = document.getElementById("inputName").value;
    let img = document.getElementById("inputImg").value;
    let description = document.getElementById("inputDescription").value;
    let price = document.getElementById("inputPrice").value;

    let text = document.createElement("p");
    text.textContent = "Поле является обязательным";
    text.setAttribute("id", "errorText")

    if (title == ""  || img =="" || description=="" || price == "") {
        if(title == "") {
            document.getElementById("inputName").style.border = "1px solid red";
            document.getElementById("inputName").style.borderRadius = "4px";
            document.getElementById("addItemTolistWrapper__item__name").append(text);
            if (document.getElementById("errorText")) {
                document.getElementById("errorText").replaceWith(text);
            }

        } else if(img =="") {
            document.getElementById("inputImg").style.border = "1px solid red";
            document.getElementById("inputImg").style.borderRadius = "4px";
            document.getElementById("addItemTolistWrapper__item__img").append(text);
            if (document.getElementById("errorText")) {
                document.getElementById("errorText").replaceWith(text);
            }

        } else if(description == "") {
            document.getElementById("inputDescription").style.border = "1px solid red";
            document.getElementById("inputDescription").style.borderRadius = "4px";
            document.getElementById("addItemTolistWrapper__item__description").append(text);
            if (document.getElementById("errorText")) {
                document.getElementById("errorText").replaceWith(text);
            }

        } else if(price == "") {
            document.getElementById("inputPrice").style.border = "1px solid red";
            document.getElementById("inputPrice").style.borderRadius = "4px";
            document.getElementById("addItemTolistWrapper__item__price").append(text);
            if (document.getElementById("errorText")) {
                document.getElementById("errorText").replaceWith(text);
            }

        }
        return 
    } else {
        if(document.getElementById("errorText")) {
            document.getElementById("errorText").remove();
        }
        
        document.getElementById("inputName").style.border = "none";
        document.getElementById("inputImg").style.border = "none";
        document.getElementById("inputDescription").style.border = "none";
        document.getElementById("inputPrice").style.border = "none";

        arrListWidthItem.push({
            img: img,
            title: title,
            description: description,
            price: price,
        });
    
        localStorage.setItem("todoList", JSON.stringify(arrListWidthItem));
        
        document.getElementById(`listWidthContent`).replaceWith(createItem(arrListWidthItem));

        
    }
});

function del (el) {
    arrListWidthItem.filter(item => {
        if (item["price"] == el.getAttribute("data-price")) {
            let ind = arrListWidthItem.indexOf(item, 0);
            arrListWidthItem.splice(ind ,1);
            localStorage.setItem("todoList",JSON.stringify(arrListWidthItem));
            document.getElementById(`listWidthContent`).replaceWith(createItem(arrListWidthItem));        }
    });
    
}

function showDeleteButton (el) {
    el.childNodes[0].style.display = "block"
}

function notShowDeleteButton (el) {
    el.childNodes[0].style.display = "none"
}