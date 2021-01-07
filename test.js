var attrObserver = new MutationObserver((mutations) => {
  mutations.forEach((mu) => {
    if (mu.type !== "attributes" && mu.attributeName !== "class") return;
    let main = mu.target;
    console.log(main);
    if (main.className.includes("view-go")) {
      console.log("green");
      // click on it
    } else if (main.className.includes("view-result")) {
      console.log("pass");
      // click on it
    }
  });
});

const ELS_test = document.querySelectorAll(".view-splash");
ELS_test.forEach((el) => attrObserver.observe(el, { attributes: true }));
