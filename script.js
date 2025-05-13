window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".nav-links") &&
    !event.target.closest(".mobile-menu")
  ) {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    }
  });
});

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");
const lightboxCaption = document.querySelector(".lightbox-caption");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").getAttribute("src");
    const imgAlt = item.querySelector("img").getAttribute("alt");

    lightboxImg.setAttribute("src", imgSrc);
    lightboxCaption.textContent = imgAlt;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.style.display === "flex") {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !email || !phone || !service || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[\d\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    alert(
      `Thank you, ${name}! Your appointment for ${service} on ${date} at ${time} has been received. We'll contact you shortly to confirm.`
    );

    appointmentForm.reset();
  });
}

const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  const formattedDate = `${year}-${month}-${day}`;
  dateInput.setAttribute("min", formattedDate);
}

const year = new Date().getFullYear();
const copyrightYear = document.querySelector(".footer-bottom p");
if (copyrightYear) {
  copyrightYear.innerHTML = `&copy; ${year} Fama Barber Shop and Beauty Salon. All rights reserved.`;
}

const fadeElements = document.querySelectorAll(
  ".service-card, .feature-card, .gallery-item, .testimonial-card, .team-member"
);

const fadeInOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("fade-in");
    observer.unobserve(entry.target);
  });
}, fadeInOptions);

fadeElements.forEach((element) => {
  element.classList.add("fade-element");
  fadeInObserver.observe(element);
});

document.addEventListener("DOMContentLoaded", function () {
  const pricingCards = document.querySelectorAll(".pricing-card");

  pricingCards.forEach((card) => {
    card.addEventListener("click", function () {
      pricingCards.forEach((c) => c.classList.remove("active"));

      this.classList.add("active");
    });
  });
});
