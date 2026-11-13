from flask import Flask, render_template, request, jsonify
from ebullition import calculer_temperature_ebullition

app = Flask(__name__)

@app.route("/")
def accueil():
    return render_template("index.html")

@app.route("/calculer", methods=["POST"])
def calculer():
    data = request.get_json()
    molecule = data.get("molecule", "")
    
    resultat = calculer_temperature_ebullition(molecule)
    
    if resultat is not None:
        return jsonify({"ok": True, "temperature": resultat, "molecule": molecule})
    else:
        return jsonify({"ok": False, "erreur": "Molécule non trouvée. Essayez le nom en anglais (ex: water, ethanol)."}), 400

if __name__ == "__main__":
    app.run(debug=True)