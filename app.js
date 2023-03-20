const $todos = document.querySelectorAll(".todo");
const $blocks = document.querySelectorAll(".drop");
const $add_btns = document.querySelectorAll(".add_btn");
const $overlay = document.getElementById("overlay");
const $modal = document.getElementById("modal");
const $close_btn = document.getElementById("close_btn");
const $submitBtn = document.getElementById("submitBtn");
const $prios = document.querySelectorAll(".prio");

let dragTodo = null;

const date = new Date();

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

$add_btns.forEach((addBtn) => {
    addBtn.addEventListener("click", (w) => {
        $modal.classList.add("active");
        $overlay.classList.add("active");
        document.body.style.overflowX = "hidden";

        localStorage.setItem("addBtn", w.target.dataset.btn)

        $prios.forEach((prio) => {
            prio.addEventListener("click", priorotySelect);
        });

        $submitBtn.addEventListener("click", createTodo);
    });
});

const createTodo = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;

    const image = document.getElementById("image").value;

    const categorys = document.getElementById("categorys").value;

    if (localStorage.getItem("prio")) {
        var priorety = localStorage.getItem("prio");
    }

    let dropTarget = $blocks[localStorage.getItem("addBtn")];

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let category = categorys.split(", ");

    let todoNew = document.createElement("div");
    todoNew.classList.add("todo");
    todoNew.draggable = true;

    let todoImg = document.createElement("div");
    todoImg.style.backgroundImage = `url('${image}')`;
    todoImg.classList.add("todo_img");
    todoNew.appendChild(todoImg);

    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo_right");
    todoNew.appendChild(todoDiv);

    let prioretyNew = document.createElement("p");
    prioretyNew.innerText = priorety;
    prioretyNew.classList.add("priorety");
    if (priorety == "high") {
        prioretyNew.style.backgroundColor = "#F36192";
    } else if (priorety == "medium") {
        prioretyNew.style.backgroundColor = "#3AA3F9";
    } else {
        prioretyNew.style.backgroundColor = "#42C2B6";
    }
    todoDiv.appendChild(prioretyNew);

    let titleNew = document.createElement("p");
    titleNew.innerText = title;
    titleNew.classList.add("title");
    todoDiv.appendChild(titleNew);

    let categorysNew = document.createElement("div");
    categorysNew.classList.add("categorys");
    todoDiv.appendChild(categorysNew);

    category.forEach((c) => {
        let categoryNew = document.createElement("span");
        categoryNew.innerText = c;
        categorysNew.appendChild(categoryNew);
    });

    let todoDate = document.createElement("div");
    todoDate.classList.add("todo_date");
    todoDate.innerText = `${day} ${monthNames[month]}. ${year}`;
    todoNew.appendChild(todoDate);

    todoNew.addEventListener("dragstart", dragStart);
    todoNew.addEventListener("dragend", dragEnd);

    dropTarget.appendChild(todoNew);

    $modal.classList.remove("active");
    $overlay.classList.remove("active");
    document.body.style.overflowX = "scroll";

    title = "";
    image = "";
    categorys = "";
};

const priorotySelect = (e) => {
    localStorage.removeItem("prio");
    localStorage.setItem("prio", e.target.dataset.prio);
    if (e.target.dataset.prio === "high") {
        $prios[1].style.opacity = "1";
        $prios[2].style.opacity = "1";
        e.target.style.opacity = "0.5";
    } else if (e.target.dataset.prio === "medium") {
        $prios[0].style.opacity = "1";
        $prios[2].style.opacity = "1";
        e.target.style.opacity = "0.5";
    } else {
        $prios[0].style.opacity = "1";
        $prios[1].style.opacity = "1";
        e.target.style.opacity = "0.5";
    }
};

$close_btn.addEventListener("click", () => {
    $modal.classList.remove("active");
    $overlay.classList.remove("active");
    document.body.style.overflowX = "scroll";
});

$todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

$blocks.forEach((block) => {
    block.addEventListener("dragover", dragOver);
    block.addEventListener("dragenter", dragEnter);
    block.addEventListener("dragleave", dragLeave);
    block.addEventListener("drop", dragDrop);
});

function dragStart() {
    dragTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}

function dragEnd() {
    dragTodo = null;
    setTimeout(() => {
        this.style.display = "flex";
    }, 0);
}

function dragEnter() {
    this.style.boxShadow =
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px";
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    this.style.boxShadow = "none";
    this.appendChild(dragTodo);
}

function dragLeave() {
    this.style.boxShadow = "none";
}
