---
type: config
subtype: design-patterns
title: Component Patterns
---

This document serves as a recipe book for building Wimmer EDV website pages using Astro and Tailwind CSS. It translates our design system's tokens and creative direction into flexible, reusable component patterns. The goal is to empower you, the builder, to create diverse pages that all share a cohesive brand identity—**Confident, Structured, Reassuring, Clean, Professional**.

For each pattern, you'll find:
*   **Tailwind/CSS classes:** Direct implementation of design tokens.
*   **HTML structure sketch:** A simplified representation for quick understanding.
*   **Responsive behavior notes:** How the pattern adapts across devices.
*   **Animation/interaction notes:** Guidance on adhering to our subtle motion language.
*   **2-3 VARIATIONS:** Options to ensure flexibility without sacrificing consistency.

---

## 1. Section Wrapper

The fundamental container for all major page content. It defines the maximum width, consistent padding, and background treatment, acting as the structural DNA for every page.

**Core Styles:**
*   **Max Width:** `max-w-7xl` (1280px)
*   **Horizontal Padding:** `px-4` (mobile) | `md:px-6` (medium screens and up)
*   **Vertical Padding:** `py-24` or `py-32` (generous, as per design system)
*   **Background:** Alternating `surface-50` (Off-White) and `surface-100`/`surface-200` (Light Gray).

**HTML Structure Sketch:**

```html
<section class="[bg-color] [py-value]">
  <div class="container mx-auto [px-value] max-w-7xl">
    <!-- Section Content Here -->
  </div>
</section>
```

**Tailwind Classes:**

*   **Default:**
    ```tailwind
    bg-surface-50 py-24 md:py-32
    <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    ```
*   **Alternative Background:**
    ```tailwind
    bg-surface-100 py-24 md:py-32
    <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    ```

**Responsive Behavior:**
*   `px-4` on small screens prevents content from touching edges.
*   `md:px-6` provides more breathing room on larger viewports.
*   `max-w-7xl` ensures comfortable reading line length on large displays.
*   Vertical padding (`py-24`/`py-32`) remains consistent for spacious sections.

**Animation/Interaction Notes:**
*   The section wrapper itself typically doesn't animate, but its contents will use scroll-reveal animations (see `Utility Patterns`).

**Variations:**

1.  **Standard Section:**
    *   **Classes:** `bg-surface-50 py-24 md:py-32`
    *   **Use Case:** Most common section. Clean, inviting background.

2.  **Accentuated Section:**
    *   **Classes:** `bg-surface-100 py-24 md:py-32`
    *   **Use Case:** To visually break up content flow, highlight a particular block, or create a gentle rhythm.

3.  **Section with Subtle Border Top:**
    *   **Classes:** `bg-surface-50 py-24 md:py-32 border-t border-surface-200`
    *   **Use Case:** For a slightly more formal separation between content blocks, e.g., before a footer or a major new content area.

---

## 2. Hero Variants

The introductory section of a page, designed to immediately capture attention and convey the page's purpose.

**Core Styles:**
*   **Typography:** Large `font-bold` headings (`5xl`, `6xl`), `text-white` or `text-primary-900`.
*   **Colors:** `primary-700` for dark overlays, `accent-500` for primary CTAs.
*   **Padding:** Generous, often implicitly full-height or `py-32`/`py-48`.
*   **Images:** High-quality, authentic photography (see Design System).

**HTML Structure Sketch (General):**

```html
<section class="relative min-h-[50vh] flex items-center justify-center [bg-or-img]">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl text-center z-10">
    <!-- Hero Content (Headline, Subtext, CTA) -->
  </div>
  <!-- Optional Overlay / Scroll Indicator -->
</section>
```

**Responsive Behavior:**
*   All hero variants must stack content vertically on mobile.
*   Image-based heroes should ensure the key visual is visible on smaller screens.
*   Typography scales down (e.g., `text-5xl` on desktop, `text-3xl` on mobile).

**Animation/Interaction Notes:**
*   **Entrance:** Main headline and CTA use `scroll-reveal-fade-up` (see `Utility Patterns`). Stagger animations for multiple elements.
*   **Scroll Indicator:** Gentle `bounce` or `fade-in` loop.

---

### Hero Variation 1: Impact Hero (Full-Viewport, Bold Statement)

**Purpose:** Maximum impact for landing pages and the homepage. Bold, immersive, and premium.

**HTML Structure Sketch:**

```html
<section class="relative h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/path/to/hero-bg.jpg');">
  <div class="absolute inset-0 bg-primary-900 opacity-70"></div> <!-- Dark Overlay -->
  <div class="container mx-auto px-4 md:px-6 max-w-5xl text-center text-white z-10" data-aos="fade-up">
    <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6" data-aos="fade-up" data-aos-delay="100">
      Your IT, Reimagined.<br class="hidden md:block"> Seamless Solutions for Modern Businesses.
    </h1>
    <p class="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
      Wimmer EDV provides expert IT support and strategic solutions, so you can focus on what matters most.
    </p>
    <a href="/contact" class="btn btn-primary" data-aos="fade-up" data-aos-delay="300">
      Get a Free Consultation
    </a>
  </div>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" data-aos="fade-in" data-aos-delay="600">
    <a href="#next-section" aria-label="Scroll down">
      <svg class="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </a>
  </div>
</section>
```

**Tailwind Classes:**
*   **Container:** `relative h-screen flex items-center justify-center bg-cover bg-center`
*   **Overlay:** `absolute inset-0 bg-primary-900 opacity-70`
*   **Content:** `container mx-auto px-4 md:px-6 max-w-5xl text-center text-white z-10`
*   **Headline:** `text-4xl md:text-6xl font-bold leading-tight mb-6`
*   **Subtext:** `text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto`
*   **CTA:** `bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out` (or use a dedicated `btn-primary` component class).
*   **Scroll Indicator:** `absolute bottom-8 left-1/2 -translate-x-1/2 z-10` with `animate-bounce` utility.

**Animation Notes:** Use `AOS` (Animate On Scroll) or similar JS library for `fade-up` and `fade-in` effects with `data-aos-delay` for staggering.

---

### Hero Variation 2: Split Hero (Image + Content)

**Purpose:** To present an image alongside key information, often used for service pages or about us pages.

**HTML Structure Sketch:**

```html
<section class="bg-surface-50 py-24 md:py-32">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <!-- Image Column -->
    <div class="order-2 md:order-1" data-aos="fade-right">
      <img src="/path/to/split-hero-image.jpg" alt="Description" class="rounded-2xl shadow-xl w-full h-auto object-cover max-h-[500px]">
    </div>
    <!-- Content Column -->
    <div class="order-1 md:order-2 text-center md:text-left" data-aos="fade-left">
      <h1 class="text-3xl md:text-5xl font-bold text-primary-700 leading-tight mb-4">
        Custom IT Solutions,<br> Tailored for Your Growth.
      </h1>
      <p class="text-lg text-surface-600 mb-6">
        From proactive maintenance to strategic cloud migrations, we empower your business with reliable technology.
      </p>
      <a href="/services" class="btn btn-primary">Explore Our Services</a>
      <p class="mt-4 text-sm text-surface-500">
        <a href="#" class="text-primary-600 hover:underline">Or schedule a free consultation.</a>
      </p>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Container:** `bg-surface-50 py-24 md:py-32`
*   **Grid:** `grid grid-cols-1 md:grid-cols-2 gap-12 items-center`
*   **Image Column:** `order-2 md:order-1` (to put text first on mobile), `rounded-2xl shadow-xl w-full h-auto object-cover max-h-[500px]`
*   **Content Column:** `order-1 md:order-2 text-center md:text-left`
*   **Headline:** `text-3xl md:text-5xl font-bold text-primary-700 leading-tight mb-4`
*   **Paragraph:** `text-lg text-surface-600 mb-6`
*   **CTA:** `btn-primary` (see Forms for definition)

**Responsive Behavior:**
*   `md:grid-cols-2` creates the split layout on larger screens.
*   `order-1 md:order-2` ensures content is above the image on mobile, improving readability.
*   Image will scale proportionally `w-full h-auto`.

**Animation Notes:** Use `AOS` for `fade-right` and `fade-left` on the columns.

---

### Hero Variation 3: Minimal Hero (Text-Centered)

**Purpose:** For pages where the focus is purely on a concise message, such as contact pages or simple information pages.

**HTML Structure Sketch:**

```html
<section class="bg-gradient-to-br from-primary-700 to-primary-900 py-24 md:py-32 text-white">
  <div class="container mx-auto px-4 md:px-6 max-w-4xl text-center">
    <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4" data-aos="fade-up">
      Contact Us for Expert IT Support
    </h1>
    <p class="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
      Ready to enhance your business's IT infrastructure? Our team is here to help.
    </p>
    <a href="tel:+4312345678" class="btn btn-secondary" data-aos="fade-up" data-aos-delay="200">
      Call Us Today
    </a>
  </div>
</section>
```

**Tailwind Classes:**
*   **Container:** `bg-gradient-to-br from-primary-700 to-primary-900 py-24 md:py-32 text-white`
*   **Content:** `container mx-auto px-4 md:px-6 max-w-4xl text-center`
*   **Headline:** `text-3xl md:text-5xl font-bold leading-tight mb-4`
*   **Paragraph:** `text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto`
*   **CTA:** `bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out` (or use `btn-secondary`).

**Responsive Behavior:**
*   All elements are centered and stack naturally. Typography scales down appropriately.

**Animation Notes:** Simple `fade-up` for headline, paragraph, and CTA.

---

## 3. Content Blocks

The workhorse patterns for structuring body content, designed for versatility and consistent application of tokens and creative direction.

### Content Block 1: Text + Image (Alternating Pattern)

**Purpose:** To explain concepts or services with visual support, promoting readability and visual interest.

**Core Styles:**
*   **Images:** `rounded-xl` for a modern, soft touch. `shadow-md` for subtle depth.
*   **Text:** `primary-700` for headings, `surface-600` for body.
*   **Spacing:** `gap-12` between columns, generous vertical padding for the section wrapper.

**HTML Structure Sketch:**

```html
<!-- Section Wrapper -->
<section class="bg-surface-50 py-24 md:py-32">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    <!-- Block 1: Image Right -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 md:mb-32">
      <div class="order-2 md:order-1" data-aos="fade-right">
        <h2 class="text-3xl font-bold text-primary-700 mb-4">Proactive IT Management</h2>
        <p class="text-lg text-surface-600 mb-6">
          Our managed IT services keep your systems running smoothly, preventing issues before they impact your business. From monitoring to maintenance, we've got you covered.
        </p>
        <ul class="list-disc list-inside text-surface-600 space-y-2">
          <li>24/7 System Monitoring</li>
          <li>Regular Software Updates</li>
          <li>Helpdesk Support</li>
        </ul>
      </div>
      <div class="order-1 md:order-2" data-aos="fade-left">
        <img src="/path/to/image-right.jpg" alt="Proactive IT Management" class="rounded-xl shadow-md w-full h-auto object-cover">
      </div>
    </div>

    <!-- Block 2: Image Left -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1" data-aos="fade-right">
        <img src="/path/to/image-left.jpg" alt="Cloud Solutions" class="rounded-xl shadow-md w-full h-auto object-cover">
      </div>
      <div class="order-1 md:order-2" data-aos="fade-left">
        <h2 class="text-3xl font-bold text-primary-700 mb-4">Secure Cloud Solutions</h2>
        <p class="text-lg text-surface-600 mb-6">
          Leverage the power of the cloud with secure, scalable solutions tailored to your business needs. We ensure seamless migration and robust data protection.
        </p>
        <a href="/cloud-solutions" class="btn btn-link">Learn More about Cloud Services</a>
      </div>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Grid Container:** `grid grid-cols-1 md:grid-cols-2 gap-12 items-center`
*   **Image Ordering:** `order-2 md:order-1` for text first on mobile, `order-1 md:order-2` for image first.
*   **Image:** `rounded-xl shadow-md w-full h-auto object-cover`
*   **Headline:** `text-3xl font-bold text-primary-700 mb-4`
*   **Paragraph:** `text-lg text-surface-600 mb-6`
*   **List:** `list-disc list-inside text-surface-600 space-y-2`
*   **Link Button:** `text-accent-500 hover:text-accent-600 font-medium inline-flex items-center group` (with arrow icon).

**Responsive Behavior:**
*   On mobile (`md` breakpoint), columns stack vertically. `order-*` classes control which content appears first.
*   Images scale `w-full h-auto`.

**Animation/Interaction Notes:**
*   Use `AOS` (e.g., `fade-right`, `fade-left`) for sections to slide in subtly as they enter the viewport.

**Variations:**
1.  **Standard Alternating:** As shown, alternating image left/right with text.
2.  **Image with Overlay Text:** Image takes up full column, with text overlaid for a more editorial feel (requires `relative` parent on image column, `absolute` for text content).
3.  **Centered Text with Image Below:** For simpler sections, content is centered, and image sits below, often `max-w-md` for visual lightness.

---

### Content Block 2: Feature Grid (Icon + Heading + Text)

**Purpose:** To highlight key features, services, or benefits in a visually digestible format.

**Core Styles:**
*   **Icons:** Simple SVG/line-art, `text-accent-500` or `primary-500`, sized `w-12 h-12`.
*   **Cards:** `bg-surface-50` or `bg-white`, `rounded-xl`, `shadow-md`, `p-8`.
*   **Headings:** `text-xl font-semibold text-primary-700`.
*   **Text:** `text-base text-surface-600`.

**HTML Structure Sketch:**

```html
<section class="bg-surface-100 py-24 md:py-32">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-primary-700 mb-4">How We Empower Your Business</h2>
      <p class="text-xl text-surface-600 max-w-3xl mx-auto">
        Our comprehensive IT services are designed to streamline operations, enhance security, and drive growth.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature Card 1 -->
      <div class="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
        <div class="p-4 rounded-full bg-accent-50 text-accent-500 mb-6">
          <!-- Icon SVG -->
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-1-3m-6.963-2.933A9 9 0 1012 2a9 9 0 00-5.213 14.067z"></path></svg>
        </div>
        <h3 class="text-xl font-semibold text-primary-700 mb-3">Managed IT Services</h3>
        <p class="text-base text-surface-600">
          Proactive monitoring and maintenance to keep your systems optimal and secure, 24/7.
        </p>
      </div>
      <!-- Feature Card 2 -->
      <div class="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
        <!-- ... similar structure ... -->
      </div>
      <!-- Feature Card 3 -->
      <div class="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
        <!-- ... similar structure ... -->
      </div>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
*   **Feature Card:** `bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center`
*   **Icon Wrapper:** `p-4 rounded-full bg-accent-50 text-accent-500 mb-6`
*   **Icon SVG:** `w-10 h-10`
*   **Heading:** `text-xl font-semibold text-primary-700 mb-3`
*   **Text:** `text-base text-surface-600`

**Responsive Behavior:**
*   `grid-cols-1` on mobile, `md:grid-cols-2` on medium, `lg:grid-cols-3` on large screens.
*   Cards maintain internal padding and centering.

**Animation/Interaction Notes:**
*   Staggered `fade-up` (`data-aos-delay`) for each card as it enters the viewport.
*   **Hover Effect (Optional):** `transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1` on the card.

**Variations:**
1.  **Icon Top, Centered Text:** As shown, the most common layout.
2.  **Icon Left, Text Right:** For a more list-like appearance within a grid item. (`flex items-start`).
3.  **No Icon, Just Headline + Text:** Simpler, purely typographic approach for less visual-heavy features.

---

### Content Block 3: Stats/Numbers Bar

**Purpose:** To quickly convey impressive figures or achievements, building trust and credibility.

**Core Styles:**
*   **Numbers:** Large, `font-bold`, `text-primary-700` or `accent-500`.
*   **Labels:** `font-medium`, `text-surface-600`.
*   **Layout:** Responsive grid for multiple stats.
*   **Animation:** JavaScript-driven count-up on scroll.

**HTML Structure Sketch:**

```html
<section class="bg-surface-50 py-16 md:py-20">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <!-- Stat 1 -->
      <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
        <span class="text-4xl md:text-5xl font-bold text-accent-500 mb-2 count-up" data-target="15">0</span>
        <p class="text-lg font-medium text-surface-600">Years in Business</p>
      </div>
      <!-- Stat 2 -->
      <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
        <span class="text-4xl md:text-5xl font-bold text-primary-700 mb-2 count-up" data-target="500">0</span>
        <p class="text-lg font-medium text-surface-600">Happy Clients</p>
      </div>
      <!-- Stat 3 -->
      <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
        <span class="text-4xl md:text-5xl font-bold text-accent-500 mb-2 count-up" data-target="99.9">0%</span>
        <p class="text-lg font-medium text-surface-600">Uptime Guaranteed</p>
      </div>
      <!-- Stat 4 -->
      <div class="flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
        <span class="text-4xl md:text-5xl font-bold text-primary-700 mb-2 count-up" data-target="12">0</span>
        <p class="text-lg font-medium text-surface-600">Expert Technicians</p>
      </div>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Grid:** `grid grid-cols-2 md:grid-cols-4 gap-8 text-center`
*   **Stat Item:** `flex flex-col items-center`
*   **Number:** `text-4xl md:text-5xl font-bold text-accent-500 mb-2` (alternate `text-primary-700`)
*   **Label:** `text-lg font-medium text-surface-600`

**Responsive Behavior:**
*   `grid-cols-2` on mobile, expanding to `md:grid-cols-4` on larger screens.
*   Vertical spacing between rows ensures readability on mobile.

**Animation/Interaction Notes:**
*   **Count-Up Animation:** Requires a small JavaScript module using `IntersectionObserver` to trigger the animation when the element is in view.
    *   Example JS (conceptual):
        ```javascript
        function animateCountUp(element) {
          const target = parseFloat(element.dataset.target);
          const duration = 2000; // milliseconds
          let start = 0;
          let startTime = null;

          const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            let value = Math.floor(progress * target);

            // Handle decimal values for uptime
            if (target.toString().includes('.')) {
                value = (progress * target).toFixed(1); // Keep one decimal place
            }

            element.textContent = value + (element.textContent.includes('%') ? '%' : '');
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }

        const countUpElements = document.querySelectorAll('.count-up');
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCountUp(entry.target);
              observer.unobserve(entry.target); // Stop observing after animation
            }
          });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        countUpElements.forEach(el => observer.observe(el));
        ```
*   Each stat also uses `AOS fade-up` with `data-aos-delay` for a staggered entrance.

**Variations:**
1.  **Default (Horizontal Grid):** As shown above.
2.  **Vertical List:** For very few stats, or in a sidebar context, presented as a vertical list.
3.  **Card-Based Stats:** Each stat is wrapped in a `Card` component for more emphasis or a different visual texture.

---

### Content Block 4: Testimonial

**Purpose:** To build social proof and trust by showcasing positive client experiences.

**Core Styles:**
*   **Quote:** `text-2xl italic font-light leading-relaxed text-surface-800`.
*   **Attribution:** `font-medium text-primary-700`.
*   **Container:** `bg-surface-100`, `rounded-2xl`, `p-8` or `p-12`, `shadow-lg`.
*   **Star Rating:** `text-accent-500` (SVG icons).

**HTML Structure Sketch:**

```html
<section class="bg-surface-50 py-24 md:py-32">
  <div class="container mx-auto px-4 md:px-6 max-w-4xl text-center">
    <h2 class="text-4xl font-bold text-primary-700 mb-12" data-aos="fade-up">What Our Clients Say</h2>
    <div class="bg-surface-100 rounded-2xl shadow-lg p-8 md:p-12" data-aos="fade-up" data-aos-delay="100">
      <div class="flex justify-center mb-4">
        <!-- 5 Star Rating -->
        <svg class="w-6 h-6 text-accent-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.855 1.416 8.289L12 18.288l-7.415 3.899 1.416-8.289-6.001-5.855 8.332-1.209L12 .587z"/></svg>
        <svg class="w-6 h-6 text-accent-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.855 1.416 8.289L12 18.288l-7.415 3.899 1.416-8.289-6.001-5.855 8.332-1.209L12 .587z"/></svg>
        <svg class="w-6 h-6 text-accent-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.855 1.416 8.289L12 18.288l-7.415 3.899 1.416-8.289-6.001-5.855 8.332-1.209L12 .587z"/></svg>
        <svg class="w-6 h-6 text-accent-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.855 1.416 8.289L12 18.288l-7.415 3.899 1.416-8.289-6.001-5.855 8.332-1.209L12 .587z"/></svg>
        <svg class="w-6 h-6 text-accent-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.855 1.416 8.289L12 18.288l-7.415 3.899 1.416-8.289-6.001-5.855 8.332-1.209L12 .587z"/></svg>
      </div>
      <blockquote class="text-2xl italic font-light leading-relaxed text-surface-800 mb-6">
        "Wimmer EDV transformed our IT infrastructure. Their proactive support means we never have to worry about downtime. Truly an invaluable partner!"
      </blockquote>
      <p class="text-lg font-medium text-primary-700">
        Stefan Müller, <span class="text-surface-600">CEO at Innovate GmbH</span>
      </p>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Quote Container:** `bg-surface-100 rounded-2xl shadow-lg p-8 md:p-12`
*   **Stars:** `flex justify-center mb-4` on parent, `w-6 h-6 text-accent-500 fill-current` on each SVG.
*   **Quote:** `text-2xl italic font-light leading-relaxed text-surface-800 mb-6`
*   **Attribution:** `text-lg font-medium text-primary-700`
*   **Company:** `text-surface-600`

**Responsive Behavior:**
*   All elements are naturally centered and stack. Padding adjusts with `p-8`/`md:p-12`.

**Animation/Interaction Notes:**
*   `AOS fade-up` for the testimonial block.

**Variations:**
1.  **Single Testimonial (Centered):** As shown above, impactful for a key quote.
2.  **Testimonial Slider:** For multiple testimonials, use a simple slider with subtle `fade` or `slide` transitions between quotes.
3.  **Grid of Testimonials (Cards):** Each testimonial as a separate card, laid out in a responsive grid. Good for a dedicated testimonials page.

---

### Content Block 5: CTA Banner

**Purpose:** A highly visible and action-oriented section to drive users towards a primary conversion goal.

**Core Styles:**
*   **Background:** `bg-accent-500` or `primary-700` for high contrast.
*   **Text:** `text-white` for headlines and body.
*   **Button:** `bg-white text-accent-500 hover:bg-surface-100` (inverted for contrast).
*   **Padding:** Generous `py-16`/`py-20`.

**HTML Structure Sketch:**

```html
<section class="bg-primary-700 py-16 md:py-20 text-white">
  <div class="container mx-auto px-4 md:px-6 max-w-4xl text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
      Ready for IT That Just Works?
    </h2>
    <p class="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
      Contact Wimmer EDV today for a personalized consultation and discover how we can elevate your business.
    </p>
    <a href="/contact" class="inline-flex items-center bg-white text-primary-700 hover:bg-surface-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out shadow-lg" data-aos="fade-up" data-aos-delay="200">
      Schedule a Free Consultation
      <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </a>
  </div>
</section>
```

**Tailwind Classes:**
*   **Container:** `bg-primary-700 py-16 md:py-20 text-white`
*   **Headline:** `text-3xl md:text-4xl font-bold mb-4`
*   **Paragraph:** `text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto`
*   **Button:** `inline-flex items-center bg-white text-primary-700 hover:bg-surface-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out shadow-lg`

**Responsive Behavior:**
*   Text and button stack and center naturally.

**Animation/Interaction Notes:**
*   `AOS fade-up` with staggering for content and button.
*   Button hover effect: subtle `bg-white` to `bg-surface-100` color shift.

**Variations:**
1.  **Primary Background (Accent CTA):** As shown above, `bg-primary-700` with `white` button.
2.  **Accent Background (Primary CTA):** `bg-accent-500` with `white` button. Creates a more energetic feel.
3.  **Two Buttons:** For offering two distinct actions (e.g., "Contact Sales" and "View Services").

---

### Content Block 6: FAQ Accordion

**Purpose:** To present frequently asked questions in an organized, space-efficient, and user-friendly manner.

**Core Styles:**
*   **Container:** `bg-white`, `rounded-xl`, `shadow-lg`, `p-8`.
*   **Question (Header):** `text-xl font-semibold text-primary-700`, `cursor-pointer`, `hover:text-accent-500`.
*   **Answer (Content):** `text-surface-600`, smooth `ease-in-out` `transition`.
*   **Separator:** `border-b border-surface-200`.

**HTML Structure Sketch:**

```html
<section class="bg-surface-50 py-24 md:py-32">
  <div class="container mx-auto px-4 md:px-6 max-w-3xl">
    <h2 class="text-4xl font-bold text-primary-700 text-center mb-12" data-aos="fade-up">
      Frequently Asked Questions
    </h2>
    <div class="space-y-4" data-aos="fade-up" data-aos-delay="100">
      <!-- Accordion Item 1 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <button class="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-300 focus:rounded-md group" aria-expanded="false" data-accordion-trigger>
          <span class="text-xl font-semibold text-primary-700 group-hover:text-accent-500 transition-colors duration-200">What services does Wimmer EDV offer?</span>
          <svg class="w-6 h-6 text-primary-700 group-hover:text-accent-500 transform transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out" data-accordion-content>
          <p class="pt-4 text-surface-600">
            Wimmer EDV offers a comprehensive range of IT services including managed IT, cloud solutions, cybersecurity, data backup, network setup, and IT consulting tailored for small to medium-sized businesses.
          </p>
        </div>
      </div>
      <!-- Accordion Item 2 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <button class="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-300 focus:rounded-md group" aria-expanded="false" data-accordion-trigger>
          <span class="text-xl font-semibold text-primary-700 group-hover:text-accent-500 transition-colors duration-200">Why choose Wimmer EDV over other providers?</span>
          <svg class="w-6 h-6 text-primary-700 group-hover:text-accent-500 transform transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out" data-accordion-content>
          <p class="pt-4 text-surface-600">
            We pride ourselves on our proactive approach, personalized support, and deep understanding of our clients' unique business needs. We're not just a service provider; we're your trusted IT partner.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Tailwind Classes:**
*   **Accordion Item:** `bg-white rounded-lg shadow-md p-6`
*   **Button (Trigger):** `flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-300 focus:rounded-md group`
*   **Question Text:** `text-xl font-semibold text-primary-700 group-hover:text-accent-500 transition-colors duration-200`
*   **Arrow Icon:** `w-6 h-6 text-primary-700 group-hover:text-accent-500 transform transition-transform duration-300 ease-in-out` (rotate on open via JS, e.g., `rotate-180`)
*   **Answer Content:** `max-h-0 overflow-hidden transition-all duration-300 ease-in-out` (adjust `max-h` via JS to `max-h-full` or dynamic height)
*   **Answer Text:** `pt-4 text-surface-600`

**JavaScript Logic (Conceptual):**
*   Attach event listeners to `data-accordion-trigger` buttons.
*   On click:
    *   Toggle `aria-expanded` attribute.
    *   Find the sibling `data-accordion-content` div.
    *   If expanding, set `max-h` to `content.scrollHeight + 'px'` (or a large enough fixed value) and rotate arrow.
    *   If collapsing, set `max-h` back to `0` and revert arrow rotation.

**Responsive Behavior:**
*   Accordion items stack naturally. Width is constrained by `max-w-3xl` container.

**Animation/Interaction Notes:**
*   Smooth `transition-all duration-300 ease-in-out` for `max-h` and arrow rotation. This adheres to the "subtle, smooth, professional" motion language.
*   Focus ring `focus:ring-2 focus:ring-primary-300` for accessibility.

**Variations:**
1.  **Default (Shadowed Cards):** As shown above, each item in a distinct card.
2.  **Flat List (Bordered):** Items separated by `border-b border-surface-200`, no individual `shadow-md` or `bg-white` for a lighter feel.
3.  **With Icon/Number:** Prefix questions with a small `accent-500` icon or number for additional visual structure.

---

## 4. Navigation

The consistent elements that guide users across the site and define the brand's online presence.

### Navigation 1: Header

**Purpose:** Provides site identity (logo), primary navigation, and key contact/CTA.

**Core Styles:**
*   **Background:** Transparent at top, transitions to `bg-primary-700` on scroll.
*   **Text/Links:** `text-white` for transparency, `text-primary-100` for solid background. `hover:text-accent-500`.
*   **Logo:** SVG or image, scaled appropriately.
*   **CTA Button:** `bg-accent-500 hover:bg-accent-600 text-white`.
*   **Padding:** `py-4` for height.

**HTML Structure Sketch:**

```html
<header class="fixed top-0 left-0 w-full z-50 py-4 transition-colors duration-300 ease-in-out bg-transparent text-white" id="main-header">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img src="/path/to/logo-light.svg" alt="Wimmer EDV Logo" class="h-8 transition-opacity duration-300" id="header-logo-light">
      <img src="/path/to/logo-dark.svg" alt="Wimmer EDV Logo" class="h-8 absolute opacity-0 transition-opacity duration-300" id="header-logo-dark">
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center space-x-8">
      <a href="/services" class="text-white hover:text-accent-500 font-medium transition-colors duration-200">Services</a>
      <a href="/about" class="text-white hover:text-accent-500 font-medium transition-colors duration-200">About Us</a>
      <a href="/contact" class="text-white hover:text-accent-500 font-medium transition-colors duration-200">Contact</a>
      <a href="/contact" class="btn btn-primary-outline ml-4">Get a Quote</a>
    </nav>

    <!-- Mobile Menu Trigger -->
    <button class="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md p-2" aria-label="Open mobile menu" data-mobile-menu-trigger>
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>
</header>
```

**Tailwind Classes:**
*   **Header Container:** `fixed top-0 left-0 w-full z-50 py-4 transition-colors duration-300 ease-in-out`
*   **Transparent State:** `bg-transparent text-white`
*   **Solid State (on scroll):** `bg-primary-700 text-primary-100 shadow-lg` (JS adds/removes this)
*   **Logo:** `h-8` with `transition-opacity` for swapping light/dark versions.
*   **Nav Links (Desktop):** `hidden lg:flex items-center space-x-8`, `text-white hover:text-accent-500 font-medium transition-colors duration-200`
*   **CTA Button (Outline):** `border border-white hover:border-accent-500 text-white hover:text-accent-500 py-2 px-5 rounded-lg font-medium transition-all duration-200` (can be a `btn-secondary-outline` component)
*   **Mobile Trigger:** `lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md p-2`

**JavaScript for Scroll Behavior:**
```javascript
const header = document.getElementById('main-header');
const logoLight = document.getElementById('header-logo-light');
const logoDark = document.getElementById('header-logo-dark');
const headerLinks = header.querySelectorAll('nav a:not(.btn)');
const headerBtn = header.querySelector('.btn-primary-outline');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Or a specific hero section height
    header.classList.add('bg-primary-700', 'text-primary-100', 'shadow-lg');
    header.classList.remove('bg-transparent', 'text-white');
    logoLight.classList.add('opacity-0', 'absolute'); // Hide light logo
    logoDark.classList.remove('opacity-0', 'absolute'); // Show dark logo
    headerLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-primary-100');
    });
    if (headerBtn) {
        headerBtn.classList.remove('border-white', 'text-white');
        headerBtn.classList.add('border-accent-500', 'text-accent-500'); // Or another appropriate color
    }
  } else {
    header.classList.remove('bg-primary-700', 'text-primary-100', 'shadow-lg');
    header.classList.add('bg-transparent', 'text-white');
    logoLight.classList.remove('opacity-0', 'absolute'); // Show light logo
    logoDark.classList.add('opacity-0', 'absolute'); // Hide dark logo
    headerLinks.forEach(link => {
        link.classList.add('text-white');
        link.classList.remove('text-primary-100');
    });
    if (headerBtn) {
        headerBtn.classList.add('border-white', 'text-white');
        headerBtn.classList.remove('border-accent-500', 'text-accent-500');
    }
  }
});
```
*Note: Make sure to include both light and dark versions of the logo SVG/image.*

**Responsive Behavior:**
*   Desktop nav (`lg:flex`) is hidden on smaller screens.
*   Mobile menu trigger (`lg:hidden`) appears on smaller screens.

**Animation/Interaction Notes:**
*   Header `transition-colors duration-300 ease-in-out` for background and text on scroll.
*   `transition-opacity` for logo swap.
*   Nav link `hover:text-accent-500` with `transition-colors`.

---

### Navigation 2: Mobile Menu (Drawer/Overlay)

**Purpose:** Provides accessible navigation for small screen users.

**Core Styles:**
*   **Overlay:** `fixed inset-0 bg-primary-900 opacity-95 text-white`.
*   **Menu Items:** `text-2xl font-bold py-3 hover:text-accent-500`.
*   **Close Button:** `text-white w-8 h-8`.
*   **Entrance/Exit:** `transform translate-x-full` for drawer, `opacity-0` for overlay.

**HTML Structure Sketch:**

```html
<!-- This would live outside the header for positioning, but triggered by header button -->
<div class="fixed inset-0 bg-primary-900 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out z-50 lg:hidden" id="mobile-menu-overlay">
  <div class="absolute inset-y-0 right-0 w-80 bg-primary-800 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out p-6" id="mobile-menu-drawer">
    <div class="flex justify-end mb-8">
      <button class="text-white focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md p-2" aria-label="Close mobile menu" data-mobile-menu-close>
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <nav class="flex flex-col space-y-4">
      <a href="/services" class="text-2xl font-bold text-white hover:text-accent-500 transition-colors duration-200">Services</a>
      <a href="/about" class="text-2xl font-bold text-white hover:text-accent-500 transition-colors duration-200">About Us</a>
      <a href="/contact" class="text-2xl font-bold text-white hover:text-accent-500 transition-colors duration-200">Contact</a>
      <a href="/contact" class="btn btn-primary mt-6">Get a Quote</a>
    </nav>
  </div>
</div>
```

**Tailwind Classes:**
*   **Overlay:** `fixed inset-0 bg-primary-900 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out z-50 lg:hidden`
*   **Drawer:** `absolute inset-y-0 right-0 w-80 bg-primary-800 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out p-6`
*   **Close Button:** `text-white focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md p-2`
*   **Nav Links:** `text-2xl font-bold text-white hover:text-accent-500 transition-colors duration-200`
*   **CTA Button:** `btn btn-primary mt-6` (see Forms for definition)

**JavaScript Logic (Conceptual):**
```javascript
const mobileMenuTrigger = document.querySelector('[data-mobile-menu-trigger]');
const mobileMenuClose = document.querySelector('[data-mobile-menu-close]');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');

function openMobileMenu() {
  mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
  mobileMenuOverlay.classList.add('opacity-95', 'pointer-events-auto');
  mobileMenuDrawer.classList.remove('translate-x-full');
  document.body.style.overflow = 'hidden'; // Prevent scrolling body
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
  mobileMenuOverlay.classList.remove('opacity-95', 'pointer-events-auto');
  mobileMenuDrawer.classList.add('translate-x-full');
  document.body.style.overflow = ''; // Restore body scrolling
}

mobileMenuTrigger.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
// Optional: Close when clicking outside the drawer
mobileMenuOverlay.addEventListener('click', (e) => {
  if (e.target === mobileMenuOverlay) {
    closeMobileMenu();
  }
});
```

**Responsive Behavior:**
*   `lg:hidden` ensures this is only visible on small screens.
*   Drawer width `w-80` provides ample space.

**Animation/Interaction Notes:**
*   `transition-opacity duration-300 ease-in-out` for the overlay.
*   `transition-transform duration-300 ease-in-out` for the drawer sliding.
*   Burger icon animation (can be done with CSS transforms on child spans, or simply swap icons).

**Variations:**
1.  **Right-Side Drawer:** As shown, slides in from the right.
2.  **Full-Screen Overlay:** Content centered directly on a full-screen background, no drawer.
3.  **Left-Side Drawer:** Slides in from the left (adjust `right-0` to `left-0` and `translate-x-full` to `-translate-x-full`).

---

### Navigation 3: Footer

**Purpose:** Provides secondary navigation, copyright, social links, and optional newsletter signup.

**Core Styles:**
*   **Background:** `bg-primary-900` or `primary-700`.
*   **Text/Links:** `text-primary-200`, `text-primary-50` for copyright. `hover:text-accent-500`.
*   **Headings:** `text-xl font-semibold text-white`.
*   **Padding:** `py-16 md:py-20`.

**HTML Structure Sketch:**

```html
<footer class="bg-primary-900 text-primary-200 py-16 md:py-20">
  <div class="container mx-auto px-4 md:px-6 max-w-7xl">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-primary-700">
      <!-- Column 1: Logo & About -->
      <div>
        <a href="/" class="block mb-4">
          <img src="/path/to/logo-light.svg" alt="Wimmer EDV Logo" class="h-8">
        </a>
        <p class="text-sm leading-relaxed mb-4">
          Wimmer EDV is your trusted partner for reliable and proactive IT solutions, empowering businesses to thrive.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-primary-200 hover:text-accent-500 transition-colors duration-200" aria-label="LinkedIn">
            <!-- LinkedIn SVG -->
          </a>
          <a href="#" class="text-primary-200 hover:text-accent-500 transition-colors duration-200" aria-label="Facebook">
            <!-- Facebook SVG -->
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-6">Quick Links</h3>
        <ul class="space-y-3">
          <li><a href="/services" class="hover:text-accent-500 transition-colors duration-200">Our Services</a></li>
          <li><a href="/about" class="hover:text-accent-500 transition-colors duration-200">About Us</a></li>
          <li><a href="/blog" class="hover:text-accent-500 transition-colors duration-200">Blog</a></li>
          <li><a href="/contact" class="hover:text-accent-500 transition-colors duration-200">Contact</a></li>
        </ul>
      </div>

      <!-- Column 3: Services -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-6">Services</h3>
        <ul class="space-y-3">
          <li><a href="/it-managed" class="hover:text-accent-500 transition-colors duration-200">Managed IT</a></li>
          <li><a href="/cloud-solutions" class="hover:text-accent-500 transition-colors duration-200">Cloud Solutions</a></li>
          <li><a href="/cybersecurity" class="hover:text-accent-500 transition-colors duration-200">Cybersecurity</a></li>
          <li><a href="/data-backup" class="hover:text-accent-500 transition-colors duration-200">Data Backup</a></li>
        </ul>
      </div>

      <!-- Column 4: Contact & Newsletter -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-6">Contact Us</h3>
        <address class="not-italic space-y-2 mb-6">
          <p>123 IT Street, 1010 Vienna, Austria</p>
          <p><a href="tel:+43123456789" class="hover:text-accent-500 transition-colors duration-200">+43 123 456 789</a></p>
          <p><a href="mailto:info@wimmer-edv.at" class="hover:text-accent-500 transition-colors duration-200">info@wimmer-edv.at</a></p>
        </address>
        <!-- Optional Newsletter Signup -->
        <h3 class="text-xl font-semibold text-white mb-4">Stay Updated</h3>
        <form class="flex flex-col sm:flex-row gap-2">
          <input type="email" placeholder="Your Email" class="flex-grow p-3 rounded-lg bg-primary-800 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500">
          <button type="submit" class="bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">Subscribe</button>
        </form>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center pt-8 text-primary-50 text-sm">
      &copy; 2023 Wimmer EDV. All rights reserved.
    </div>
  </div>
</footer>
```

**Tailwind Classes:**
*   **Footer Container:** `bg-primary-900 text-primary-200 py-16 md:py-20`
*   **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12`
*   **Headings:** `text-xl font-semibold text-white mb-6`
*   **Links:** `hover:text-accent-500 transition-colors duration-200`
*   **Social Icons:** `text-primary-200 hover:text-accent-500 transition-colors duration-200`
*   **Newsletter Input:** `p-3 rounded-lg bg-primary-800 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500`
*   **Newsletter Button:** `bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200`
*   **Copyright:** `text-primary-50 text-sm`

**Responsive Behavior:**
*   Columns stack (`grid-cols-1`) on mobile, expand to `md:grid-cols-2`, then `lg:grid-cols-4`.
*   Newsletter form goes from `flex-col` to `sm:flex-row`.

**Animation/Interaction Notes:**
*   `transition-colors` on links for smooth hover effects.

**Variations:**
1.  **Four-Column Layout:** As shown above, ideal for comprehensive footers.
2.  **Two-Column Layout:** Simpler footer with two main content blocks (e.g., brand/links on left, contact/social on right).
3.  **Minimal Footer:** Only logo, copyright, and possibly social links for very simple sites.

---

## 5. Cards

The versatile, reusable component for displaying diverse content in a structured, digestible format. Used for services, team members, blog posts, projects, etc.

**Core Styles:**
*   **Background:** `bg-white` or `bg-surface-50`/`bg-surface-100`.
*   **Shadow:** `shadow-md` for default, `shadow-lg` for hover.
*   **Border Radius:** `rounded-xl`.
*   **Padding:** `p-6` to `p-8`.
*   **Headings:** `text-xl font-semibold text-primary-700`.
*   **Text:** `text-base text-surface-600`.

**HTML Structure Sketch (General):**

```html
<div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
  <!-- Card content -->
</div>
```

**Responsive Behavior:**
*   Cards are typically used within grid layouts (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) to handle responsive arrangement.
*   Internal content (image, text) adapts `w-full h-auto`.

**Animation/Interaction Notes:**
*   **Hover Effect:** `transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1`. This provides a subtle "lift" as per the design system.

---

### Card Variation 1: Image Top (Service Card / Blog Post Preview)

**Purpose:** Emphasizes a visual before the text content.

**HTML Structure Sketch:**

```html
<div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1" data-aos="fade-up">
  <img src="/path/to/service-img.jpg" alt="Service Name" class="w-full h-48 object-cover">
  <div class="p-6 flex flex-col flex-grow">
    <h3 class="text-xl font-semibold text-primary-700 mb-2">Managed IT Services</h3>
    <p class="text-base text-surface-600 mb-4 flex-grow">
      Proactive monitoring, maintenance, and support to ensure your IT infrastructure is always running smoothly.
    </p>
    <a href="/services/managed-it" class="text-accent-500 hover:text-accent-600 font-medium inline-flex items-center group">
      Learn More
      <svg class="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </a>
  </div>
</div>
```

**Tailwind Classes:**
*   **Image:** `w-full h-48 object-cover` (fixed height for consistency in grids).
*   **Content:** `p-6 flex flex-col flex-grow`.
*   **Headline:** `text-xl font-semibold text-primary-700 mb-2`.
*   **Paragraph:** `text-base text-surface-600 mb-4 flex-grow`.
*   **Link:** `text-accent-500 hover:text-accent-600 font-medium inline-flex items-center group`.

---

### Card Variation 2: Image Left (Team Member / Quick Feature)

**Purpose:** Highlights an individual or provides a concise feature summary.

**HTML Structure Sketch:**

```html
<div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1" data-aos="fade-up">
  <img src="/path/to/team-member.jpg" alt="Thomas Wimmer" class="w-24 h-24 rounded-full object-cover flex-shrink-0">
  <div>
    <h3 class="text-xl font-semibold text-primary-700">Thomas Wimmer</h3>
    <p class="text-base text-accent-500 mb-2">CEO & Founder</p>
    <p class="text-sm text-surface-600">
      With over 15 years of experience, Thomas leads Wimmer EDV with a vision for innovative IT solutions.
    </p>
  </div>
</div>
```

**Tailwind Classes:**
*   **Container:** `p-6 flex items-center space-x-6`.
*   **Image:** `w-24 h-24 rounded-full object-cover flex-shrink-0`.
*   **Name:** `text-xl font-semibold text-primary-700`.
*   **Title:** `text-base text-accent-500 mb-2`.
*   **Bio:** `text-sm text-surface-600`.

---

### Card Variation 3: Icon Top, No Image (Feature Card)

**Purpose:** Best for conveying concepts or features where an icon is more appropriate than a photograph.

**HTML Structure Sketch:**

```html
<div class="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1" data-aos="fade-up">
  <div class="p-4 rounded-full bg-primary-50 text-primary-500 mb-6">
    <!-- Icon SVG -->
    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.075 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.075 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.075 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.075 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
  </div>
  <h3 class="text-xl font-semibold text-primary-700 mb-3">Cybersecurity Solutions</h3>
  <p class="text-base text-surface-600">
    Protect your business from evolving threats with our robust security protocols and proactive defense strategies.
  </p>
</div>
```

**Tailwind Classes:**
*   **Container:** `p-8 text-center flex flex-col items-center`.
*   **Icon Wrapper:** `p-4 rounded-full bg-primary-50 text-primary-500 mb-6`.
*   **Icon SVG:** `w-10 h-10`.
*   **Headline:** `text-xl font-semibold text-primary-700 mb-3`.
*   **Text:** `text-base text-surface-600`.

---

## 6. Forms

Patterns for input fields, buttons, and form layouts, ensuring consistency and usability.

**Core Styles:**
*   **Input/Select/Textarea:** `border border-surface-300`, `rounded-lg`, `px-4 py-3`, `focus:ring-2 focus:ring-primary-300 focus:border-primary-300`.
*   **Labels:** `text-surface-700 font-medium mb-2`.
*   **Error Text:** `text-error font-medium text-sm`.
*   **Buttons:** Defined below with hierarchy.

**HTML Structure Sketch (General Input):**

```html
<div>
  <label for="input-id" class="block text-surface-700 font-medium mb-2">Label Name</label>
  <input type="text" id="input-id" name="input-name" class="w-full px-4 py-3 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 ease-in-out" placeholder="Enter text here">
  <!-- Optional error message -->
  <p class="text-error font-medium text-sm mt-1 hidden">This field is required.</p>
</div>
```

---

### Form Element 1: Input Styling

**Purpose:** Standardized look and feel for all form input elements.

**Tailwind Classes:**
*   **Base Input:** `w-full px-4 py-3 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 ease-in-out`
*   **Placeholder:** `placeholder-surface-400`
*   **Textarea:** Same as input, but `min-h-[120px]` (or adjust for desired height).
*   **Select:** Same as input, but ensure custom arrow styling if needed (often hidden and replaced by SVG).
*   **Validation State (Error):** `border-error focus:ring-error focus:border-error`
*   **Validation State (Success):** `border-accent-500 focus:ring-accent-300 focus:border-accent-500`

---

### Form Element 2: Button Hierarchy

**Purpose:** Clear visual distinction for primary, secondary, and tertiary actions.

**Tailwind Classes (as component classes, e.g., in `tailwind.css` or component file):**
*   **Base Button Style (Reusable):**
    ```css
    .btn {
      @apply inline-flex items-center justify-center font-medium py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out;
    }
    ```

*   **Primary CTA (Accent Green):**
    ```css
    .btn-primary {
      @apply btn bg-accent-500 text-white hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2;
    }
    ```
    *   **Usage:** `btn btn-primary`

*   **Secondary CTA (Primary Blue):**
    ```css
    .btn-secondary {
      @apply btn bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2;
    }
    ```
    *   **Usage:** `btn btn-secondary`

*   **Outline/Ghost Button (Primary Blue Outline):**
    ```css
    .btn-outline {
      @apply btn border border-primary-500 text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2;
    }
    ```
    *   **Usage:** `btn btn-outline`

*   **Accent Outline Button (Accent Green Outline):**
    ```css
    .btn-accent-outline {
      @apply btn border border-accent-500 text-accent-500 hover:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2;
    }
    ```
    *   **Usage:** `btn btn-accent-outline`

**Animation/Interaction Notes:**
*   All buttons have a smooth `transition-colors duration-200 ease-in-out` for hover and focus states.
*   `focus:ring-2 focus:ring-[color]` for accessible focus indication.

---

### Form Element 3: Form Layout

**Purpose:** Organizes form fields into readable and responsive structures.

**HTML Structure Sketch (Single Column):**

```html
<form class="space-y-6">
  <div>
    <label for="name" class="block text-surface-700 font-medium mb-2">Your Name</label>
    <input type="text" id="name" name="name" class="w-full px-4 py-3 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 ease-in-out" placeholder="Enter your full name">
  </div>
  <div>
    <label for="email" class="block text-surface-700 font-medium mb-2">Email Address</label>
    <input type="email" id="email" name="email" class="w-full px-4 py-3 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 ease-in-out" placeholder="your@example.com">
  </div>
  <div>
    <label for="message" class="block text-surface-700 font-medium mb-2">Your Message</label>
    <textarea id="message" name="message" rows="5" class="w-full px-4 py-3 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 ease-in-out" placeholder="Tell us about your IT needs..."></textarea>
  </div>
  <button type="submit" class="btn btn-primary w-full sm:w-auto">Send Message</button>
</form>
```

**Tailwind Classes:**
*   **Form Container:** `space-y-6` for consistent vertical spacing between fields.
*   **Button:** `w-full sm:w-auto` for full width on mobile, auto-width on desktop.

**Responsive Behavior:**
*   Single column forms are inherently responsive.
*   `w-full` on inputs ensures they take full available width.

**Variations:**

1.  **Single Column Layout:** As shown above.
2.  **Responsive Two-Column Layout:**
    *   **HTML:**
        ```html
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Field 1 -->
          <div>...</div>
          <!-- Field 2 -->
          <div>...</div>
          <!-- Full-width field spanning two columns -->
          <div class="md:col-span-2">...</div>
          <div class="md:col-span-2 flex justify-start">
            <button type="submit" class="btn btn-primary">Send Message</button>
          </div>
        </form>
        ```
    *   **Classes:** `grid grid-cols-1 md:grid-cols-2 gap-6`. Use `md:col-span-2` for elements that should span both columns on larger screens.

---

## 7. Utility Patterns

Flexible, reusable helper classes and patterns for common design challenges.

### Utility 1: Page Transition Wrapper

**Purpose:** Provides a smooth fade-in effect when navigating between pages.

**Tailwind/CSS Classes:**
*   **CSS (in global stylesheet or component):**
    ```css
    .page-transition-enter-active,
    .page-transition-leave-active {
      transition: opacity 0.4s ease-in-out;
    }
    .page-transition-enter-from,
    .page-transition-leave-to {
      opacity: 0;
    }
    ```
    *   *Note:* This typically requires a client-side routing solution (e.g., Astro's View Transitions API or a custom JS router) to apply classes correctly.

**HTML Structure Sketch (Astro-specific):**
*   This would typically wrap your main content in `layouts/BaseLayout.astro` or similar.

```astro
---
// In src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---
<!DOCTYPE html>
<html lang="en">
<head>
    <ViewTransitions />
    <!-- ... other head elements ... -->
</head>
<body class="font-sans antialiased text-surface-800 bg-surface-50">
    <!-- Header component -->
    <Header />
    <main id="main-content" transition:animate="fade">
        <slot />
    </main>
    <!-- Footer component -->
    <Footer />
</body>
</html>
```

**Animation/Interaction Notes:**
*   `fade` animation is defined in Astro's View Transitions. If using custom JS, ensure `opacity 0.4s ease-in-out` for a professional, reassuring feel.

---

### Utility 2: Scroll-Reveal Animation Classes

**Purpose:** To make content appear gracefully as the user scrolls, adhering to the "gentle fade-up and slide-in" motion language.

**Tailwind/CSS Classes (Requires JavaScript, e.g., AOS or Intersection Observer):**
*   **Initial State (Hidden):**
    ```tailwind
    opacity-0 translate-y-4
    ```
*   **Active State (Visible):**
    ```tailwind
    opacity-100 translate-y-0
    ```
*   **Transition:**
    ```tailwind
    transition-all duration-500 ease-in-out
    ```

**HTML Structure Sketch (Using a simplified `data-aos` approach as a conceptual example):**

```html
<h2 class="text-4xl font-bold text-primary-700" data-aos="fade-up" data-aos-delay="0">Our Approach</h2>
<p class="text-lg text-surface-600 mt-4" data-aos="fade-up" data-aos-delay="150">
  We combine expertise with a personalized touch to deliver unparalleled IT support.
</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
  <div class="card" data-aos="fade-up" data-aos-delay="300">...</div>
  <div class="card" data-aos="fade-up" data-aos-delay="450">...</div>
  <div class="card" data-aos="fade-up" data-aos-delay="600">...</div>
</div>
```

**JavaScript (Conceptual for custom Intersection Observer):**
```javascript
// In a client-side script (e.g., in src/components/FadeInOnScroll.astro or directly in <script> tag)
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('[data-animate-on-scroll]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // Optional: stop observing once animated
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation a bit before it enters the viewport
  });

  elementsToAnimate.forEach(element => {
    element.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500', 'ease-in-out');
    observer.observe(element);
  });
});

// For staggered animations, you'd add a data-delay attribute and use setTimeout in the observer.
```

**Recommendation:** For ease of use, integrate a library like [AOS - Animate On Scroll](https://michalsnik.github.io/aos/). It handles the JS and provides `data-aos="..."` attributes directly in HTML.

---

### Utility 3: Responsive Image/Video Container

**Purpose:** Ensures media maintains aspect ratio across different screen sizes.

**Tailwind/CSS Classes:**
*   **Container:** `relative w-full overflow-hidden`
*   **Aspect Ratio (16:9):** `pt-[56.25%]` (calculated as `(9 / 16) * 100%`)
*   **Child Media:** `absolute inset-0 w-full h-full object-cover` (for images) or `w-full h-full` (for iframes/videos).

**HTML Structure Sketch:**

```html
<div class="relative w-full pt-[56.25%] rounded-xl shadow-md overflow-hidden">
  <img src="/path/to/responsive-image.jpg" alt="Description" class="absolute inset-0 w-full h-full object-cover">
</div>

<div class="relative w-full pt-[56.25%] rounded-xl shadow-md overflow-hidden mt-8">
  <iframe src="https://www.youtube.com/embed/your-video-id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute inset-0 w-full h-full"></iframe>
</div>
```

**Tailwind Classes:**
*   **Container:** `relative w-full pt-[56.25%] rounded-xl shadow-md overflow-hidden`
*   **Media (Image/Video):** `absolute inset-0 w-full h-full object-cover` (or remove `object-cover` for iframes).

**Variations:**
1.  **16:9 Aspect Ratio:** `pt-[56.25%]` (most common for video/wide images).
2.  **4:3 Aspect Ratio:** `pt-[75%]` (for more traditional photos).
3.  **1:1 Aspect Ratio (Square):** `pt-[100%]` (for avatars, product images).

---

### Utility 4: Gradient Overlay Mixin

**Purpose:** To add subtle or impactful gradients, often over images, for text readability or visual flair.

**Tailwind/CSS Classes (Can be an inline style or a custom utility class):**
*   **Overlay (Darkening from bottom):**
    ```tailwind
    bg-gradient-to-t from-primary-900 via-primary-700/50 to-transparent
    ```
*   **Overlay (Subtle light-to-dark):**
    ```tailwind
    bg-gradient-to-br from-surface-50 to-surface-200
    ```

**HTML Structure Sketch:**

```html
<div class="relative h-64 bg-cover bg-center rounded-xl overflow-hidden" style="background-image: url('/path/to/hero-bg.jpg');">
  <div class="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-700/50 to-transparent"></div>
  <div class="absolute bottom-6 left-6 text-white z-10">
    <h3 class="text-2xl font-bold">IT Strategy Consulting</h3>
    <p class="text-lg">Guiding your digital future.</p>
  </div>
</div>
```

**Tailwind Classes:**
*   **Gradient Layer:** `absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-700/50 to-transparent` (adjust colors and directions).
*   Ensure text is `text-white` and has `z-10` to appear above the overlay.

**Variations:**
1.  **Darkening Overlay (as above):** For text readability over images.
2.  **Accent Gradient:** `bg-gradient-to-r from-accent-500 to-accent-300` for a vibrant background.
3.  **Subtle Background Gradient:** `bg-gradient-to-br from-surface-50 to-surface-100` for a soft, premium section background without strong contrast.

---

### Utility 5: Badge/Tag/Chip Style

**Purpose:** Small, informative labels for categorization, status, or keywords.

**Core Styles:**
*   **Shape:** `rounded-full` or `rounded-md`.
*   **Padding:** `px-3 py-1`.
*   **Font:** `text-sm font-medium`.

**HTML Structure Sketch:**

```html
<div class="flex flex-wrap gap-2">
  <span class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">Managed Services</span>
  <span class="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-sm font-medium text-accent-700">Cloud Computing</span>
  <span class="inline-flex items-center rounded-md bg-surface-200 px-3 py-1 text-sm font-medium text-surface-700">New</span>
  <span class="inline-flex items-center rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700">Gold Partner</span>
</div>
```

**Tailwind Classes:**
*   **Primary Badge:** `inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700`
*   **Accent Badge:** `inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-sm font-medium text-accent-700`
*   **Neutral Badge:** `inline-flex items-center rounded-md bg-surface-200 px-3 py-1 text-sm font-medium text-surface-700`
*   **Secondary Badge:** `inline-flex items-center rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700`

**Variations:**
1.  **Pill Shape (`rounded-full`):** As shown above, common for keywords.
2.  **Square/Rounded Rect (`rounded-md`):** For more formal tags or status indicators.
3.  **With Icon:** Add a small SVG icon inside the span (e.g., `text-accent-700`).

---