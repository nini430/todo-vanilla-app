let input=document.querySelector(".todo-input");
let addBtn=document.querySelector(".add");
let list=document.querySelector('.list');


let functions={
    addToDo:(e)=>{
        e.preventDefault();
        let todo=input.value;
        let newTodo={
            task:todo,
            status:false,
            edit:false
        }

        input.value="";

        services.addToDo(newTodo);
        functions.appendElement(newTodo);
        pagination.render();
        pagination.gotToLastPage();
        
       

    },
    appendElement:function(newTodo) {
        const item=this.getItemView(newTodo);
        list.appendChild(item);
        console.log(item);
    },

    removeTodo:(elem,itemId)=>{
            services.removeTodo(itemId);
            functions.removeElement(elem.parentNode);
            pagination.render();
            
            

    },

    removeElement:(elemParent)=>{
        list.removeChild(elemParent);
    },

    toggleComplete:(elem,itemId)=>{
        const todo=services.toggleComplete(itemId);
        functions.updateElement(elem.parentNode,todo);
    },

    updateElement:(elemParent,todo)=>{
            const item=functions.getItemView(todo);
            console.log(elemParent);
            console.log(item);
            list.replaceChild(item,elemParent);
            elemParent.remove();
    },
    
    getItemView:(newtodo)=>{
        let todoLi=document.createElement("li");
        todoLi.innerText=newtodo.task;
        let editBtn=document.createElement("button");
        editBtn.innerText="edit";
        editBtn.addEventListener("click",()=>functions.toggleEdit(todoLi,newtodo.id))
        let removeBtn=document.createElement("button");
        removeBtn.innerText="remove";
        removeBtn.addEventListener("click",()=>functions.removeTodo(removeBtn,newtodo.id));
        const checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.addEventListener("click",()=>functions.toggleComplete(checkbox,newtodo.id))
        todoLi.prepend(checkbox);
        todoLi.appendChild(editBtn);
        todoLi.appendChild(removeBtn);
        todoLi.setAttribute("id",newtodo.id);
        if(newtodo.status) {
            todoLi.classList.add("line-through");
            checkbox.checked=true;
        }
        if(newtodo.edit) {
            console.log(newtodo.task)
           todoLi.innerHTML=`
            <input onkeyup="functions.updateData(event,${newtodo.id})" type="text"
            value='${newtodo.task}'></input>
            <button onclick="functions.save(event,${newtodo.id})"  >Save</button>
            <button onclick="functions.cancel(event,${newtodo.id})">Cancel</button>
           `
           
           console.log(todoLi);


        }
        return todoLi;
    },

    onToggleEvent:(event)=>{
        if(event.target.tagName.toLowerCase()!=="li") {return {}};
        const itemId=event.target.id;
        const numId=Number(itemId);
        functions.toggleEdit(event.target,numId);


        
    },
    toggleEdit:(target,itemId)=>{
        const todo=services.toggleEdit(itemId);
        console.log(target);
        functions.updateElement(target,todo);
    },
    updateData:(event,itemId)=>{
        if(event.which===27) {
            functions.toggleEdit(event.target.parentNode,itemId);
        }
        else if(event.which===13) {
            services.updateValue(itemId,event.target.value);
            functions.toggleEdit(event.target.parentNode,itemId);
            
        }
    },
    save:(event,itemId)=>{
        const elemParent=event.target.parentNode;
        const value=elemParent.firstElementChild.value;
        services.updateValue(itemId,value);
        functions.toggleEdit(elemParent,itemId)
    },
    cancel:(event,itemId)=>{
        const elemParent=event.target.parentNode;
        functions.toggleEdit(elemParent,itemId);
    },
    render:(todosList)=>{
        list.innerHTML="";
        if(todosList.length===0) {
            list.innerText="No new todo yet, be cool and add new one"
        }else{
            for(let i=0;i<todosList.length;i++) {
                const item=functions.getItemView(todosList[i]);
                console.log(todosList[i])
                list.appendChild(item);
            }
        }
    },

}


// event listeners

addBtn.addEventListener("click",functions.addToDo);
list.addEventListener("dblclick",functions.onToggleEvent);

functions.render(services.getPageData(1,pagination.record_per_page));


