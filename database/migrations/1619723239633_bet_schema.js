'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
  up () {
    this.create('bets', (table) => {
      table.increments()
      table.string('numbers').notNullable()
      table.double('price').notNullable()
      table.integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('bets')
  }
}

module.exports = BetSchema