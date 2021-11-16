import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Ciudad} from './ciudad.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Sede extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
