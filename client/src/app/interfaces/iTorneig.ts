export interface ITorneig {
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
    mapa_nom: string;
    premi_valor: number;
    partides: Array<{
        posicio_partida: number;
        resultat_equip_id: number;
        data_hora: Date;
    }>;
    equips: Array<{
        id: number;
        nom: string;
        foto_equip: string;
    }>;
}
