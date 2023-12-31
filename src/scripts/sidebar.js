const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const isTokenExpire = (token) => {
  var exp = null;

  if (token != null) exp = parseJwt(token).exp;

  if (token == null) {
    return true;
  } else if (new Date().getTime() < exp) {
    alert("세션이 만료 되었습니다.");
    return true;
  }

  return false;
};

const getProfileImg = async (url) => {
  try {
    const img = await fetch("http://localhost:8080/api/profileImg/" + url);
    return img;
  } catch (error) {
    alert(error);
    return null;
  }
};

var token = localStorage.getItem("jwt");

const sidebarChangeContent = async (token) => {
  const menu__box = document.querySelector(".menu__box");
  let node = document.createElement("li");

  if (isTokenExpire(token)) {
    let login = document.createElement("a");
    login.classList.add("menu__item");
    login.setAttribute("data-bs-toggle", "modal");
    login.setAttribute("data-bs-target", "#login-modal");
    login.innerText = "Login";
    login.href = "../views/login.html";
    node.appendChild(login);
    menu__box.prepend(node);

    const logout = document.querySelector(".logout");
    logout.style.display = "none";

    const create = document.querySelector(".create");
    create.style.display = "none";
  } else {
    let avatar = document.createElement("img");
    let userName = document.createElement("a");
    let a = document.createElement("a");
    let child = document.createElement("div");

    child.classList.add("userInfo");
    child.classList.add("d-flex");
    child.classList.add("justify-content-around");
    child.classList.add("align-items-center");
    child.classList.add("mb-4");
    child.classList.add("w-75");
    a.classList.add("userInfo");
    a.classList.add("menu_item");

    // 아바타를 public 폴더에서 바로 가져오게 수정
    avatar.src = "../../public/default-avatar.jpg";
    avatar.style.paddingLeft = "12px";
    if (
      localStorage.getItem("profileImgUrl") != "../../public/default-avatar.jpg"
    ) {
      avatar.src =
        "http://localhost:8080/api/profileImg/" +
        localStorage.getItem("profileImgUrl");
      console.log(localStorage.getItem("profileImgUrl"));
    }
    avatar.alt = "Avatar";
    avatar.classList.add("w-25");
    userName.innerText = localStorage.getItem("nickname");
    userName.href = "./user.html";
    userName.style.textDecoration = "none";

    child.appendChild(avatar);
    child.appendChild(userName);
    node.appendChild(child);
    node.appendChild(a);

    menu__box.prepend(node);

    const logout = document.querySelector(".logout");
    logout.style.display = "block";

    const create = document.querySelector(".create");
    create.style.display = "block";
  }
};

export { parseJwt, isTokenExpire };
