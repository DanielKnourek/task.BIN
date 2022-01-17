# Task.BIN App

Project for class NTI/WEA.  
Demo live on [task-bin.vercel.app](https://task-bin.vercel.app/)  

## Popis aplikace

Aplikace je tvořená v [NEXT.js](https://nextjs.org/) frameworku a UI v [React.js](https://reactjs.org/).  
Kód je napsán zejména v TypeScriptu.

## Obsah aplikace

Aplikace je rozdělena na dvě části

- ### veřejná

    kde je možné sledovat úkoly a jejich status od všech uživatelů které označili svoje úkoly jako 'public'

- ### osobní

    kde jsou zobrazeny pouze vlastní úkoly. jak veřejné tak i privátní

## Přístup

### Anonymní uživatel

Anonymní uživatel má možnost si pouze zobrazit veřejné úkoly a nemůže s nimi nijak interagovat kromně filtrů a řazení.  
Přihlášení je možné provést v hlavní nabídce nebo na  

- [task-bin.vercel.app/api/auth/signin](https://task-bin.vercel.app/api/auth/signin)  

O přihlašování se stará balíček [next-auth.js](https://next-auth.js.org/).  
Je možné se přihlásit za pomocí Auth0 svým google nebo discord účtem.  
Aplikace požaduje, má přístup následujícím vlastnostem:

- Email, Jméno, subjectID, Profilová fotografie

### Test user

Pro testovací účely je možné použít credentials kde je jeden uživatel.
| User      | Password |
|-----------|----------|
| testuser1 | Tt123456 |

### Přihlášený uživatel

Přihlášený uživatel získá přístup v hlavní nabídce k vytváření úkolů a v navigačním panelu se může přepnout na stránku s vlastními úkoly.

### Úkol (Task)

Úkol má

- nadpis

- hlavní tělo (popisek úkolu)

- Druh viditelnosti

  - Veřejné / Privátní

- termín splnění úkolu (volitelné)

Všechny tato pole může vlastník upravovat. Vlastík může také označit hotové/nehotové tlačíkem v pravé horní části úkolu. Také může celý úkol odstranit.

### Synchronizace dat

Clientská aplikace synchronizuje na pozadí záznamy s API pomocí balíčku [SWR](https://swr.vercel.app/), probíhá vše na pozadí, aby neomezovala uživatele.

## API

Přístup k API je na adrese [task-bin.vercel.app/api/task](https://task-bin.vercel.app/api/task)  
_Pouze kořenová cesta, nobsahuje žádné rozhraní ani data_  

### Ověření

K většině funkcím je zapotřebí mít ověření. Ověřování probíhá v aplikaci zapomocí Auth0 které autorizuje uživatele a vytvoří mu session a JWT token. Při dalších requestech je uživatel autentifikován práve danou kombinací tokenu a session.  
Pro dotazy mimo autentifikovaný prohlížeč je zapotřebí získat tyto údaje z cokies a přiložit je do hlavičky při dozu na API.

### Dostupná API

- Get Tasks  
    Vypíše array dostupných úkolů typu [Task](frontend/types/interfaces/Task.ts#L9)

  - link: [task-bin.vercel.app/api/task/{type}](https://task-bin.vercel.app/api/task/public)  

  - type = ['public' | 'private']

    - 'public' - je dostupné bez autentifikace, poskytuje veřejně dostupné úkoly.

    - 'private' - poskytuje úkoly autentifikovaného uživatele

    <details>
    <summary>example</summary>

    ```BASH
    curl https://task-bin.vercel.app/api/task/public
    # Status: 200 # [{...}, {...},...]

    curl https://task-bin.vercel.app/api/task/private
    # Status: 401 # Not autheticated, ...

    curl -H "cookie: __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..tmcdsQt6L9L0v7Ll.9wbUHhUIgHBPLsI7kR3YQkM5x7kQeGo17FnaO50gFkJ6v1S6zPKu8_0AD6_QgVxvdwSpiptaNV4HTHU_W-BVL9dAqw5KSACvbaJFWrm_jQ4.Dlg2aIakBM_-rIC3KGx_mA" https://task-bin.vercel.app/api/task/private
    # Status: 200 # [{...}, {...},...]
    ```

    </details>

- Create task  
    Vytvoří úkol z dat v body podle typu [NewTask](frontend/types/interfaces/Task.ts#L25)

  - link: [task-bin.vercel.app/api/task/create](https://task-bin.vercel.app/api/task/IkDFXX4BjShMp9fDLD_V/update)  

    <details>
    <summary>example</summary>

    ```BASH
    # -H cookie -X POST -d body URL
    curl -H "Content-Type: application/json" -H "cookie: __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..tmcdsQt6L9L0v7Ll.9wbUHhUIgHBPLsI7kR3YQkM5x7kQeGo17FnaO50gFkJ6v1S6zPKu8_0AD6_QgVxvdwSpiptaNV4HTHU_W-BVL9dAqw5KSACvbaJFWrm_jQ4.Dlg2aIakBM_-rIC3KGx_mA" -X POST -d '{"tasks": [{"status": {"access": "private"}, "content": { "headline": "Hello world", "content": "it was done with curl"}}]}' https://task-bin.vercel.app/api/task/create
    # Status: 201 # created
    ```

    </details>

- Update task  
    Aktualizuje zadaná pole úkolu z body dotazu podle typu [PartialTask](frontend/types/interfaces/Task.ts#L21)

  - link: [task-bin.vercel.app/api/task/{taskID}/update](https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/update)  

  - taskID = [String]

    <details>
    <summary>example</summary>

    ```BASH  
    curl -H "Content-Type: application/json" -H "cookie: __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..tmcdsQt6L9L0v7Ll.9wbUHhUIgHBPLsI7kR3YQkM5x7kQeGo17FnaO50gFkJ6v1S6zPKu8_0AD6_QgVxvdwSpiptaNV4HTHU_W-BVL9dAqw5KSACvbaJFWrm_jQ4.Dlg2aIakBM_-rIC3KGx_mA" -X POST -d '{"tasks": [{"content": { "headline": "Hello world - upraveno", "content": "it was done with curl 2nd time!"}}]}' https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/update  
    ```

    </details>

- setCompleted Task  
    Nastaví status completed úkolu z body dotazu podle typu [PartialTask](frontend/types/interfaces/Task.ts#L21)

  - link: [task-bin.vercel.app/api/task/{taskID}/setCompleted](https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/setCompleted)  

  - taskID = [String]

    <details>
    <summary>example</summary>

    ```BASH  
    curl -H "Content-Type: application/json" -H "cookie: __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..tmcdsQt6L9L0v7Ll.9wbUHhUIgHBPLsI7kR3YQkM5x7kQeGo17FnaO50gFkJ6v1S6zPKu8_0AD6_QgVxvdwSpiptaNV4HTHU_W-BVL9dAqw5KSACvbaJFWrm_jQ4.Dlg2aIakBM_-rIC3KGx_mA" -X POST -d '{"tasks": [{"status": {"completed": true}}]}' https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/setCompleted  
    ```

    </details>


- delete Task  
    Smaže úkol

  - link: [task-bin.vercel.app/api/task/{taskID}/delete](https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/delete)  

  - taskID = [String]

    <details>
    <summary>example</summary>

    ```BASH  
    curl -H "cookie: __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..tmcdsQt6L9L0v7Ll.9wbUHhUIgHBPLsI7kR3YQkM5x7kQeGo17FnaO50gFkJ6v1S6zPKu8_0AD6_QgVxvdwSpiptaNV4HTHU_W-BVL9dAqw5KSACvbaJFWrm_jQ4.Dlg2aIakBM_-rIC3KGx_mA" https://task-bin.vercel.app/api/task/IMk1an4BeF8P419eGEZ2/delete  
    ```

    </details>
