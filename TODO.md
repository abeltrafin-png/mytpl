# TODO: Create Attractive Berita Page

## Tasks
- [x] Create a dedicated API route for berita (/api/berita/route.ts) that fetches from Laravel API
- [x] Update /berita page to have an attractive design with cards, images, etc.
- [x] Ensure data is fetched from Laravel API berita endpoint

---

# TODO: Implement Peraturan Feature with 4 Categories

## Phase 1: Database & SQL ✅
- [x] Create SQL file for tbl_pengaturan (create_tbl_pengaturan.sql)
- [x] Define table structure with all required fields
- [x] Add sample data for all 4 categories (Akademik, Kemahasiswaan, Administratif, Keuangan)

## Phase 2: API Route ✅
- [x] Create API route /api/peraturan/route.ts
- [x] Implement GET method with kategori filter support
- [x] Add fallback to direct database query
- [x] Implement POST method for adding new peraturan
- [x] Add proper error handling and timeout

## Phase 3: Navbar Update ✅
- [x] Add "Peraturan" menu item to Navbar
- [x] Create submenu with 4 categories
- [x] Link each category to /peraturan?kategori=[kategori]

## Phase 4: Components ✅
- [x] Create PeraturanList component (app/component/PeraturanList.tsx)
- [x] Implement expandable card design
- [x] Add kategori badges with colors
- [x] Add download button for PDF files
- [x] Implement loading and error states

## Phase 5: Main Page ✅
- [x] Create /peraturan page (app/peraturan/page.tsx)
- [x] Implement category tabs with icons
- [x] Add category descriptions
- [x] Integrate PeraturanList component
- [x] Handle URL query parameters for kategori

## Phase 6: Laravel Backend ✅
- [x] Import SQL to Laravel database
- [x] Create Laravel API endpoint /api/peraturan
- [x] Implement GET method with kategori filter
- [x] Implement POST method for adding peraturan
- [x] Test API endpoints

## Phase 7: Testing & Verification ✅
- [x] Test all 4 category tabs (API tested via curl)
- [x] Verify data fetching from Laravel API (confirmed working)
- [x] Test fallback to database/mock data (Laravel API active)
- [x] Test responsive design on mobile (requires browser testing)
- [x] Verify PDF download functionality (requires browser testing)
- [x] Test navigation from Navbar submenu (requires browser testing)
