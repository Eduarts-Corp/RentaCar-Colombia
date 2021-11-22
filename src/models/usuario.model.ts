import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string; //cambie email a correo y

  @property({
    type: 'string',
    required: true,
  })
  celular: string; //aqui tambien cambie fecha_nacin por celular a ver que pasa

  @property({
    type: 'string',
    required: false,
  })
  contrasena: string;

  @property({         //como se decia en los videos se crea el rol para los diferentes actores.
    type: 'string',
    required: true,
  })
  rol: string;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
