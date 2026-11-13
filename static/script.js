const formulaire = document.getElementById("formulaire");
const resultat = document.getElementById("resultat");
const bouton = document.querySelector("button");

formulaire.addEventListener("submit", async (e) => {
    e.preventDefault();
    const molecule = document.getElementById("molecule").value.trim();
    if (!molecule) return;

    bouton.disabled = true;
    bouton.textContent = "Calcul...";
    resultat.classList.add("cache");

    try {
        const reponse = await fetch("/calculer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ molecule })
        });
        const data = await reponse.json();

        resultat.classList.remove("cache", "erreur");

        if (data.ok) {
            resultat.innerHTML = `${data.molecule} : <br>${data.temperature} °C`;
        } else {
            resultat.classList.add("erreur");
            resultat.textContent = "⚠️ " + data.erreur;
        }
    } catch (err) {
        resultat.classList.remove("cache");
        resultat.classList.add("erreur");
        resultat.textContent = "⚠️ Erreur de connexion au serveur";
    } finally {
        bouton.disabled = false;
        bouton.textContent = "Calculer";
    }
});