const Images = require("./images");

const preDATA = {
  images: [
    {
      name: "alex-MvTV1f7UdIE-unsplash",
      discription: "discription",
      url: "./images/alex-MvTV1f7UdIE-unsplash.jpg",
      rate: 5,
      id: 1,
    },
    {
      name: "andrea-hagenhoff-dIXCt2zUzV0-unsplash",
      discription: "discription",
      url: "./images/andrea-hagenhoff-dIXCt2zUzV0-unsplash.jpg",
      rate: 5,
      id: 2,
    },
    {
      name: "bady-qb-jTc72C1gfIE-unsplash",
      discription: "discription",
      url: "./images/bady-qb-jTc72C1gfIE-unsplash.jpg",
      rate: 5,
      id: 3,
    },
    {
      name: "ben-allan-yVeb8aZswBE-unsplash",
      discription: "discription",
      url: "./images/ben-allan-yVeb8aZswBE-unsplash.jpg",
      rate: 5,
      id: 4,
    },
    {
      name: "dedo-reppy-t6ltRL6YdwQ-unsplash",
      discription: "discription",
      url: "./images/dedo-reppy-t6ltRL6YdwQ-unsplash.jpg",
      rate: 5,
      id: 5,
    },
    {
      name: "ehimetalor-akhere-unuabona-_HkMexWSbs8-unsplash",
      discription: "discription",
      url: "./images/ehimetalor-akhere-unuabona-_HkMexWSbs8-unsplash.jpg",
      rate: 5,
      id: 6,
    },
    {
      name: "eugene-ptashnik-TGhaRbUwbxI-unsplash",
      discription: "discription",
      url: "./images/eugene-ptashnik-TGhaRbUwbxI-unsplash.jpg",
      rate: 5,
      id: 7,
    },
    {
      name: "federico-gutierrez-IcSzeuoI7M0-unsplash",
      discription: "discription",
      url: "./images/federico-gutierrez-IcSzeuoI7M0-unsplash.jpg",
      rate: 5,
      id: 8,
    },
    {
      name: "frankie-cordoba-Wfj5FjCAk2w-unsplash",
      discription: "discription",
      url: "./images/frankie-cordoba-Wfj5FjCAk2w-unsplash.jpg",
      rate: 5,
      id: 9,
    },
    {
      name: "jakob-soby-e3c7mRl9G2E-unsplash",
      discription: "discription",
      url: "./images/jakob-soby-e3c7mRl9G2E-unsplash.jpg",
      rate: 5,
      id: 10,
    },
    {
      name: "james-eades-ZVDyT7K39G0-unsplash",
      discription: "discription",
      url: "./images/james-eades-ZVDyT7K39G0-unsplash.jpg",
      rate: 5,
      id: 11,
    },
    {
      name: "jeffery-erhunse-QkyoflrbF1k-unsplash",
      discription: "discription",
      url: "./images/jeffery-erhunse-QkyoflrbF1k-unsplash.jpg",
      rate: 5,
      id: 12,
    },
    {
      name: "joshua-hanson-zCRzigSZsRs-unsplash",
      discription: "discription",
      url: "./images/joshua-hanson-zCRzigSZsRs-unsplash.jpg",
      rate: 5,
      id: 13,
    },
    {
      name: "kevin-schmid-TU21HjN9dwo-unsplash",
      discription: "discription",
      url: "./images/kevin-schmid-TU21HjN9dwo-unsplash.jpg",
      rate: 5,
      id: 14,
    },
    {
      name: "luiza-braun-zyLo210ujFA-unsplash",
      discription: "discription",
      url: "./images/luiza-braun-zyLo210ujFA-unsplash.jpg",
      rate: 5,
      id: 15,
    },
    {
      name: "mak-o4WqOr0Qzc8-unsplash",
      discription: "discription",
      url: "./images/mak-o4WqOr0Qzc8-unsplash.jpg",
      rate: 5,
      id: 16,
    },
    {
      name: "rahul-gupta-WEG8Q9OwHiw-unsplash",
      discription: "discription",
      url: "./images/rahul-gupta-WEG8Q9OwHiw-unsplash.jpg",
      rate: 5,
      id: 17,
    },
    {
      name: "surface-C389V--ZZrQ-unsplash",
      discription: "discription",
      url: "./images/surface-C389V--ZZrQ-unsplash.jpg",
      rate: 5,
      id: 18,
    },
    {
      name: "tolga-ahmetler-ifrtTw459Dw-unsplash",
      discription: "discription",
      url: "./images/tolga-ahmetler-ifrtTw459Dw-unsplash.jpg",
      rate: 5,
      id: 19,
    },
    {
      name: "tommy-chen-ellcJbYzsBM-unsplash",
      discription: "discription",
      url: "./images/tommy-chen-ellcJbYzsBM-unsplash.jpg",
      rate: 5,
      id: 20,
    },
    {
      name: "tommy-chen-ZLqyZyCXQIs-unsplash",
      discription: "discription",
      url: "./images/tommy-chen-ZLqyZyCXQIs-unsplash.jpg",
      rate: 5,
      id: 21,
    },
  ],
};

let ImagesData = [];
preDATA.images.map((item) => {
  const { name, discription, url, id } = item;
  const newObj = new Images(name, discription, url, id);
  ImagesData.push(newObj);
});

class ImagesRepository {
  constructor() {
    this.imagesData = [...ImagesData];
  }
  show() {
    let data = JSON.stringify(this.imagesData);

    return data;
  }
  like(id) {
    const image = this.imagesData.find((y) => y.id === id);
    image.rate++;
    image.beenLiked = true;
  }
  disLike(id) {
    const image = this.imagesData.find((y) => y.id === id);
    image.rate--;
    image.beenLiked = false;
  }
}

module.exports = new ImagesRepository();
