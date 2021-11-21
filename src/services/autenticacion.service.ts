import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories'; //revisar min 50:54 se ve distinto

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  GenerarContrasena() {
    let contrasena = generador(8, false);
    return contrasena;
  }

  cifrarContrasena(contrasena: string) {
    let contrasenaCifrada = cryptoJS.MD5(contrasena).toString();
    return contrasenaCifrada;
  }

  IdentificarUsuario(usuario: string, contrasena: string) {
    try {
      let p = this.usuarioRepository.findOne({where: {correo: usuario, contrasena: contrasena}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;

    }
  }

  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sing({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre + " " + usuario.apellido
      },
    },

    Llaves.contrasenaJWT);
      return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.contrasenaJWT);
      return datos;
    } catch {
      return false;
    }

  }

}
