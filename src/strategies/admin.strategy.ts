import{ HttpErrors, Request} from '@loopback/rest';
import {request} from 'http';
import { UserProfile } from '@loopback/security';
import {AuthenticationStrategy} from '@loopback/authentication';
import parseBearerToken from 'parse-bearer-token';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token){
      let datos= this.servicioAutenticacion.ValidarTokenJWT(token);
      if(datos){
        if(datos.data.rol === "administrador"){
          let perfil: UserProfile = Object.assign({
            nombre: datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("El rol usado no es un rol valido")
      }
    } else{
     throw new HttpErrors[401]("El token incluido no es valido")
     }
       }else{
       throw new HttpErrors[401]("No se ha incluido un token en la solicitud ")

       }

      }

}


  //este metodo Se uso en el ejercicio cuando no se tenia un rol establecido.

       // let perfil: UserProfile = Object.assign({
       //   nombre: datos.data.nombre
       //  });
       //  return perfil;
      // } else{
      //  throw new HttpErrors[401]("El token incluido no es valido")
      // }
     // }else{
     // throw new HttpErrors[401]("No se ha incluido un token en la solicitud ")







