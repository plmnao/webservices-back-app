'use strict'
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'client',
    {
      id_client: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      adresse: {
        type: DataTypes.STRING(250)
      },
      date_naissance: {
        type: DataTypes.DATE
      },
      civilite: {
        type: DataTypes.CHAR(1)
      },
      numero: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true
      },
      id_ville: {
        type: DataTypes.BIGINT(20)
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Client
}
