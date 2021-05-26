'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('type', 15).notNullable().unique()
      table.string('description').notNullable()
      table.integer('range').notNullable().unsigned()
      table.double('price').notNullable()
      table.integer('max-number').notNullable().unsigned()
      table.string('color', 7).notNullable()
      table.double('min-cart-value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema