const sendBtn = document.querySelector("button#send");

console.log("sendBtn => ", sendBtn);

sendBtn.addEventListener("click", function () {
  fetch("/dictum")
    .then((response) => response.ok)
    .then((data) => {
      console.log(data);
      // alert(data)
    });
});
