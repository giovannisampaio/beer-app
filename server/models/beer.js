/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var beer = sequelize.define('beer', {
    nr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    Artikelid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Varnummer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Namn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Namn2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Prisinklmoms: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Volymiml: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PrisPerLiter: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Saljstart: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Utg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Varugrupp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Typ: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Stil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Forpackning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Forslutning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ursprung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ursprunglandnamn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Producent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Leverantor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Argang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Provadargang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Alkoholhalt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Sortiment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SortimentText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ekologisk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Etiskt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Koscher: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'beers'
  });

  return beer;
};
