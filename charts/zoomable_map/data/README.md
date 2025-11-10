# Iraq Zoomable Map - Data Structure

## File Organization

The data has been separated into three clean files for easy maintenance:

### 1. `governorate-data.js` ⭐ EDIT THIS FILE
**Contains**: All statistics and information you'll want to update
- Population numbers
- Registered voters
- GDP values
- Political descriptions
- Voting history percentages

**When to edit**: Whenever you need to update numbers, descriptions, or add new election data.

### 2. `iraq-map.js` 🗺️ DON'T EDIT
**Contains**: Geographic boundaries (GeoJSON coordinates)
- Map geometry for all 18 governorates
- Coordinate data for drawing the map

**When to edit**: Only if you need to update the actual map boundaries (rare).

### 3. `data.js` 🔗 AUTO-GENERATED
**Contains**: Merges the above two files
- Combines map geometry with statistics
- Loaded automatically in the browser

**When to edit**: Never! It automatically combines the other two files.

## How It Works

1. Browser loads `iraq-map.js` → Gets map geometry
2. Browser loads `governorate-data.js` → Gets statistics
3. Browser loads `data.js` → Merges them together into `iraqGeoJSON`
4. Map displays with all data!

## To Update Statistics

1. Open `governorate-data.js`
2. Find the governorate ID (e.g., "IQBG" for Baghdad)
3. Update the values:
   ```javascript
   "IQBG": {
     "name": "Baghdad",
     "population": 8126755,  // ← Change these
     "voters": 5284000,       // ← Change these
     "gdp": 45.2,            // ← Change these
     "political": "...",     // ← Change these
     "votingHistory": {      // ← Change these
       "2012": 62,
       "2016": 58,
       "2020": 48
     }
   }
   ```
4. Save and refresh the page!

## Governorate IDs Reference

- IQDA = Dohuk
- IQAR = Erbil  
- IQSU = Sulaymaniyah
- IQNI = Nineveh
- IQKI = Kirkuk
- IQAN = Anbar
- IQSD = Salah al-Din
- IQDI = Diyala
- IQBG = Baghdad
- IQBB = Babil
- IQKA = Karbala
- IQNA = Najaf
- IQQA = Qadisiyyah
- IQWA = Wasit
- IQMA = Maysan
- IQBA = Basra
- IQDQ = Dhi Qar
- IQMU = Muthanna
