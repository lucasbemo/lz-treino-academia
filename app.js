const tabs = document.querySelectorAll('[data-tab-target]');
const activeClass = 'bg-indigo-200';

tabs[0].classList.add(activeClass);
document.querySelector('#tab1').classList.remove('hidden');

tabs.forEach(tab => {
    tab.addEventListener('click', ()=>{
        const targetContent = document.querySelector(tab.dataset.tabTarget);

        //add hidden class to add the tab-content div.
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));

        //remove the hidden class from the clicked tab-content.
        targetContent.classList.remove('hidden');

        //remove the active class ie bg-indigo-200 from all the tab button.
        document.querySelectorAll('.bg-indigo-200').forEach(activeTab => activeTab.classList.remove(activeClass));

        //add the active class to the click button
        tab.classList.add(activeClass);
    })
})