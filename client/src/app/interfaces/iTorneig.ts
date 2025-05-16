export interface ITorneig {
    joc_nom: string;
    id: number;
    nom: string;
    participants: number;
    tipus: string;
    data_inici: Date;
    data_fi: Date;
    estat: string;
    modeJoc_id: number;
    quantitat_partides: number;
    numero_equips: number;
    joc_foto: string;
    mode_joc: string;
    foto_mapa: string;
    nom_mapa: string;
    descripcio: string;
    premi_valor: number;
    partides: Array<{
        id: number;
        posicio_partida: number;
        resultat_equip_id: number;
        data_hora: Date;
    }>;
    equips: Array<{
        maxim_integrants: number;
        id: number;
        nom: string;
        foto_equip: string;
    }>;
}
