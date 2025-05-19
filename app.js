
// Slide ảnh tự động
let slideIndex = 0;
const slides = document.querySelectorAll(".banner-slide");
function showSlides() {
  slides.forEach(slide => slide.style.display = "none");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "block";
}
setInterval(showSlides, 3000);
showSlides();

// Tính phí vận chuyển
function calculateShipping() {
  const weight = document.getElementById("weightInput").value;
  const result = document.getElementById("shippingResult");
  if (!weight || weight <= 0) {
    result.textContent = "Vui lòng nhập khối lượng hợp lệ.";
    return;
  }
  const price = 120000 * weight;
  result.textContent = `Phí vận chuyển ước tính: ${price.toLocaleString()} VND`;
}

// Tích hợp EmailJS gửi mail thật
emailjs.init("foO68e-N9f8bBVU8K");

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("service_zm7jyxd", "template_ncegfyy", this)
    .then(() => {
      document.getElementById("formStatus").textContent = "✅ Yêu cầu đã được gửi. Chúng tôi sẽ phản hồi sớm!";
      this.reset();
    }, (error) => {
      document.getElementById("formStatus").textContent = "❌ Gửi thất bại. Vui lòng thử lại.";
      console.error("EmailJS Error:", error);
    });
});
