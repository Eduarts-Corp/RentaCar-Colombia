import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Contrato} from './contrato.model';
import {Usuario} from './usuario.model';
import {TarjetaCredito} from './tarjeta-credito.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @hasMany(() => Contrato)
  contratoes: Contrato[];

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => TarjetaCredito)
  tarjetaCreditos: TarjetaCredito[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
