# Funkční specifikace hry pexeso

## 1. Datový konceptuální model
- **Karty**: Obrázky uložené ve formátu URL (např. `Obr/Obr1.png`) jako datové zdroje pro hru pexeso.
- **Herní deska**: Matice obsahující karty vždy v novém náhodném uspořádání.
- **Hráči**: Jednoduché skóre (celé číslo) reprezentující počet nalezených dvojic.

## 2. Charakteristika funkčností aplikace
1. Výběr režimu hry: Hráč si zvolí mezi hrou pro jednoho nebo dva hráče.
2. Zobrazení herní desky s náhodně rozmístěnými kartami.
3. Interakce s kartami: Kliknutím na kartu se karta otočí, aby zobrazila svůj obrázek.
4. Kontrola shody: Pokud se obrázky dvou vybraných karet shodují, karta se odstraní a zvyší se skóre.
5. Správa skóre: Aktualizace skóre na základě nalezených dvojic aktivnímu hráči.
6. Restart hry: Možnost začít hru znovu.
7. Tlačítko pro návrat do hlavního menu.
8. Režim dvou hráčů: Po výběru dvou karet se přepne druhý hráč jako aktivní pro výběr karet.

## 3. Specifikace uživatelských rolí a oprávnění
- **Hráč (jednotlivý)**:
  - Přístup k výběru režimu hry (volba pro jednoho nebo pro dva hráče).
  - Možnost klikat na karty a tím je otáčet, ovládat tlačítka informačního panelu.


## 4. Uživatelské grafické rozhraní a jeho funkčnosti
- **Hlavní menu**:
  - Tlačítka pro volbu režimu hry (pro jednoho nebo dva hráče).
- **Herní obrazovka**:
  - Herní deska s kartami uspořádanými v mřížce.
  - Panel informací zobrazující skóre, tlačítko pro restart hry a tlačítko pro návrat do hlavní nabídky.
- **Grafické prvky**:
  - Animace při otáčení karet.
  - Návrh tlačítek a interaktivních prvků.

---

# Technická specifikace

## 1. Datový logický model
1. **Frontend**: HTML pro strukturu stránky, CSS pro design a rozvržení, JavaScript pro logiku hry.
2. **Logika hry**:
  - Inicializace herní desky (náhodné míchání karet).
  - Správa stavu hry (otáčení karet, kontrola shody, aktualizace skóre).
3. **Herní deska**: Matice karet (div elementů) s vlastnostmi `data-image` pro porovnání.
4. **Hráči**: Dva hráči s atributy skóre a aktuální tah.


## 2. Popis tříd včetně základních funkcí
- **Třída: Herní deska (Board)**:
  - `initializeBoard()`: Generuje a vykresluje herní desku.
  - `createCard(image)`: Vytváří a inicializuje jednotlivé karty.
- **Třída: Karta (Card)**:
  - `handleCardClick(card)`: Spravuje logiku při kliknutí na kartu.
  - `checkForMatch()`: Kontroluje shodu mezi dvěma kartami.

## 3. Popis základních funkcí
- **Funkce `disableCards()`**:
  - Skryje karty, pokud se shodují.
  - Zajišťuje, že tyto karty již nelze znovu kliknout.

- **Funkce `unflipCards()`**:
  - Otočí karty zpět na druhou stranu, pokud se neshodují.
  - Resetuje stav herní desky.

- **Funkce `resetBoard()`**:
  - Resetuje stavy `firstCard`, `secondCard` a `lockBoard`.

- **Funkce `updateScore()`**:
  - Zvyšuje skóre, pokud byly karty úspěšně spárovány.
  - Aktualizuje zobrazení skóre na uživatelském rozhraní.

## 4. Použité technologie a funkčnosti jednotlivých částí aplikace
- **HTML**:
  - Struktura stránky, tlačítka a rozvržení menu.
- **CSS**:
  - Responsivní design (např. herní deska je mřížka s přizpůsobivým layoutem).
  - Animace otáčení karet.
  - Velikost karet a informačního panelu.
  - Barevné rozvržení celé stránky.
- **JavaScript**:
  - Logika herního procesu:
    - Přiřazení kartám jejich obrázky.
    - Míchání karet.
    - Správa tahů hráčů.
    - Sestavení karet na hrací plochu.
    - Kontrola spojení správných dvojic.
- **Funkčnosti**:
  - Dynamická aktualizace DOM elementů (např. skóre, viditelnost panelů).
  - Interakce uživatele s kartami a herním prostředím.
