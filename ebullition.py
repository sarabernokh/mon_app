from thermo import Chemical

def calculer_temperature_ebullition(nom_molecule):
    try:
        substance = Chemical(nom_molecule)
        # Conversion de Kelvin vers Celsius
        temperature_celsius = round(substance.Tb - 273.15, 2)
        return temperature_celsius
    except Exception:
        return None