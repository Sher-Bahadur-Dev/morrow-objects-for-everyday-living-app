document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // Header + scroll progress
  const header = $("#header");
  const progress = $("#progress");
  const updateScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
  };
  addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  // Mobile menu
  const menu = $("#mobileMenu");
  const menuBtn = $("#menuBtn");
  const closeMenu = () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  $$("#mobileMenu a").forEach(link => link.addEventListener("click", closeMenu));

  // Product filters
  const filterButtons = $$("#filters button");
  const products = $$(".product");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      products.forEach(product => {
        product.classList.toggle("hidden",
          filter !== "all" && product.dataset.category !== filter);
      });
    });
  });

  // Wishlist
  $$(".wish").forEach(button => {
    button.addEventListener("click", () => {
      const saved = button.classList.toggle("saved");
      button.textContent = saved ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(saved));
    });
  });

  // Cart count
  let cart = 0;
  const cartCount = $("#cartCount");
  $$(".add").forEach(button => {
    button.addEventListener("click", () => {
      cart++;
      cartCount.textContent = cart;
      button.textContent = "Added ✓";
      setTimeout(() => button.textContent = "Add to bag", 1000);
    });
  });

  // Search
  $("#searchBtn").addEventListener("click", () => {
    const term = prompt("Search Morrow furniture:");
    if (!term) return;
    const match = products.find(p =>
      p.textContent.toLowerCase().includes(term.toLowerCase())
    );
    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      match.style.outline = "2px solid #bc5b34";
      setTimeout(() => match.style.outline = "", 1200);
    } else {
      alert("No matching furniture found.");
    }
  });

  // Contact form
  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    $("#formMessage").textContent = "Thank you — we'll be in touch soon.";
    e.target.reset();
  });

  // Lightweight scroll reveal
  const reveal = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveal.forEach(el => observer.observe(el));
  } else {
    reveal.forEach(el => el.classList.add("visible"));
  }
});
