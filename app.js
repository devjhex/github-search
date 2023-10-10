
const base_url = 'https://api.github.com/users/';
const input = document.getElementById("input");
const search = document.getElementById("search");
const card = document.getElementById("card");


search.addEventListener('click',function(){
    let name = input.value;
    if (name) {
        let noSpace = name.split(' ').join(''); 
        let request = new Request(`${base_url}${noSpace}`,{
            headers:{
                'Accept':'application/vnd.github+json',
                'X-Github-Api-Version':'2022-11-28'
            },
            method:"GET"
        })
        fetch(request)
    .then(response=>{
        if(!response.ok) throw new Error('Invalid');
        return response.json();
    })
    .then(dataObj=>{
        let output = `<div class="w-[150px] h-[150px] bg-white rounded-full">
        <img class="rounded-full w-full h-full" src="${dataObj.avatar_url}" alt="">
    </div>
    <div>
        <h1 class="text-xl">${dataObj.login}</h1>
        <p>${dataObj.bio}</p>

        <ul class="flex items-center justify-between mt-4">
            <li>${dataObj.followers} Followers</li>
            <li>${dataObj.following} Following</li>
            <li>${dataObj.public_repos} repos</li>
        </ul>
    </div>`;
    card.innerHTML = output;
    })
    .catch(err=>{
        console.warn(err.message);
    })
    }else{
        alert("Input something in the search bar for it to work");
    }
})