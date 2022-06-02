let paginationContainer=document.querySelector(".pagination-container");


let pagination={
    currentPage:1,
    record_per_page:10,
    total_records:50,     //default
    pages:1,
    render:function() {
        paginationContainer.innerHTML="";
      this.total_records=services.getTodoCount();
      let pages=Math.ceil(this.total_records/this.record_per_page);
      console.log(pages);
      
      let prevBtn=document.createElement("button");
      prevBtn.innerText="prev";
      prevBtn.addEventListener("click",()=>pagination.prev(prevBtn));
      let nextBtn=document.createElement("button");
      nextBtn.innerText="next";
      nextBtn.addEventListener("click",()=>pagination.next(nextBtn))
      paginationContainer.appendChild(prevBtn);
        pagination.pages=pages;
      for(let i=1;i<=pages;i++) {
          const button=pagination.getButton(i);
          button.classList.add("pagination-button");
          button.setAttribute("id","btn"+i);
          console.log(button);
          button.addEventListener("click",()=>pagination.goToPage(button,i))
          paginationContainer.appendChild(button);
          
      }

     
      paginationContainer.appendChild(nextBtn);

    },
    getButton:(i)=>{
        const pageBtn=document.createElement("button");
        pageBtn.innerText=i;
        console.log(i);
        console.log(pagination.currentPage)
        if(Number(pageBtn.innerText)==pagination.currentPage) {
            pageBtn.classList.add("active");
            console.log(pageBtn);
        }
        console.log(pageBtn);
        return pageBtn;

    },
    goToPage:(element,pageNumber)=>{
           pagination.currentPage=pageNumber;
           let paginArray=document.querySelectorAll(".pagination-button");
           for(let i=0;i<paginArray.length;i++) {
               paginArray[i].classList.remove("active");
           }

           element.classList.add("active")

           const fragmentedData=services.getPageData(pageNumber,pagination.record_per_page);
           functions.render(fragmentedData);
           

    },
    gotToLastPage:()=>{
        pagination.currentPage=pagination.pages;
        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        pagination.goToPage(currentBtn,pagination.currentPage);
    },
    prev:(btn)=>{
        if(pagination.currentPage===1) {return};
        pagination.currentPage=pagination.currentPage-1;
        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        console.log(currentBtn);
        pagination.goToPage(currentBtn,pagination.currentPage);

    },

    next:(btn)=>{
        if(pagination.currentPage==pagination.pages) {return}
            pagination.currentPage=pagination.currentPage+1;
        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        pagination.goToPage(currentBtn,pagination.currentPage);

    }
}

pagination.render();
