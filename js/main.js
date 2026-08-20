// Menú mobile, animaciones, contadores y filtros del equipo.

const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(isActive));
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("show");
        }
      });
    }, {
      threshold:0.16,
      rootMargin:"0px 0px -60px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function animateCounters(){
      counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const duration = 1400;
        const startTime = performance.now();

        function update(currentTime){
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(eased * target);

          counter.textContent = value;

          if(progress < 1){
            requestAnimationFrame(update);
          }else{
            counter.textContent = target;
          }
        }

        requestAnimationFrame(update);
      });
    }

    const statsSection = document.querySelector(".stats");

    if(statsSection){
      const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting && !countersStarted){
            countersStarted = true;
            animateCounters();
          }
        });
      }, { threshold:.35 });

      statsObserver.observe(statsSection);
    }

    /* Filtros del equipo */
    const filterButtons = document.querySelectorAll(".team-filter");
    const teamCards = document.querySelectorAll(".team-card");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        teamCards.forEach(card => {
          const matches = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("hidden", !matches);
        });
      });
    });
