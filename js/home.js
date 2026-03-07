//  spinner function
const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');

        document.getElementById('issues-container').classList.add('hidden')
    } else {
        document.getElementById('issues-container').classList.remove('hidden');

        document.getElementById('spinner').classList.add('hidden')
    }
}

// remove active class function
const removeActive = () => {
    const issueBtn = document.querySelectorAll(".issueBtn ");
    issueBtn.forEach(btn => btn.classList.remove('active'))
}


//  api load
async function loadIssue() {
    manageSpinner(true)
    let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    let data = await res.json();
    manageSpinner(false)
    displayIssue(data.data)

}

// api display
const displayIssue = (datas) => {
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    datas.forEach(data => {
        // console.log(data)
        const issuesCardDiv = document.createElement('div');
        issuesCardDiv.innerHTML = `
           <div onclick="loadIssueModal(${data.id})"  id="card" class="issueCard px-5 py-5 bg-white shadow  space-y-5 rounded-2xl border-t-4">
                 <div class="flex justify-between items-center ">
                    <img class="img-open-close" src="./assets/Open-Status.png" alt="">
                    <p class="px-3 py-1 rounded-2xl  font-medium text-[#ef4444] text-center bg-[#feecec] "><span> ${data.priority}  </span></p>
                 </div>
                 <div class = "space-y-3">
                    <h1 class="text-xl md:text-2xl font-bold">${data.title} </h1>
                    <p class="font-light line-clamp-2 text-[#6b7a90]">${data.description}</p>

                 </div>
                 <div class="flex items-center gap-2">
                     <p class="px-3 py-1 text-[12px] rounded-2xl border-2 border-[#f6c0c0] font-medium text-[#ef4444] text-center bg-[#feecec] "><i class="fa-solid fa-bug"></i><span>${data.labels[0] ? data.labels[0] : "No label"} </span></p>
                     <p class="px-3 py-1 text-[12px] rounded-2xl border-2 border-[#fde68a] font-medium text-[#d97706] text-center bg-[#fff8db] "><i class="fa-solid fa-life-ring"></i><span> ${data.labels[1] ? data.labels[1] : "No label"}</span></p>
                 </div>
                 <div class="divider"></div>
                 <div class="text-[#6b7a90]">
                    <p><span># ${data.id}</span> by <span> ${data.author} </span></p>
                    <p> ${data.createdAt.split("T")[0]} </p>
                 </div>
            </div> 

         
         `
        const card = issuesCardDiv.querySelector(".issueCard")
        if (data.status === "open") {
            card.classList.add("border-[#00a96e]");
        } else {
            const closeImg = issuesCardDiv.querySelector(".img-open-close");
            closeImg.src = "./assets/close.png";
            card.classList.add("border-[#a855f7]");
        }


        issuesContainer.appendChild(issuesCardDiv)



    });
    // count ...
    let issuesTotal = document.getElementById('issues-total');
    issuesTotal.textContent = ` ${datas.length}`

}


// load modal
const loadIssueModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    let rel = await fetch(url)
    let data = await rel.json();
    displayIssueModal(data.data)

}

const displayIssueModal = (modals) => {
    const modalContainer = document.getElementById('modal_container');
    modalContainer.innerHTML = "";


    // console.log(modal)
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
        <div class="">
            <div class="space-y-5">
                <h1 class="text-xl md:text-3xl font-bold">${modals.title}</h1>
                <div class="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                    <span class="issueCard font-medium text-[11px] px-2 py-1 rounded-full  text-white">
                       ${modals.status}
                    </span>
                    <span>• Opened by <strong> ${modals.assignee}</strong></span>
                    <span>• ${modals.updatedAt.split("T")[0]} </span>
                </div>
                <div class="flex items-center gap-2">
                    <p
                        class="px-3 py-1 text-[12px] rounded-2xl border-2 border-[#f6c0c0] font-medium text-[#ef4444] text-center bg-[#feecec] ">
                        <i class="fa-solid fa-bug"></i><span>${modals.labels[0] ? modals.labels[0] : "No label"}  </span>
                    </p>
                    <p
                        class="px-3 py-1 text-[12px] rounded-2xl border-2 border-[#fde68a] font-medium text-[#d97706] text-center bg-[#fff8db] ">
                        <i class="fa-solid fa-life-ring"></i><span> ${modals.labels[0] ? modals.labels[0] : "No label"} </span>
                    </p>
                </div>
                <div>
                         <p class="font-light text-[#6b7a90]"> ${modals.description}</p>
                </div>
                <div class="grid grid-cols-2 bg-[#f8fafc] py-4 px-2">
                    <div>
                        <p class="font-light text-[#6b7a90]">Assignee:</p>
                        <h3 class="font-medium">${modals.assignee}</h3>
                    </div>
                    <div>
                        <p class="font-light text-[#6b7a90]">Priority::</p>
                         <p class=" font-medium text-[11px] text-center w-[70px] px-2 py-1 rounded-full bg-red-700 text-white">
                       ${modals.priority}
                         </p>
                    </div>
                </div>

            </div>
        </div>

        
        `;
    const card = modalDiv.querySelector(".issueCard")
    if (modals.status === "open") {
        card.classList.add("bg-[#00a96e]");
    } else {
        card.classList.add("bg-[#a855f7]");
    }

    modalContainer.appendChild(modalDiv);

    document.getElementById('my_modal_5').showModal()



}









// filter Issues
async function filterIssues(status) {
    let res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    let data = await res.json();

    let filtered;
    if (status === "all") {
        filtered = data.data;
    }
    else {
        filtered = data.data.filter(issue => issue.status === status);
    }

    displayIssue(filtered);

}

// all buttons
const allButton = document.getElementById("all-button");
const openButton = document.getElementById("open-button");
const closeButton = document.getElementById("close-button");

allButton.addEventListener("click", () => {
    removeActive()  // remove active class

    allButton.classList.add('active') // add active class

    filterIssues("all")
});

openButton.addEventListener("click", () => {
    removeActive()  // remove active class

    openButton.classList.add('active') // add active class


    filterIssues("open")
});
closeButton.addEventListener("click", () => {

    removeActive()  // remove active class

    closeButton.classList.add('active') // add active class

    filterIssues("closed")
});


loadIssue()

// loadIssue()

// search button ...
document.getElementById("btn_search").addEventListener("click", () => {
    removeActive()
    const input = document.getElementById("input_search");
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q= ${searchValue}`)
        .then(res => res.json())
        .then(data => {
            const allIssues = data.data;

            const filterIssues = allIssues.filter((i) =>
                i.title && i.title.toLowerCase().includes(searchValue)
            );
            displayIssue(filterIssues);
        })

})
