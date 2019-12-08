'use strict'

module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define(
    'categorie',
    {
      id_categorie: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Categorie
}
