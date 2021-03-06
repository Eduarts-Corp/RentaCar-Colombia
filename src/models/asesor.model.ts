import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Solicitud} from './solicitud.model';
import {Usuario} from './usuario.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
