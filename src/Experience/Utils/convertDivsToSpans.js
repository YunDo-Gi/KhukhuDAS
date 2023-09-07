export default function(element) 
{
    element.style.overflow = "hidden"
    element.innerHTML = element.innerHTML.split("").map((char) => {
        if(char === " ") {
            return `<span>${char}</span>`
        }
        return `<span class="animate">${char}</span>`
    }).join("")

    return element
}