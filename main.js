
projectList = JSON.parse(localStorage.getItem('projectList')) || [];
projClicked = localStorage.getItem('projClicked') || '';
const pName = document.querySelector('.pName');
const create = document.querySelector('.create');
const completeNameList = document.querySelector('.completeNameList');

const createInput = () =>{
    projList = {name: pName.value};
    projectList.push(projList);
    localStorage.setItem('projectList', JSON.stringify(projectList));
    pName.value = "";
    render();
}

create.addEventListener('click', createInput)

render();

function render (e) {
    completeNameList.innerHTML = "";

    projectList.forEach(projList => {
        anchor = document.createElement('a');
        const edBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        anchor.setAttribute('href', 'planner.html');
        anchor.setAttribute('value', `${projList.name}`);
        const div = document.createElement('div');
        completeNameList.appendChild(div)
        div.appendChild(anchor);
        div.appendChild(edBtn);
        div.appendChild(delBtn);
        anchor.innerHTML = projList.name;
        edBtn.innerHTML = "Edit";
        delBtn.innerHTML = "Delete";

        edBtn.addEventListener('click', ()=>{
            anchor.innerHTML = `<input type="text" class="edText">`
            anchor.removeAttribute('href');
            edBtn.innerHTML = "Save";
            edBtn.setAttribute('class', 'edSave');
            const saveBtn = div.querySelector('.edSave');
            const edText = div.querySelector('.edText');
            const allItemsClicked = JSON.parse(localStorage.getItem(`items_${projList.name}`)); //capturar tarefas com a key antiga
            const holidaysClicked = JSON.parse(localStorage.getItem(`holidays_${projList.name}`));
            const hiddenClicked = JSON.parse(localStorage.getItem(`hidden_${projList.name}`));
            const startDateClicked = parseInt(localStorage.getItem(`startDate_${projList.name}`));
            localStorage.removeItem(`items_${projList.name}`); //remove a key e info antiga
            localStorage.removeItem(`holidays_${projList.name}`);
            localStorage.removeItem(`hidden_${projList.name}`);
            localStorage.removeItem(`startDate_${projList.name}`);
            localStorage.removeItem(`projectName_${projList.name}`)

            saveBtn.addEventListener('click', ()=>{
                anchor.setAttribute('href', 'planner.html');
                anchor.innerHTML = edText.value;
                projList.name = edText.value;
                localStorage.setItem('projectList', JSON.stringify(projectList));
                localStorage.setItem(`items_${projList.name}`, JSON.stringify(allItemsClicked)); //grava as tarefas com nova Key
                localStorage.setItem(`holidays_${projList.name}`, JSON.stringify(holidaysClicked));
                localStorage.setItem(`hidden_${projList.name}`, JSON.stringify(hiddenClicked));
                localStorage.setItem(`startDate_${projList.name}`, JSON.stringify(startDateClicked));
                localStorage.setItem(`projectName_${projList.name}`, JSON.stringify(projList.name));
                render();
            })

        });
        
        delBtn.addEventListener('click', ()=>{
            projectList = projectList.filter(t => t != projList);
            localStorage.setItem('projectList', JSON.stringify(projectList));
            localStorage.removeItem(`items_${projList.name}`);
            localStorage.removeItem(`startDate_${projList.name}`);
            localStorage.removeItem(`holidays_${projList.name}`);
            localStorage.removeItem(`hidden_${projList.name}`);
            localStorage.removeItem(`projectName_${projList.name}`);
            render();
        })
    });
}

completeNameList.addEventListener('click', (e)=>{
    projClicked = e.target.innerHTML
    localStorage.setItem('projClicked', projClicked);
})
//export { projectList };
