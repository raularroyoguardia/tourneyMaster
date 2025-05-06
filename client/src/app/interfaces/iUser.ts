import { IEquip } from './iEquip';

export interface IUser {
  id: number;
  name: string;
  apellido1: string;
  apellido2: string;
  email: string;
  email_verified_at: Date;
  password: string;
  telefon: string;
  data_naixement: Date;
  foto_perfil: string | null;
  trofeus: number;
  data_registre: Date;
  tipus_usuariID: number;
  equip?: IEquip;
}
