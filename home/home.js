document.addEventListener("DOMContentLoaded", function () {
  function init() {
    // inti 1 rem
    const remInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    // function to clone and reset element
    function cloneAndReset(oldElement) {
      const newElement = oldElement.cloneNode(true);
      oldElement.parentNode.replaceChild(newElement, oldElement);
      return newElement;
    }

    const swiperBanner = document.querySelector(".swiper__banner");
    const videoBannerMb = document.getElementById("video__banner__mb");

    // init swiper text run in section about us
    new Swiper(".about__text__swiper", {
      slidesPerView: "auto",
      loop: true,
      speed: 8000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      spaceBetween: 0,
      allowTouchMove: false,
    });

    // init swiper image in section about us
    new Swiper(".about__frame__swiper", {
      slidesPerView: 1,
      grabCursor: true,
      resistanceRatio: 0,
      pagination: {
        el: "#about .swiper-pagination",
      },
      navigation: {
        nextEl: "#about .swiper-button-next",
        prevEl: "#about .swiper-button-prev",
      },
    });

    // handle faq
    function handleFaq(parentNode) {
      const faqItems = document.querySelectorAll(`${parentNode} .faq__item`);

      // Add click event listener to each FAQ question
      faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");
        const answer = item.querySelector(".faq__answer");
        const toggleBtn = item.querySelector(".btn__toggle__faq");
        const verticalLine = toggleBtn.querySelector(".vertical-line");
        const paragraph = answer.querySelector("p");
        const isActiveInit = item.classList.contains("active");
        if (isActiveInit) {
          answer.style.overflowY = "auto";
        }

        question.addEventListener("click", () => {
          // Check if this item is already active
          const isActive = item.classList.contains("active");

          // Close all FAQ items with smooth animation
          faqItems.forEach((faqItem) => {
            const faqAnswer = faqItem.querySelector(".faq__answer");
            const faqParagraph = faqAnswer.querySelector("p");

            if (faqItem.classList.contains("active")) {
              // Animate paragraph first
              faqParagraph.style.transform = "translateY(-10px)";
              faqParagraph.style.opacity = "0";

              // Then after a short delay, collapse the container
              setTimeout(() => {
                faqItem.classList.remove("active");
                faqAnswer.classList.remove("show");
                faqAnswer.style.overflowY = "hidden";
              }, 200);

              // Show all vertical lines in plus icons
              const vLine = faqItem.querySelector(".vertical-line");
              if (vLine) {
                vLine.style.display = "block";
              }
            }
          });

          // If the clicked item wasn't active, open it with smooth animation
          if (!isActive) {
            setTimeout(() => {
              item.classList.add("active");
              answer.classList.add("show");

              // Animate paragraph after container expands
              setTimeout(() => {
                paragraph.style.transform = "translateY(0)";
                paragraph.style.opacity = "1";
                setTimeout(() => {
                  answer.style.overflowY = "auto";
                }, 0);
              }, 200);

              // Hide vertical line to make plus become minus
              if (verticalLine) {
                verticalLine.style.display = "none";
              }
            }, 100);
          }
        });
      });

      // Add hover effect
      faqItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          if (!item.classList.contains("active")) {
            item.style.transform = "translateY(-2px)";
            item.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
          }
        });

        item.addEventListener("mouseleave", () => {
          if (!item.classList.contains("active")) {
            item.style.transform = "translateY(0)";
            item.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)";
          }
        });
      });
    }

    if (document.documentElement.clientWidth >= 640) {
      // delete video banner on PC
      if (videoBannerMb) videoBannerMb.remove();

      const listVideo = document.querySelectorAll(
        ".swiper__banner .swiper-slide video"
      );
      if (listVideo?.[0]) {
        // init first video banner
        listVideo[0].setAttribute("src", listVideo[0].dataset.src);
        listVideo[0].load();
        listVideo[0].play();
      }

      // init swiper banner in section banner
      new Swiper(".swiper__banner", {
        slidesPerView: 1,
        speed: 400,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        grabCursor: true,
        resistanceRatio: 0,
        on: {
          slideChange: function () {
            // Bạn có thể xử lý thêm ở đây
            if (listVideo) {
              listVideo.forEach((video, index) => {
                if (index === this.realIndex) {
                  if (!video.getAttribute("src")) {
                    video.setAttribute("src", video.dataset.src);
                    video.load();
                    video.play();
                  } else if (video.paused) {
                    video.play();
                  }
                } else {
                  video.pause();
                }
              });
            }
          },
        },
      });

      // init swiper in section motorbike
      new Swiper("#motorbike .grid__tour__swiper", {
        spaceBetween: 1.56 * remInPx,
        slidesPerView: 3,
        grabCursor: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: "#motorbike .swiper-button-next",
          prevEl: "#motorbike .swiper-button-prev",
        },
      });

      // init swiper in section jeep
      new Swiper("#jeep .grid__tour__swiper", {
        spaceBetween: 1.56 * remInPx,
        slidesPerView: 3,
        grabCursor: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: "#jeep .swiper-button-next",
          prevEl: "#jeep .swiper-button-prev",
        },
      });

      // add event listener to list faq
      handleFaq(".faq__items__left");
      handleFaq(".faq__items__right");
    } else {
      // delete swiperBanner on mobile
      if (swiperBanner) swiperBanner.remove();

      // setup video banner on mobile
      if (videoBannerMb) {
        videoBannerMb.setAttribute("src", videoBannerMb.dataset.src);
        videoBannerMb.load();
        videoBannerMb.play();
      }

      // delete faq item active second when init
      const faqItemsRightActive = document.querySelector(
        ".faq__items__right .faq__item.active"
      );
      if (faqItemsRightActive) {
        faqItemsRightActive.classList.remove("active");
        const faqAnswer = faqItemsRightActive.querySelector(".faq__answer");
        if (faqAnswer) {
          faqAnswer.classList.remove("show");
          faqAnswer.style.overflowY = "hidden";
        }
      }
      // add event listener to list faq
      handleFaq(".frequently__wrapper__faq");
      // handle search tour on mobile
      function handleSearchBanner(node) {
        const parentNode = document.querySelector(node || ".banner__welcome");
        if (parentNode) {
          const btnBannerSearch = cloneAndReset(
            parentNode.querySelector(".btn__banner__search button")
          );
          if (btnBannerSearch) {
            let isSearchOpen = false;
            function renderHistorySearch() {
              const listHistorySearch = cloneAndReset(
                parentNode.querySelector(
                  ".banner__search .history .list__history"
                )
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
                    function handleRemoveItemHistory() {
                      closeButton.parentElement.remove();
                      const currentHistory = JSON.parse(
                        localStorage.getItem("search") || "[]"
                      );
                      const updatedHistory = currentHistory.filter(
                        (item, i) => i !== index
                      );
                      localStorage.setItem(
                        "search",
                        JSON.stringify(updatedHistory)
                      );
                      renderHistorySearch();
                    }
                    closeButton.addEventListener(
                      "click",
                      handleRemoveItemHistory
                    );
                  });
                }
                const listHistoryContent = parentNode.querySelectorAll(
                  ".banner__search .history .history__item .history__content__item"
                );
                if (listHistoryContent) {
                  listHistoryContent.forEach((content) => {
                    function handleFillValueInput() {
                      const input = cloneAndReset(
                        parentNode.querySelector(
                          ".banner__search .search input"
                        )
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
            renderHistorySearch();
            const heightWrapperResult = parentNode.querySelector(
              ".banner__search .wrapper__tool .wrapper__result"
            );
            if (heightWrapperResult) {
              const heightWrapperResultValue =
                heightWrapperResult.getBoundingClientRect().height;
              heightWrapperResult.setAttribute(
                "height",
                heightWrapperResultValue
              );
              heightWrapperResult.style.height = "0";
            }
            const inputBannerSearch = cloneAndReset(
              parentNode.querySelector(".banner__search .search input")
            );
            if (inputBannerSearch) {
              function handleInputFocus() {
                if (isSearchOpen) return;
                isSearchOpen = true;
                heightWrapperResult.style.height = `${heightWrapperResult.getAttribute(
                  "height"
                )}px`;
                setTimeout(() => {
                  heightWrapperResult.style.height = "fit-content";
                }, 300);
              }
              inputBannerSearch.addEventListener("focus", handleInputFocus);
            }
            function handleSubmit() {
              const input = cloneAndReset(
                parentNode.querySelector(".banner__search .search input")
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
                renderHistorySearch();
              }
            }
            btnBannerSearch.addEventListener("click", handleSubmit);
          }
        }
      }
      handleSearchBanner("#banner");
    }

    // Handle video memories
    const btn__memories = document.getElementById("btn__memories");
    if (btn__memories) {
      // add event listener to button memories
      btn__memories.addEventListener("click", function () {
        const videoMemories = document.querySelector(".memories__video video");
        if (videoMemories) {
          // init video memories
          videoMemories.setAttribute("src", videoMemories.dataset.src);
          videoMemories.setAttribute("controls", "controls");
          videoMemories.load();
          videoMemories.play();
          btn__memories.remove();
        }
      });
    }
  }
  init();
  // re-init when resize
  document.addEventListener("resize", init);
});
