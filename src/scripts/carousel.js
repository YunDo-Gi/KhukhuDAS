const files = document.querySelector("#InputProfile");
const indicator = document.querySelector(".carousel-indicators")
const inner = document.querySelector(".carousel-inner")

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = async() => {
    // 초기화
    indicator.innerHTML = "";
    inner.innerHTML = "";

    const Files = files.files;
    for(let i=0; i<Files.length; i++){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(Files[i]);

        // 요소 생성
        let button = document.createElement("button");
        if(i == 0) button.classList.add("active")
        button.setAttribute("type", "button")
        button.setAttribute("data-bs-target","#carouselCaption")
        button.setAttribute("data-bs-slide-to", i)

        let item = document.createElement("div")
        if(i == 0) item.classList.add("active");
        item.classList.add("carousel-item")

        let img = document.createElement("img")
        img.classList.add("previewImg" + i)
        img.classList.add("d-block")
        img.classList.add("w-100")
        fileReader.onload = await function () {
            img.src = fileReader.result;
        };
        item.appendChild(img);
        
        // 요소 추가
        indicator.append(button)
        inner.appendChild(item)
        console.log(inner)
    }
}
  files.addEventListener("change", handleFiles);
