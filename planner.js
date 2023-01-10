/* import { projectList } from "./main.js"
console.log(projectList) */

projClicked = localStorage.getItem('projClicked');
allItems = JSON.parse(localStorage.getItem(`items_${projClicked}`)) || [];
const projDiv = document.querySelector('.proj-div');
const projId = document.querySelector('.proj-id');
const btn = document.querySelector('.add-btn');
const task = document.querySelector('.task');
const predecessor = document.querySelector('.predecessor');
const duration = document.querySelector('.duration');
const form =document.querySelector('.form');
const projStartlbl = document.querySelector('.startDate-lbl');
projStart = document.querySelector('.proj-start');
const orderSD = document.querySelector('.order-startDate');
const orderDuration = document.querySelector('.order-duration');
const orderED = document.querySelector('.order-endDate');
const orderID = document.querySelector('.order-ids');
holidaysInput = document.querySelector('.holidays');
const holidaysBtn = document.querySelector('.Holiday-Btn');
const saveStartDate = document.querySelector('.save-sd');
holidays = JSON.parse(localStorage.getItem(`holidays_${projClicked}`)) || [];
const hideHoly = document.querySelector('.hideHoly');
const holidayDivs = document.querySelector('.all-holiday');
hidden = JSON.parse(localStorage.getItem(`hidden_${projClicked}`)) || '';
projId.value = projClicked;
const actualDate = document.querySelector('.actual-Date');
const fullDate = new Date();
actualDate.value = fullDate.getDate() + "/" + (fullDate.getMonth() + 1) + "/" + fullDate.getFullYear();
const chkDisclaimers = document.querySelector('.chkDisclaimers');
const hideDisclaimers = document.querySelector('.hideDisclaimers');
chkDisclaimers.checked = true;
hideDisclaimers.style.display = 'none';

chkDisclaimers.addEventListener('change', ()=>{
    if (chkDisclaimers.checked) {
        hideDisclaimers.style.display = 'none';
    }else{
        hideDisclaimers.style.display = 'block';
    }
})

holidaysBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const parsedDate = Date.parse(holidaysInput.value)
    
    holiday = {hDate: parsedDate}
    holidays.push(holiday);
    
    localStorage.setItem(`holidays_${projClicked}`, JSON.stringify(holidays));

    holidaysInput.value = "";

    HolidayDisplay();

    Display();
    finishProj();
    PercentOfDuration();
})

function HolidayDisplay(){
    const listHoliday = document.querySelector('.all-holiday');
    listHoliday.innerHTML = "";

    holidays.forEach(holiday => {
        const newDiv = document.createElement('div');
        const editHoly = document.createElement('button');
        const delHoly = document.createElement('button');
        newDiv.setAttribute('class', 'holidayDate');
        const holidayDay = (new Date(holiday.hDate)).getDate();
        const holidayMonth = (new Date(holiday.hDate)).getMonth() +1;
        const holidayYear = (new Date(holiday.hDate)).getFullYear();
        const date = holidayDay + "/" + holidayMonth + "/" + holidayYear;
        /* newDiv.innerHTML = `<input type="text" class="holidayText" value="${date}" readonly>
        <button class="editHoliday">Edit</button>
        <button class="deleteHoliday">Delete</button>`; */
        newDiv.innerHTML = `<input type="text" class="holidayText" readonly value="${date}">`;
        listHoliday.appendChild(newDiv);
        newDiv.appendChild(editHoly);
        newDiv.appendChild(delHoly);
        editHoly.innerHTML = 'Edit';
        delHoly.innerHTML = 'Delete';
        /* const editHoly = document.querySelector('.editHoliday');
        const delHoly = document.querySelector('.deleteHoliday'); */

        editHoly.addEventListener('click', (e)=>{
            e.preventDefault(); //sem isto corria o código todo de uma vez sem conseguir alterar
            const dateChange = newDiv.querySelector('.holidayText');
            dateChange.setAttribute('data-bckgrd', 'bckgrd-change');
            dateChange.setAttribute('onfocus', `${(dateChange.type='date')}`);
            dateChange.removeAttribute('readonly');
            editHoly.innerHTML='Save'
            editHoly.setAttribute('class', 'save-items')

            const saveItems = newDiv.querySelector('.save-items');

                saveItems.addEventListener('click', ()=>{
                    dateChange.removeAttribute('data-bckgrd');
                    dateChange.removeAttribute('onfocus');
				    dateChange.setAttribute('readonly', true);
				    holiday.hDate = Date.parse(dateChange.value);
				    localStorage.setItem(`holidays_${projClicked}`, JSON.stringify(holidays));
                    HolidayDisplay();
                    finishProj();
                    PercentOfDuration();
                    Display();
            })

            dateChange.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
                    dateChange.removeAttribute('data-bckgrd');
                    dateChange.removeAttribute('onfocus');
					dateChange.setAttribute('readonly', true);
					holiday.hDate = Date.parse(e.target.value);
					localStorage.setItem(`holidays_${projClicked}`, JSON.stringify(holidays));
                    HolidayDisplay();
                    finishProj();
                    PercentOfDuration();
                    Display();
				}
				else {
					dateChange.addEventListener('blur', (e) => {
                        dateChange.removeAttribute('data-bckgrd');
                        dateChange.removeAttribute('onfocus');
						dateChange.setAttribute('readonly', true);
						holiday.hDate = Date.parse(e.target.value);
						localStorage.setItem(`holidays${projClicked}`, JSON.stringify(holidays));
                        HolidayDisplay();
                        finishProj();
                        PercentOfDuration();
                        Display();
					})
				}
                
			});

        });
        delHoly.addEventListener('click', ()=>{
            holidays = holidays.filter(h => h != holiday);
			localStorage.setItem(`holidays_${projClicked}`, JSON.stringify(holidays));
            HolidayDisplay();
            Display();
            finishProj()
            PercentOfDuration();
        })
    })
    finishProj()
}

function HolidayVisible() {
    if(hidden == true){
        hideHoly.checked = true;
        holidayDivs.style.display = "none";
    }else{
        hideHoly.checked = false;
        holidayDivs.style.display = "block";
    }
}

HolidayVisible();

hideHoly.addEventListener('click', ()=>{
    
    if(hideHoly.checked) {
        holidayDivs.style.display = "none";
        hidden = true;
        localStorage.setItem(`hidden_${projClicked}`, hidden);
    }else{
        holidayDivs.style.display = "block";
        hidden = false
        localStorage.setItem(`hidden_${projClicked}`, JSON.stringify(hidden));
    }

});

/* projDiv.addEventListener('change', (e)=>{
    projId.value = projClicked
    localStorage.setItem(`projectName_${projClicked}`, projClicked);
})
 */
saveStartDate.addEventListener('click', (e)=>{
    const saveDate = Date.parse(projStart.value);
    localStorage.setItem(`startDate_${projClicked}`, saveDate);
    Display();
    finishProj()
})

loadStartDate = new Date(parseInt(localStorage.getItem(`startDate_${projClicked}`))) || '';
const startYear = loadStartDate.getFullYear();
const startMonth = loadStartDate.getMonth()+1;
const startDay = loadStartDate.getDate();
projStart.value = `${startDay}/${startMonth}/${startYear}`;

btn.addEventListener('click', (e)=>{
    e.preventDefault();

    const idArray = allItems.map(t => t.id);
    let resultId = Math.max(...idArray);

    if(resultId == -Infinity){
        resultId = 1;
    }else{
        resultId += 1;
    }

    if(predecessor.value == ""){
        predecessor.value = 0;
    }

    if(duration.value == ""){
        duration.value = 1;
    }

    allItem = {id: resultId, task: task.value, predecessor: predecessor.value, duration: parseInt(duration.value), startDate: 0, endDate: 0, checked: false}

    allItems.push(allItem)

    localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));

    task.value = '';
    predecessor.value = '';
    duration.value = '';

    Display();
    finishProj();
    PercentageCalc();
});

function Display() {
    // mais vale criar uma array de objetos e fazer um forEach.
    // o código deverá ficar um pouco mais curto e fica possível fazer save e load

    const listItems = document.querySelector('.all-items');
    listItems.innerHTML = "";

    allItems.forEach(allItem => {
        //const listItems = document.querySelector('.list-items');
        const myDiv = document.createElement('div');
        /* const myLabel = document.createElement('label'); */
        const taskId = document.createElement('input');
        taskId.type = 'text';
        // encontrar o último Id + 1
        const taskItem = document.createElement('input');
        taskItem.type = 'text';
        taskItem.value = task.value;
        taskItem.setAttribute('readonly', true);
        const durationItem = document.createElement('input');
        durationItem.type = 'text';
        durationItem.value = duration.value
        durationItem.setAttribute('readonly', true);
        const predecessorItem = document.createElement('input');
        predecessorItem.type = 'text';
        predecessorItem.value = predecessor.value
        predecessorItem.setAttribute('readonly', true);
        const itemControl = document.createElement('label');
        const editBtn = document.createElement('button');
        const sdInput = document.createElement('input');
        sdInput.type = 'text';
        const chkBox = document.createElement('input');
        chkBox.type = 'checkbox';
        chkBox.setAttribute('class', 'markComplete')
        const edInput = document.createElement('input');
        edInput.type = 'text';
        itemControl.setAttribute('class', 'actions')
        const delBtn = document.createElement('button');
        const labelChk = document.createElement('input');
        labelChk.type = 'text';
        labelChk.value = "Mark Done"
        labelChk.setAttribute('class', 'label-chk');

        displayStart = "";
        displayEnd = "";
        let dayOff = 0;

        //Trabalho nas datas:
        //verificar se começa ao fds -> se for sábado é +2 e domingo é +1 dia
        //verificar se começa num dia de férias -> loop do dia final sobre cada dia de férias, se encontra +1 dia
        //verificar se acaba ao fds -> se for sábado é +2 e domingo é +1 dia
        //verificar se acaba num dia de férias -> loop do dia final sobre cada dia de férias, se encontra +1 dia
        //verificar a cada +1 dia da duração se é fds -> se for sábado é +2 e domingo é +1 dia
        //verificar a cada +1 dia da duração se é de férias -> se apanha, adiciona 1 dia
        //todos os daysOff apanhados + a duração atribuida = duração total!
        //start date é +1 dia para ser Finish to Start
        //End date = duração total + Start Date

        if(parseInt(allItem.predecessor) === 0){
            const endResult = new Date(loadStartDate);
            //verificar se colocamos a data num dia de fim de semana e avançar automaticamente para a data correta
            if(endResult.getDay() === 6){endResult.setDate(endResult.getDate() + 2)}
            if(endResult.getDay() === 0){endResult.setDate(endResult.getDate() + 1);}
            redArray = holidays.map(d=> parseInt(d.hDate));
            redArray.forEach(holyDate =>{
                if(holyDate == endResult.getTime()) {endResult.setDate(endResult.getDate()+1)}
            });
            allItem.startDate = new Date(endResult);

            for (let i=0; i<allItem.duration; i++){
                
                if(endResult.getDay() === 6){dayOff++;}
                if(endResult.getDay() === 0){dayOff++;}
                redArray.forEach(holyDate =>{
                    if(holyDate == endResult.getTime()) {dayOff++;}
                });
                endResult.setDate(endResult.getDate() + 1);
            }
            
            //agora preciso novamente de iterar as datas para o nº de dayOff para capturar os fins de semana. Recursion?!
            for (let i=0; i<dayOff; i++){
                
                if(endResult.getDay() === 6){dayOff++;}
                if(endResult.getDay() === 0){dayOff++;}
                redArray.forEach(holyDate =>{
                    if(holyDate == endResult.getTime()) {dayOff++;}
                });
                endResult.setDate(endResult.getDate() + 1);
            }
            
            //endResult.setDate(endResult.getDate() - 1); //correção de -1 dia devido ao setDate estar no final do loop para apanhar fins de semana e férias
            //Preciso na mesma de manter o código abaixo, caso termine num dia de fim de semana ou férias por exemplo. Claramente Recursion!
            if(endResult.getDay() === 0){endResult.setDate(endResult.getDate() + 1);}
            if(endResult.getDay() === 6){endResult.setDate(endResult.getDate() + 2);}
            redArray.forEach(holyDate =>{
                if(holyDate == endResult.getTime()) {endResult.setDate(endResult.getDate()+1)}
            });
            //falta adicionar um if dentro do for loop quando quiser também contabilizar os feriados e férias
            //após o if dentro do for loop, preciso dum if cá fora, 
            //para garantir que ao adicionar os dayOff, feriados e férias ao baterem nesses dias avanço na data.

            allItem.endDate = new Date(endResult);
            localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
            const endDD = new Date(endResult).getDate();
            const endMM = new Date(endResult).getMonth() + 1;
            const endYY = new Date(endResult).getFullYear();

            const startDay = new Date(allItem.startDate).getDate();
            const startMonth = new Date(allItem.startDate).getMonth() + 1;
            const startYear = new Date(allItem.startDate).getFullYear();

            displayStart = startDay + "/" + startMonth + "/" + startYear;
            displayEnd = endDD + "/" + endMM + "/" + endYY;
            
        }else{
            const idsArr = allItems.map(t => t.id);
            const indexPredecessor = idsArr.indexOf(parseInt(allItem.predecessor));
            
            if (indexPredecessor >= 0){
                const initDate = new Date(allItems[indexPredecessor].endDate);
                //para começar no dia após o término da predecessora
                initDate.setDate(initDate.getDate() +1);
                if(initDate.getDay() === 6){initDate.setDate(initDate.getDate() + 2)}
                if(initDate.getDay() === 0){initDate.setDate(initDate.getDate() + 1);}
                redArray = holidays.map(d=> parseInt(d.hDate));
                redArray.forEach(holyDate =>{
                    if(holyDate == initDate.getTime()) {initDate.setDate(initDate.getDate() +1)}
                });
                
                allItem.startDate = new Date(initDate);
                localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems))
                const startDay = initDate.getDate();
                const startMonth = initDate.getMonth() + 1;
                const startYear = initDate.getFullYear();

                displayStart = startDay + "/" + startMonth + "/" + startYear;

                const endResult = new Date(allItems[indexPredecessor].endDate);
                
                let dayOff = 0;
                for (let i=0; i<allItem.duration; i++){
                    if(endResult.getDay() === 6){dayOff++;}
                    if(endResult.getDay() === 0){dayOff++;}
                    redArray.forEach(holyDate =>{
                        if(holyDate == endResult.getTime()) {dayOff++;}
                    });
                    endResult.setDate(endResult.getDate() + 1);
                }
                
                for (let i=0; i<dayOff; i++){
                    if(endResult.getDay() === 6){dayOff++;}
                    if(endResult.getDay() === 0){dayOff++;}
                    redArray.forEach(holyDate =>{
                        if(holyDate == endResult.getTime()) {dayOff++;}
                    });
                    endResult.setDate(endResult.getDate() + 1);
                }
                
                //endResult.setDate(endResult.getDate() - 1);
                if(endResult.getDay() === 0){endResult.setDate(endResult.getDate() + 1);}
                if(endResult.getDay() === 6){endResult.setDate(endResult.getDate() + 2);}
                redArray.forEach(holyDate =>{
                    if(holyDate == endResult.getTime()) {endResult.setDate(endResult.getDate()+1)}
                });

                const endDay = endResult.getDate();
                const endMonth = endResult.getMonth() + 1;
                const endYear = endResult.getFullYear();
            
                displayEnd = endDay + "/" + endMonth + "/" + endYear;

                allItem.endDate = new Date(endResult);
                localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems))
            }else{
                allItem.startDate = undefined;
                allItem.endDate = undefined;
            }
        }

        //passei para depois do if por forma a usar variáveis específicas para mostrar as datas nos formatos pretendidos
        myDiv.innerHTML = `<input type="text" class="task-id" readonly value="${allItem.id}">
        <input type="text" class="task-name" readonly value="${allItem.task}">
        <input type="text" class="predecessor" readonly value="${allItem.predecessor}">
        <input type="text" class="duration" readonly value="${allItem.duration}">
        <input type="text" class="startDate" placeholder="Not a valid Predecessor" readonly value="${displayStart}">
        <input type="text" class="endDate" placeholder="Not a valid Predecessor" readonly value="${displayEnd}">`;

        // os botões estando dentro do forEach já não desaparacem depois de serem clicados.
        //os botões tiveram de ser mudados para depois dos ifs para aparecerem.
        editBtn.addEventListener('click', (e)=>{
            const task = myDiv.querySelector('.task-name');
            const pred = myDiv.querySelector('.predecessor');
            const dur = myDiv.querySelector('.duration');
            editBtn.innerHTML='Save'
            editBtn.setAttribute('class', 'save-items')
            task.setAttribute('data-bckgrd', 'bckgrd-change');
            pred.setAttribute('data-bckgrd', 'bckgrd-change');
            dur.setAttribute('data-bckgrd', 'bckgrd-change');
            task.removeAttribute('readonly');
            pred.removeAttribute('readonly');
            dur.removeAttribute('readonly');

            const saveItems = myDiv.querySelector('.save-items');
            
            saveItems.addEventListener('click', (e)=>{
                allItem.task = task.value;
                allItem.predecessor = parseInt(pred.value);
                allItem.duration = parseInt(dur.value);
                localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                task.setAttribute('readonly', true);
                pred.setAttribute('readonly', true);
                dur.setAttribute('readonly', true);
                Display();
                finishProj();
            })
            task.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					task.setAttribute('readonly', true);
                    editBtn.removeAttribute('data-save');
                    editBtn.innerHTML='Edit'
					allItem.task = e.target.value;
					localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                    Display();
				}
				else {
					task.addEventListener('blur', (e) => {
						task.setAttribute('readonly', true);
                        editBtn.removeAttribute('data-save');
                        editBtn.innerHTML='Edit'
						allItem.task = e.target.value;
						localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                        Display();
					})
				}
                task.removeAttribute('data-bckgrd')
			});
            pred.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					pred.setAttribute('readonly', true);
                    editBtn.removeAttribute('data-save');
                    editBtn.innerHTML='Edit'
					allItem.predecessor = parseInt(e.target.value);
					localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                    Display();
                    finishProj();
                    PercentageCalc();
                    PercentOfDuration();
				}
				else {
					pred.addEventListener('blur', (e) => {
						pred.setAttribute('readonly', true);
                        editBtn.removeAttribute('data-save');
                        editBtn.innerHTML='Edit'
						allItem.predecessor = parseInt(e.target.value);
						localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                        Display();
                        finishProj();
                        PercentageCalc();
                        PercentOfDuration();
					})
				}
                pred.removeAttribute('data-bckgrd')
			});
            dur.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					dur.setAttribute('readonly', true);
                    editBtn.removeAttribute('data-save');
                    editBtn.innerHTML='Edit'
					allItem.duration = parseInt(e.target.value);
					localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                    Display();
                    finishProj();
                    PercentageCalc();
                    PercentOfDuration();
				}
				else {
					dur.addEventListener('blur', (e) => {
						dur.setAttribute('readonly', true);
                        editBtn.removeAttribute('data-save');
                        editBtn.innerHTML='Edit'
						allItem.duration = parseInt(e.target.value);
						localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                        Display();
                        finishProj();
                        PercentageCalc();
                        PercentOfDuration();
					})
				}
                dur.removeAttribute('data-bckgrd');
			});
        });
        delBtn.addEventListener('click', ()=>{
            allItems = allItems.filter(t => t != allItem);
			localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
            Display();
            finishProj()
            PercentageCalc();
            PercentOfDuration();
        });
        //os appends e innerHTML tiveram de vir para depois do myDiv.innerHTML para aparecerem os dados
        listItems.appendChild(itemControl);
        itemControl.appendChild(myDiv);
        myDiv.appendChild(chkBox);
        myDiv.appendChild(labelChk);
        myDiv.appendChild(editBtn);
        myDiv.appendChild(delBtn);

        editBtn.innerHTML = "Edit";
        delBtn.innerHTML = "Delete";

        const taskSel = myDiv.querySelector('.task-id');
        const taskNameSel = myDiv.querySelector('.task-name');
        const predSel = myDiv.querySelector('.predecessor');
        const durSel = myDiv.querySelector('.duration');
        const sdSel = myDiv.querySelector('.startDate');
        const edSel = myDiv.querySelector('.endDate');

        if(allItem.checked){
            chkBox.checked = true;
            taskSel.setAttribute('data-checked', 'checked');
            taskNameSel.setAttribute('data-checked', 'checked');
            predSel.setAttribute('data-checked', 'checked');
            durSel.setAttribute('data-checked', 'checked');
            sdSel.setAttribute('data-checked', 'checked');
            edSel.setAttribute('data-checked', 'checked');
            PercentageCalc();
        }

        myDiv.addEventListener('change', (e)=>{
            e.preventDefault();

            if(chkBox.checked){
                taskSel.setAttribute('data-checked', 'checked');
                taskNameSel.setAttribute('data-checked', 'checked');
                predSel.setAttribute('data-checked', 'checked');
                durSel.setAttribute('data-checked', 'checked');
                sdSel.setAttribute('data-checked', 'checked');
                edSel.setAttribute('data-checked', 'checked');
                allItem.checked = true;
                localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                PercentageCalc();
                PercentOfDuration();
            }else{
                taskSel.removeAttribute('data-checked');
                taskNameSel.removeAttribute('data-checked');
                predSel.removeAttribute('data-checked');
                durSel.removeAttribute('data-checked');
                sdSel.removeAttribute('data-checked');
                edSel.removeAttribute('data-checked');
                allItem.checked = false;
                localStorage.setItem(`items_${projClicked}`, JSON.stringify(allItems));
                PercentageCalc();
                PercentOfDuration();
            }
        });
    });
}

const finishDate = document.querySelector('.finish-date');
const finishProj = ()=>{
    if(allItems.length > 0){
        /* const redEndDates = allItems.map(d => d.endDate);
        const arrEndDates = [];
        redEndDates.forEach(redEndDate=>{
            const dateParsed = parseInt(Date.parse(redEndDate));
            //console.log(dateParsed)
            arrEndDates.push(dateParsed);
        })
        const result = Math.max(parseInt(arrEndDates));
        console.log(new Date(result), arrEndDates); */
    allItems.sort((a,b) => (a.endDate < b.endDate) ? 1 : -1);
    const finishDay = allItems[0].endDate.getDate();
    const finishMonth = allItems[0].endDate.getMonth() + 1;
    const finishYear = allItems[0].endDate.getFullYear();
    finishDate.value = finishDay + "/" + finishMonth + "/" + finishYear
    allItems.sort((a,b) => (a.startDate > b.startDate) ? 1 : -1);
    } //reverter para ordem start to finish
    //em vez de usar sort posso fazer const endDates = allItems.map(d=>d.endDate);
    //e depois fazer endDates.Math.max()??
    else{finishDate.value = projStart.value}
}

Display();

holidays.sort((a,b) => (b.hDate < a.hDate) ? 1 : -1);
HolidayDisplay();

finishProj();

function PercentageCalc() {
    const perc = document.querySelector('.complete-perc');
    let count = 0;
    if(allItems.length>0){
        allItems.forEach(allItem => {
            if(allItem.checked){
                count++
            };
        });
    
        perc.value = `${Math.floor((count/allItems.length) * 100)}%`;
    }else{
        perc.value = 0+"%";
    }
}

PercentageCalc();

const percDur = document.querySelector('.percDur');

function PercentOfDuration() {
    if(allItems.length != 0){
    
    const redChecked = allItems.map(c => c.checked)
    const redDur = allItems.map(t => t.duration);
    const indexItemsChecked = redChecked.reduce((out, bool, index) => 
    bool ? out.concat(index) : out, []);

    const totalDuration = redDur.reduce((result, eachDur)=>{
        return eachDur + result;
    });
    
    let sumDuration = 0;
    
    for(let itemChecked of indexItemsChecked){
        sumDuration += redDur[itemChecked];
    };
    
    const percDuration = (sumDuration / totalDuration)*100;

    percDur.value = `${Math.floor(percDuration)}%`;
    }else{percDur.value = 0+"%";}
}


PercentOfDuration();

orderID.addEventListener('click', ()=>{
    allItems.sort((a,b) => (a.id > b.id) ? 1 : -1);
    Display();
})

orderSD.addEventListener('click', ()=>{
    allItems.sort((a,b) => (a.startDate > b.startDate) ? 1 : -1);
    Display();
});

orderDuration.addEventListener('click', ()=>{
    allItems.sort((a,b) => (a.duration > b.duration) ? 1 : -1);
    Display();
});

orderED.addEventListener('click', ()=>{
    allItems.sort((a,b) => (a.endDate < b.endDate) ? 1 : -1);
    Display();
})