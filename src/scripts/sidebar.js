const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const isTokenExpire = (token) => {
    var exp = null;

    if(token != null)
        exp = parseJwt(token).exp

    if(token == null) {
        alert("로그인 되어 있지 않습니다.")
        return true;
    }
    else if(new Date().getTime() < exp){
        alert("세션이 만료 되었습니다.")
        return true;
    }
    
    return false;
}


var token = localStorage.getItem("jwt");

const sidebarChangeContent = (token) => {
    const menu__box = document.querySelector(".menu__box");
    let node = document.createElement('li');
    let child = null;
    
    if(isTokenExpire(token)) {
        child = document.createElement('a');
        child.classList.add("menu__item");
        child.setAttribute("data-bs-toggle", "modal");
        child.setAttribute("data-bs-target", "#exampleModal");
        child.innerText="Login";
        node.appendChild(child);
    } 
    else {
        let avatar = document.createElement('img');
        let userName = document.createElement('div');
        let a = document.createElement('a');
        
        child = document.createElement('div');
        
        child.classList.add("userInfo");
        child.classList.add("d-flex");
        child.classList.add("justify-content-around");
        child.classList.add("w-75");
        a.classList.add("userInfo")
        a.classList.add("menu_item");
        
        avatar.alt = "Avatar";
        userName.innerText ="사용자 명";
        
        child.appendChild(avatar);
        child.appendChild(userName);
        node.appendChild(child);
        node.appendChild(a);
    }
    node.classList.add("underline") // underline 표시용
    menu__box.prepend(node)
}

const hamburger = document.querySelector(".hamburger-menu");

hamburger.addEventListener("click", sidebarChangeContent(token));
