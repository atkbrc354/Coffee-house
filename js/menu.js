import json from "./file.json" assert { type: "json" };
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenuHome = document.querySelector(".burger__menu");
  const headerNavHome = document.querySelector(".header__nav");
  const headerLink = document.querySelectorAll(".header__item");
  const body = document.querySelector("body");
  burgerMenuHome.addEventListener("click", () => {
    headerNavHome.classList.toggle("open");
    burgerMenuHome.classList.toggle("burger__active");
    body.classList.toggle("hidden");
  });

  headerLink.forEach((item) => {
    item.addEventListener("click", () => {
      headerNavHome.classList.remove("open");
      body.classList.remove("hidden");
      burgerMenuHome.classList.remove("burger__active");
    });
  });

  const menuBtn = document.querySelectorAll(".menu__btn");
  const cardsContainer = document.querySelectorAll(".menu__cards-container");
  menuBtn.forEach((item, i) => {
    item.addEventListener("click", () => {
      hideContent();
      showContent(i);
      menuBtn.forEach((otherBtn) => {
        otherBtn.classList.add("menu__btn-hover");
        otherBtn.classList.remove("menu__active");
      });
      item.classList.remove("menu__btn-hover");
      item.classList.add("menu__active");
    });
  });

  function hideContent() {
    cardsContainer.forEach((container) => {
      container.classList.remove("show");
      container.classList.add("hide");
    });
  }

  function showContent(index) {
    if (cardsContainer[index].classList.contains("hide")) {
      cardsContainer[index].classList.remove("hide");
      cardsContainer[index].classList.add("show", "fade");
    }
  }

  hideContent();
  showContent(0);

  const buttonMobile = document.querySelectorAll(".button-mobile");
  const menuCardsMobule = document.querySelectorAll(".menu__cards-2");
  buttonMobile.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (menuCardsMobule[index]) {
        menuCardsMobule[index].style.display = "grid";
      }
      item.style.display = "none";
    });
  });

  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal__close-btn");
  const menuCards = document.querySelectorAll(".menu__card");
  const modalTitle = document.querySelector(".modal__title");
  const modalTopDesc = document.querySelector(".modal__top-desc");
  const modalTotalPrice = document.querySelector(".modal__total-price");
  const btnSizeDesc = document.querySelectorAll(".btn-size-2");
  const btnAdditivesDesc = document.querySelectorAll(".btn-additives-2");
  const sizesBtn = document.querySelectorAll(".sizes__btn");
  const additivesBtn = document.querySelectorAll(".additives__btn");
  const modalBlock = document.querySelector(".modal__block");

  function updateCards(item) {
    modalTitle.textContent = item.name;
    modalTopDesc.textContent = item.description;
    modalTotalPrice.textContent = `$${item.price}`;
    btnSizeDesc.forEach((ell, i) => {
      if (i === 0) {
        ell.textContent = item.sizes.s.size;
      } else if (i === 1) {
        ell.textContent = item.sizes.m.size;
      } else if (i === 2) {
        ell.textContent = item.sizes.l.size;
      }
    });
    btnAdditivesDesc.forEach((ell, i) => {
      if (i === 0) {
        ell.textContent = item.additives[0].name;
      } else if (i === 1) {
        ell.textContent = item.additives[1].name;
      } else if (i === 2) {
        ell.textContent = item.additives[2].name;
      }
    });
    modal.classList.add("modal__open");
    modalBlock.classList.add("modal__box");
    body.classList.add("hidden");
  }

  let totalPrice = 0;
  function updatePriceSizes(item) {
    
    sizesBtn.forEach((btnActive, i) => {
      btnActive.addEventListener("click", () => {
        if(i === 0) {totalPrice = +item.price};
        if(i === 1) {totalPrice = +item.price + 0.50};
        if(i === 2) {totalPrice = +item.price + 1};
        sizesBtn.forEach((removeActive) => {
          removeActive.classList.remove("active__btn-modal");
        });
        btnActive.classList.add("active__btn-modal");
        modalTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      });
    });
  }


    additivesBtn.forEach((ell, ind) => {
      ell.addEventListener("click", () => {
        ell.classList.toggle("active__btn-modal--additives");
        let currentPrice = Number(modalTotalPrice.textContent.slice(1));
        if (
          additivesBtn[ind].classList.contains("active__btn-modal--additives")
        )
          totalPrice = currentPrice + 0.50;
        if (
          !additivesBtn[ind].classList.contains("active__btn-modal--additives")
        )
          totalPrice = currentPrice - 0.50;
        modalTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;       
      });
    });

  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardImage = card.querySelector(".menu__imoge");
      if (cardImage) {
        const modalImage = modal.querySelector(".coffee-modal-img");
        modalImage.src = cardImage.src;
        modalImage.alt = cardImage.alt;
      }
      const itemId = card.getAttribute("data-id");
      updateCards(json[itemId]);
      updatePriceSizes(json[itemId]);
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("modal__open");
    body.classList.remove("hidden");
  });
  modal.addEventListener("click", (event) => {
    if (modal.classList.contains("modal__open")) {
      if (!event.target.closest(".modal__block")) {
        modal.classList.remove("modal__open");
        body.classList.remove("hidden");
      }
    }
  });
});
