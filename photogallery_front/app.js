const imagesGallery = document.querySelector(".images-gallery");
const rateSortBtn = document.querySelector("#sortByRate");
const titleSortBtn = document.querySelector("#sortByTitle");
const popUp = document.querySelector(".popup");
const popupContent = document.querySelector(".popup__content");
const searchBack = document.querySelector("#search_back");
const searchIcon = document.querySelector("#search_icon");
const searchBox = document.querySelector(".search");
const searchContent = document.querySelector(".search");

let isLiked = false;
let sortBytitle = true;
let fetchedData = [];
backUpData = [];
window.onclick = function (event) {
  if (event.target == popUp) {
    popUp.style.visibility = "hidden";
    popUp.style.opacity = 0;

    popupContent.style.opacity = 0;
  }
};

class Images {
  async getImages() {
    try {
      const fetchedImages = await fetch("http://localhost:3000/api")
        .then(res => res.json());
      fetchedData = [...fetchedImages];

      return fetchedImages;
    } catch (err) {
      console.log(err);
      alert("we have a problem in loading");
    }
  }
}

class UI {
  printImages(data) {
    let div = document.createElement("div");
    div.classList.add("grid");
    let result = ``;
    backUpData = [...data];

    if (sortBytitle) {
      titleSortBtn.style.color = "#2196F3";
      rateSortBtn.style.color = "#212121";
    } else {
      titleSortBtn.style.color = "#212121";
      rateSortBtn.style.color = "#2196F3";
    }
    backUpData.map((item) => {
      result += `<div class="grid-item image__list-item"  data-id=${item.id} >
      <img src=${item.url}  />
      <div class="image__list__summary">
      <h3 class='image__list__summary-h3'>${item.name.split("-")[0]}</h3>
      <div class='image__list__summary__like-detail' >
      
      <div >
    
      <span class="like-tap" data-id=${item.id}><i class="fa ${
        !isLiked && !item.beenLiked ? `fa-heart-o` : `fa-heart`
        } " data-id=${item.id}  ></i></span>
       <p>${item.rate}</p></div>

      
      <p >${item.description}</p>
      </div>
    </div>
    </div>`;
    });
    div.innerHTML = result;
    imagesGallery.innerHTML = "";
    imagesGallery.appendChild(div);
  }

  printPopup() {
    let imagesItem = [...document.querySelectorAll(".image__list-item")];

    let result = "";
    imagesItem.map((item) => {
      let id = item.dataset.id;
      item.addEventListener("click", (e) => {
        id = parseInt(id);
        let findedImg = backUpData.find((x) => x.id === id);
        let notLikebtn = e.target.classList.contains("fa");

        if (findedImg && !notLikebtn) {
          result = `<div class="popup_left">
<img
  src=${findedImg.url}
  alt="picture"
  class="popup_img"
/>
</div>
<div class="popup_right">

<h2 class='popup_heading'>${findedImg.name.split("-")[0]}</h2>
<span class="like-tap popup_like" data-id=${findedImg.id}>
<i class="fa ${!isLiked && !item.beenLiked ? `fa-heart-o` : `fa-heart`} "
 data-id=${findedImg.id} style="color:#2196F3" ></i>
  <p class='like_Amount'>${findedImg.rate}</p>
          </span>
 
<p class='popup_p'> 
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
  repellendus aliquam delectus, porro pariatur omnis? Nulla doloremque
  sapiente error voluptatibus soluta eveniet totam molestias! Sequi
  consequatur harum alias est distinctio? Veniam, veritatis possimus
  sed voluptates, vel voluptatem ad saepe laudantium facere, facilis
  laboriosam unde quibusdam odio sit aliquam delectus deleniti!
</p>
</div>`;
          popupContent.innerHTML = "";
          popupContent.innerHTML = result;
          popupContent.style.transform = "translate(-50%, -50%) scale(1)";
          popupContent.style.opacity = 1;
          popUp.style.visibility = "visible";
          popUp.style.opacity = 1;
        }
      });
    });
  }
  likeFunctionality() {
    let likeIcon = document.querySelectorAll(".like-tap");

    likeIcon.forEach((item) => {
      item.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        id = parseInt(id);

        const finedID = backUpData.find((x) => x.id === id);

        if (!finedID.beenLiked) {
          isLiked = true;
          finedID.beenLiked = true;
          item.innerHTML = `<i class="fa fa-heart"   data-id=${id} ></i>`;
          finedID.rate++;
          item.nextElementSibling.innerText = finedID.rate;

          this.likedImg(id);
        } else {
          isLiked = false;
          finedID.beenLiked = false;
          finedID.rate--;
          item.nextElementSibling.innerText = finedID.rate;

          item.innerHTML = `<i class="fa fa-heart-o"  data-id=${finedID.id} ></i>`;
          this.dislikeImg(id);
        }
        console.log(finedID);
      });
    });
  }
  sortByTitle() {
    titleSortBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sortBytitle = true;

      backUpData.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });

      this.printImages(backUpData);
      this.likeFunctionality();
    });
  }
  sortByRate() {
    rateSortBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sortBytitle = false;
      backUpData.sort((a, b) => {
        if (a.rate < b.rate) {
          return 1;
        } else if (a.rate > b.rate) {
          return -1;
        } else {
          return 0;
        }
      });

      this.printImages(backUpData);
      this.likeFunctionality();
    });
  }

  async apiCall(route, id) {
    try {
      const url = `http://localhost:3000/${route}/${id}`;
      await fetch(url, { method: "POST" });
    } catch (err) {
      console.log(err);
    }
  }

  async likedImg(id) {
    this.apiCall('like', id);
  }

  async dislikeImg(id) {
    this.apiCall('dislike', id);
  }

  searchFun() {
    this.searchIconFun();
    this.searchBackFun();
    searchContent.addEventListener("keyup", (e) => {
      const { value } = e.target;
      const term = value.toLowerCase();

      const searched = [];
      backUpData.forEach((image) => {
        const [title] = image.name.split("-");

        if (title.toLowerCase().indexOf(term) !== -1) {
          searched.push(image);
        }
      });

      this.printImages(value.length === 0 ? fetchedData : searched)
    });
  }

  searchIconFun() {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      searchBox.classList.remove("search_remove");
      searchBox.style.opacity = 1;
      searchBox.style.width = "100%";
      searchBox.style.display = "block";
      searchBox.style.animationPlayState = "running";
    });
  }
  searchBackFun() {
    searchBack.addEventListener("click", (e) => {
      e.preventDefault();

      searchBox.style = "";
      searchBox.classList.add("search_remove");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const images = new Images();
  const ui = new UI();
  images
    .getImages()
    .then(ui.printImages)
    .then(() => {
      ui.sortByTitle();
      ui.sortByRate();
      ui.printPopup();
      ui.likeFunctionality();
      ui.searchFun();
    });
});
