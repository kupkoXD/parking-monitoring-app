# Parking Occupancy Monitoring System

Tento systém deteguje a vizualizuje obsadenosť parkovacích miest pomocou kamery umiestnenej nad parkoviskom. Spája manuálne označenie parkovacích miest, detekciu vozidiel pomocou YOLO modelu a webové rozhranie postavené na Reacte.

> Testované v prostredí **Windows 11**, **PyCharm**, a **Google Chrome**. Aplikácia nie je optimalizovaná pre mobilné zariadenia.

---

## Požiadavky na systém

- Python 3.11+
- Node.js
- Odporúčaný editor: PyCharm
- Mobilná aplikácia: **IP Webcam**
- Internetové pripojenie

---

## Spustenie systému

1. Naklonujte repozitár alebo si ho stiahnite ako `.zip`:
    ```
    tu adresu gitu
    ```

2. Otvorte projekt v PyCharme a nastavte Python 3.11+ vo virtuálnom prostredí.

3. Nainštalujte závislosti pre frontend:
    ```bash
    cd react-frontend
    npm install
    ```

4. Nainštalujte závislosti pre backend:
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```

5. Pridajte snímku z kamery do priečinka `backend/` a upravte názov v súbore `anotate.py`, riadok 8:
    ```python
    cap = cv2.imread('nazov.png')
    ```

6. Na riadkoch 14 a 63 zmeňte výstupný názov súboru s parkovacími miestami:
    ```python
    with open("nazov_suboru_sem", "wb") as f
    ```

7. Spustite anotáciu parkovacích miest:
    ```bash
    python anotate.py
    ```

    - Držte **ľavé tlačidlo myši** a **pravým klikaním** vytvárajte mnohouholník (min. 3 body).
    - Po pustení zadáte názov miesta do konzoly.
    - Opakujte pre všetky miesta.
    - Po dokončení stlačte `s` pre uloženie a `q` pre ukončenie.

8. V `app.py` na riadku 17 zmeňte názov načítaného súboru:
    ```python
    with open("nazov_suboru_sem", "rb") as f
    ```

9. Na riadku 44 zmeňte IP adresu streamu z aplikácie IP Webcam:
    ```python
    stream_url = 'http://192.168.X.X:8080/video'
    ```

10. Spustite backend:
    ```bash
    python app.py
    ```

11. Spustite frontend:
    ```bash
    cd ../react-frontend
    npm start
    ```

---

## Vizualizácia výsledkov

Po spustení backendu a frontendu sa automaticky otvorí webová aplikácia. Postup:

- Vyberte možnosť **Hlavné parkovisko → Pohľad 1**
- Prepnutím prepínača vpravo na **"Live"** sa zobrazí živý obraz z kamery
- Stav parkoviska sa aktualizuje automaticky

### Legenda:
- Zelená – miesto je **voľné**
- Červená – miesto je **obsadené**

Každé miesto je označené názvom zadaným pri anotácii.

---

## Riešenie problémov

- **Problém s `requirements.txt`**
    - Skontrolujte internetové pripojenie
    - Aktualizujte pip:
        ```bash
        python -m pip install --upgrade pip
        ```
    - Skúste nainštalovať balíčky jednotlivo:
        ```bash
        pip install flask flask-cors
        ```

- **Frontend sa nespustí**
    - Skontrolujte, že máte nainštalovaný `Node.js` a `npm`
    - Príkaz `npm install` spustite v priečinku `react-frontend`

---

## Použité technológie

- Python + OpenCV
- YOLO (Ultralytics)
- Flask
- React
- IP Webcam (Android app)
- Pickle pre ukladanie anotácií
