# Galaxy Global: System Documentation & Setup Guide

This document provides the world-class architectural implementation plan for the "Galaxy Global" video agency, covering WordPress integration, automated onboarding, and global SEO strategies.

---

## 1. Master Setup Guide (WordPress & Elementor)

Even though this prototype is built in React for peak performance, follow these steps if migrating to the WordPress/Elementor ecosystem:

### Step 1: Core Infrastructure
- **Hosting:** Deploy on Kinsta or WP Engine (optimized for Core Web Vitals).
- **Theme:** Use Astra (Lightweight) or Hello Elementor.
- **CDN:** Cloudflare (Enterprise features).

### Step 2: Plugin Architecture
- **Builder:** Elementor Pro + Elementor Custom Code (for GSAP).
- **SEO:** Rank Math SEO (Advanced Schema support).
- **Cache:** WP Rocket with Critical CSS generation.
- **Automation:** Uncanny Automator (links WC orders to project management).

### Step 3: Tawk.to & GA4 Integration
- **GA4:** Set `VITE_GA_MEASUREMENT_ID` in your environment.
- **Tawk.to:** Set `VITE_TAWKTO_PROPERTY_ID` in your environment.
- These scripts are injected dynamically via the `Analytics` component to ensure they don't break the build during local development if IDs are missing.

---

## 2. Page-by-Page SEO Architecture

| Page | Priority Keyword | Meta Structure | Intent |
| :--- | :--- | :--- | :--- |
| **Home** | Video Editing Agency | Galaxy Global | Elite Video Editing Agency for Global Brands | High-Intent Lead Gen |
| **Portfolio** | YouTube Editor Service | Cinematic Portfolio: Professional YouTube Editor Service | Experience Validation |
| **Pricing** | Video Production Cost | Transparent Video Editing Pricing Plans | Transactional |
| **Blog** | Video Agency Insights | Scale Your Channel: Insights from our Video Agency | Organic Traffic |

---

## 3. Scalable E-Commerce Onboarding Flow

To handle 100+ clients seamlessly, we use an **Event-Driven Onboarding System**:

1.  **Checkout:** Customer selects plan via Pricing Page (integrated with WooCommerce/Stripe).
2.  **Trigger:** WooCommerce Order Status -> "Processing".
3.  **Automation (Zapier/Automator):**
    - **Step A:** Generate Client Portal folder (Google Drive/Dropbox).
    - **Step B:** Create Client Profile in CRM (HubSpot/Notion).
    - **Step C:** Send "Onboarding Brief" via automated email (using Galaxy Global branding).
4.  **Submission:** Client submits raw footage and brief through the agency portal.
5.  **Production:** Task automatically assigned to the relevant Editor based on plan tier.

---

## 4. Speed & SEO Optimization Checklist

### Technical SEO (On-Page)
- [ ] **LCP Optimization:** Use `.webp` for all images and prioritize Hero text load.
- [ ] **Schema Markup:** Inject `Organization` and `Service` JSON-LD schemas.
- [ ] **Alt Tags:** "Galaxy Global Video Editing Agency Portfolio - [Client Name]".
- [ ] **Lazy Loading:** All videos below the fold must be lazy-loaded with a placeholder image.

### Performance (Core Web Vitals)
- [ ] **Font Swap:** Use `font-display: swap` for Space Grotesk.
- [ ] **Code Splitting:** Elementor "Improved CSS Loading" MUST be enabled.
- [ ] **Animation Delay:** GSAP initialization should wait for the window `load` event to avoid blocking initial render.

---

## 5. Custom Code Placement Guide

### GSAP & Lottie (JavaScript)
Place these in your Elementor "Custom Code" (Footer) or `functions.php`:
```javascript
// GSAP High-Contrast Reveal Logic
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Cinematic Title Reveal
  gsap.from(".reveal-text", {
    duration: 1.5,
    y: "100%",
    ease: "expo.out",
    stagger: 0.2
  });
});
```

### Cinematic Minimalist Stying (CSS)
Place in Elementor "Global Settings" > "Custom CSS":
```css
/* Deep Monochrome Aesthetic */
body { filter: contrast(110%) brightness(95%); }
.premium-card { border: 1px solid rgba(255,255,255,0.05); }
.premium-card:hover { border-color: #ffffff; }
```
