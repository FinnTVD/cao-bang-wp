document.addEventListener("DOMContentLoaded", () => {
  function cloneAndReset(oldElement) {
    const newElement = oldElement.cloneNode(true); // true để copy cả con

    oldElement.parentNode.replaceChild(newElement, oldElement);
    return newElement;
  }

  // Code work only mobile
  if (document.documentElement.clientWidth < 640) {
    // handle search tour on mobile
    function renderHistorySearch(parentNode) {
      const listHistorySearch = cloneAndReset(
        parentNode.querySelector(".banner__search .history .list__history")
      );
      if (listHistorySearch) {
        const initDataLocalStorage = JSON.parse(
          localStorage.getItem("search") || "[]"
        );
        listHistorySearch.innerHTML = "";
        Array.isArray(initDataLocalStorage) &&
          initDataLocalStorage.slice(0, 5).forEach((item) => {
            const historyItem = document.createElement("div");
            historyItem.className = "history__item";
            historyItem.innerHTML = `
                      <span class="history__content__item c12-12-r-pc">${item}</span>
                      <button class="history__close">
                        <img src="../assets/img/layout/close-x.svg" alt="">
                      </button>
                `;
            listHistorySearch.appendChild(historyItem);
          });
        const listHistoryClose = parentNode.querySelectorAll(
          ".banner__search .history .history__item .history__close"
        );
        if (listHistoryClose) {
          listHistoryClose.forEach((closeButton, index) => {
            function handleRemoveHistoryItem() {
              closeButton.parentElement.remove();
              const currentHistory = JSON.parse(
                localStorage.getItem("search") || "[]"
              );
              const updatedHistory = currentHistory.filter(
                (item, i) => i !== index
              );

              localStorage.setItem("search", JSON.stringify(updatedHistory));
              renderHistorySearch(parentNode);
            }
            closeButton.addEventListener("click", handleRemoveHistoryItem);
          });
        }
        const listHistoryContent = parentNode.querySelectorAll(
          ".banner__search .history .history__item .history__content__item"
        );
        if (listHistoryContent) {
          listHistoryContent.forEach((content) => {
            function handleFillValueInput() {
              const input = cloneAndReset(
                parentNode.querySelector(".banner__search .search input")
              );
              if (input) {
                input.value = content.textContent;
                input.focus();
              }
            }
            content.addEventListener("click", handleFillValueInput);
          });
        }
      }
    }
    function handleSearchBanner(node) {
      const parentNode = document.querySelector(node || ".banner__welcome");
      if (parentNode) {
        const btnBannerSearch = cloneAndReset(
          parentNode.querySelector(".btn__banner__search button")
        );
        if (btnBannerSearch) {
          renderHistorySearch(parentNode);
          function handleSubmit() {
            const input = parentNode.querySelector(
              ".banner__search .search input"
            );
            if (input) {
              const initDataLocalStorage = JSON.parse(
                localStorage.getItem("search") || "[]"
              );
              const newDataLocalStorage = [
                input.value,
                ...initDataLocalStorage,
              ];
              localStorage.setItem(
                "search",
                JSON.stringify(newDataLocalStorage)
              );
              renderHistorySearch(parentNode);
            }
          }

          btnBannerSearch.addEventListener("click", handleSubmit);
        }
      }
    }
    const btnHeaderMenu = document.querySelector(".header__menu");
    if (btnHeaderMenu) {
      // Add event open mega menu
      btnHeaderMenu.addEventListener("click", () => {
        const popupMenu = document.querySelector("#popup__menu");
        if (popupMenu) {
          // Prevent scroll
          document.body.style.overflow = "hidden";
          // Add active class to popup menu
          popupMenu.classList.add("active");

          // Add close event
          const menu__header__close = document.querySelector(
            "#menu__header__close"
          );
          if (menu__header__close) {
            // Add event close mega menu
            menu__header__close.addEventListener("click", () => {
              popupMenu.classList.remove("active");
              document.body.style.overflow = "auto";
              const bannerHome = document.getElementById("banner");
              if (bannerHome) renderHistorySearch(bannerHome);
            });
          }
        }
      });
    }
    // Add accordion event
    const btn__menu__list = document.querySelectorAll(".btn__menu__list");
    const popup__menu__list = document.querySelectorAll(".popup__menu__list");
    btn__menu__list.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const parentNode = btn.parentNode;
        const menuListCurrent = popup__menu__list?.[index];
        if (menuListCurrent && parentNode) {
          if (parentNode.classList.contains("active")) {
            parentNode.classList.remove("active");
            menuListCurrent.style.height = "0";
          } else {
            // Reset other accordions
            function resetOtherAccordion(accordions, index) {
              accordions.forEach((accordion, i) => {
                if (i !== index) {
                  accordion.style.height = "0";
                  accordion.parentNode.classList.remove("active");
                }
              });
            }
            resetOtherAccordion(popup__menu__list, index);
            parentNode.classList.add("active");
            const heightRem =
              2.5 * popup__menu__list?.[index]?.children?.length;
            menuListCurrent.style.height = `${heightRem}rem`;
          }
        }
      });
    });

    // Add event popup search
    const btn__menu__search = document.querySelector("#menu__header__search");
    if (btn__menu__search) {
      btn__menu__search.addEventListener("click", () => {
        const popupSearch = document.querySelector("#popup__search");
        const popupSearchOverlay = document.querySelector(
          "#popup__search__overlay"
        );
        if (popupSearch && popupSearchOverlay) {
          popupSearchOverlay.classList.add("active");
          popupSearch.classList.add("active");
          handleSearchBanner("#popup__search");
          // reset input and auto focus
          const inputSearchPopup = document.querySelector(
            "#popup__search .banner__search .search input"
          );
          if (inputSearchPopup) {
            inputSearchPopup.value = "";
            inputSearchPopup.focus();
          }
          popupSearchOverlay.addEventListener("click", () => {
            popupSearch.classList.remove("active");
            popupSearchOverlay.classList.remove("active");
          });
        }
      });
    }
  } else {
    const popupMenu = document.querySelector("#popup__menu");
    if (popupMenu) popupMenu.remove();
    const popupSearchOverlay = document.querySelector(
      "#popup__search__overlay"
    );
    if (popupSearchOverlay) popupSearchOverlay.remove();
    const popupSearch = document.querySelector("#popup__search");
    if (popupSearch) popupSearch.remove();
  }

  // Add scroll to top event
  const btnScrollTop = document.querySelector("#fab .fab__cta");
  if (btnScrollTop) {
    btnScrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
